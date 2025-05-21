# Flask Application for a Restaurant Reservation System

This is a simple Flask application developed to demonstrate a restaurant reservation system. The application is developed using Python 3.9.7 and Flask 2.0.2.

## Deploying the application in Choreo
1. Fork this repository.
2. Create a `Service` component in Choreo.
3. Deploy the component.

## Testing the application

Invoke the following endpoints to test the application. Make sure to change the `<endpoint-url>` to the URL of the deployed component.

### Viewing all the available resevations

```
curl -X GET <endpoint-url>/reservations


[{"reservationCreator": "John Doe", "reservationId": "1234", "contact": "011-123-4567"}, {"reservationCreator": "Jane Doe", "reservationId": "5678", "contact": "011-123-4562"}, {"reservationCreator": "John Smith", "reservationId": "9012", "contact": "011-123-4523"}]
```

### Viewing a specific resevation

```
curl -X GET <endpoint-url>/reservation/1234

Your reservation details: {"reservationCreator": "John Doe", "reservationId": "1234", "contact": "011-123-4567"}

```

### Adding a resevation

```
curl -X POST -d '{"reservationCreator": "John Doe", "reservationId": "111", "contact": "011-123-1111"}' <endpoint-url>/reservation/1111


Your added reservation details: b'{"reservationCreator": "John Doe", "reservationId": "111", "contact": "011-123-1111"}'
```

### Updating a resevation

```
curl -X PUT <endpoint-url>/reservation/1234 -d '{"reservationCreator": "Lahiru C", "reservationId": "1234", "contact": "011-123-4588"}' 

Reservation updated: 1234
```

### Deleting a resevation

```
curl -X DELETE <endpoint-url>/reservation/1234

Reservation deleted: {"reservationCreator": "John Doe", "reservationId": "1234", "contact": "011-123-4567"}

```

## Observability: Structured Logging

This sample is configured to use structured (JSON) logging via the `python-json-logger` library. 
This provides logs in a machine-readable format, which is beneficial for log analysis and integration with log management systems in Choreo.

When you run the application (locally or on Choreo) and interact with its endpoints, you will see log entries in JSON format in the console output or Choreo log viewer. The log formatter includes additional fields such as `pathname`, `process`, and `thread` for richer context. For example:

```json
{
    "asctime": "2023-10-27T10:20:30.123Z",
    "levelname": "INFO",
    "name": "flask-app",
    "module": "app",
    "funcName": "get_reservations",
    "lineno": 56,
    "message": "GET /reservations endpoint accessed.",
    "pathname": "/app/app.py",
    "process": 1,
    "thread": 140737353721664
}
```
*(Note: `lineno`, `pathname`, `process`, `thread`, and exact `asctime` values will vary based on the actual execution environment and log event.)*

This structured format makes it easier to search, filter, and analyze logs, especially in a production environment. The additional fields in the log output provide more detailed context for each log entry.
When logging specific actions, such as accessing an endpoint with a `reservation_id` or when a payload is involved, the logs will also include this contextual information under the `extra` key in the JSON output, for example:
```json
{
    "asctime": "2023-10-27T10:25:40.456Z",
    "levelname": "INFO",
    "name": "flask-app",
    "module": "app",
    "funcName": "get_reservation",
    "lineno": 63,
    "message": "GET /reservation/1234 endpoint accessed.",
    "pathname": "/app/app.py",
    "process": 1,
    "thread": 140737353721664,
    "reservation_id": "1234"
}
```
Or when creating/updating a reservation:
```json
{
    "asctime": "2023-10-27T10:30:50.789Z",
    "levelname": "INFO",
    "name": "flask-app",
    "module": "app",
    "funcName": "add_reservation",
    "lineno": 78,
    "message": "POST /reservation/5678 endpoint accessed.",
    "pathname": "/app/app.py",
    "process": 1,
    "thread": 140737353721664,
    "reservation_id": "5678",
    "payload_keys": ["reservationCreator", "contact"]
}
```
