from flask import Flask, request, jsonify
import logging
from pythonjsonlogger import jsonlogger

app = Flask(__name__)

# Configure structured JSON logging
logger = logging.getLogger("flask-app")
logger.setLevel(logging.INFO)
logHandler = logging.StreamHandler()
# Including more fields in the formatter for richer logs
formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(module)s %(funcName)s %(lineno)d %(message)s %(pathname)s %(process)d %(thread)d')
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)

# Remove Flask's default handlers to avoid duplicate logs if app.logger is used or if debug=True adds its own.
# This ensures only our JsonFormatter is active.
app.logger.handlers.clear()
app.logger.addHandler(logHandler) # Optional: if you want app.logger to use the same handler. For this task, we will primarily use 'logger'.
# For consistency, we can also set the level for app.logger if we decide to use it.
app.logger.setLevel(logging.INFO)


reservations = [
    {"reservationCreator": "John Doe", "reservationId": "1234", "contact": "011-123-4567"},
    {"reservationCreator": "Jane Doe", "reservationId": "5678", "contact": "011-123-4562"},
    {"reservationCreator": "John Smith", "reservationId": "9012", "contact": "011-123-4523"}
]

@app.route('/')
def index():
    logger.info("Root endpoint '/' accessed.")
    return "Welcome to the Restaurant Reservation System!"

@app.route('/reservations', methods=['GET'])
def get_reservations():
    logger.info("GET /reservations endpoint accessed.")
    return jsonify(reservations)

@app.route('/reservation/<reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    logger.info(f"GET /reservation/{reservation_id} endpoint accessed.", extra={"reservation_id": reservation_id})
    reservation = next((r for r in reservations if r["reservationId"] == reservation_id), None)
    if reservation:
        return jsonify(reservation)
    else:
        logger.warning(f"Reservation with ID {reservation_id} not found.", extra={"reservation_id": reservation_id})
        return jsonify({"error": "Reservation not found"}), 404

@app.route('/reservation/<reservation_id>', methods=['POST'])
def add_reservation(reservation_id):
    data = request.get_json()
    # Log with additional context, including parts of the payload if safe and useful
    logger.info(f"POST /reservation/{reservation_id} endpoint accessed.", extra={"reservation_id": reservation_id, "payload_keys": list(data.keys()) if data else []})
    
    if not data or not all(k in data for k in ("reservationCreator", "contact")):
        logger.error("Invalid reservation data provided.", extra={"reservation_id": reservation_id, "received_data": data})
        return jsonify({"error": "Invalid reservation data"}), 400
    
    new_reservation = {
        "reservationId": reservation_id,
        "reservationCreator": data["reservationCreator"],
        "contact": data["contact"]
    }
    reservations.append(new_reservation)
    logger.info(f"Reservation {reservation_id} created successfully.", extra={"reservation_id": reservation_id, "new_reservation": new_reservation})
    return jsonify(new_reservation), 201

@app.route('/reservation/<reservation_id>', methods=['PUT'])
def update_reservation(reservation_id):
    data = request.get_json()
    logger.info(f"PUT /reservation/{reservation_id} endpoint accessed.", extra={"reservation_id": reservation_id, "payload_keys": list(data.keys()) if data else []})
    reservation = next((r for r in reservations if r["reservationId"] == reservation_id), None)
    if reservation:
        if not data or not all(k in data for k in ("reservationCreator", "contact")):
            logger.error("Invalid update data provided.", extra={"reservation_id": reservation_id, "received_data": data})
            return jsonify({"error": "Invalid update data"}), 400
        
        original_reservation = reservation.copy() # For logging changes if needed
        reservation.update({
            "reservationCreator": data["reservationCreator"],
            "contact": data["contact"]
        })
        logger.info(f"Reservation {reservation_id} updated successfully.", extra={"reservation_id": reservation_id, "updated_to": reservation, "original_data": original_reservation})
        return jsonify(reservation)
    else:
        logger.warning(f"Reservation with ID {reservation_id} not found for update.", extra={"reservation_id": reservation_id})
        return jsonify({"error": "Reservation not found"}), 404

@app.route('/reservation/<reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    logger.info(f"DELETE /reservation/{reservation_id} endpoint accessed.", extra={"reservation_id": reservation_id})
    global reservations
    original_length = len(reservations)
    reservations = [r for r in reservations if r["reservationId"] != reservation_id]
    if len(reservations) < original_length:
        logger.info(f"Reservation {reservation_id} deleted successfully.", extra={"reservation_id": reservation_id})
        return jsonify({"message": f"Reservation {reservation_id} deleted"})
    else:
        logger.warning(f"Reservation with ID {reservation_id} not found for deletion.", extra={"reservation_id": reservation_id})
        return jsonify({"error": "Reservation not found"}), 404

if __name__ == '__main__':
    # Set debug=False for production/Choreo. Our custom logger is already set to INFO.
    # Flask's default logger can be quite verbose in debug mode and might not use our JSON formatter.
    app.run(host='0.0.0.0', port=8080, debug=False)
