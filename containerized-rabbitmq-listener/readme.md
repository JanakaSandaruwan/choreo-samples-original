# Containerized RabbitMQ Listener (Python)

## 1. Sample Overview

This sample provides a Python application that listens to a RabbitMQ queue. It demonstrates how to deploy a Dockerized Python application as an **Event Handler** on Choreo that responds to messages from a RabbitMQ server. The listener logs received messages.

## 2. Prerequisites

*   **Language Runtime:** Python 3.x.
*   **Package Manager:** pip (for `requirements.txt`).
*   **Tools:** Docker, Git.
*   **Messaging Service:** Access to a RabbitMQ server (local or cloud-hosted). You'll need the server host, virtual host (optional, often `/`), username, and password.
*   **Choreo Account:** Access to the Choreo console.

## 3. Local Development & Testing

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/containerized-rabbitmq-listener
```

### 3.2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3.3. Configure Local Environment Variables
Set the following environment variables to connect to your RabbitMQ server:
```bash
export HOST="your_rabbitmq_host"         # e.g., localhost or amqp.example.com
export VHOST="/"                         # Or your specific virtual host
export USERNAME="your_rabbitmq_username"
export PASSWORD="your_rabbitmq_password"
export QUEUE_NAME="TestQueue"            # The queue to listen to
```

### 3.4. Run the Application
```bash
python consumer.py
```
The script will attempt to connect to RabbitMQ and start listening on the specified queue.

### 3.5. Test Locally
1.  Ensure your RabbitMQ server is running and accessible with the provided credentials.
2.  Using a RabbitMQ client or management interface, publish a message to the queue named `TestQueue` (or the one you configured).
3.  Observe the console output of the `consumer.py` script; it should print the received message.

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Event Handler**.
4.  Enter a **Name** (e.g., `RabbitMQ-EventListener`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **Dockerfile**.
5.  **Dockerfile Path:** `containerized-rabbitmq-listener/Dockerfile`.
6.  **Docker Context Path:** `containerized-rabbitmq-listener`.
7.  Click **Create**.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:** Event Handlers typically do not expose incoming HTTP endpoints. They connect outwards.
2.  **Configurations (Environment Variables, ConfigMaps, Secrets):**
    *   Navigate to **Deploy** > **Configs & Secrets**.
    *   Set the following environment variables (use `Secret` for password, `ConfigMap` for others):
        *   `HOST`: Your RabbitMQ server host.
        *   `VHOST`: Your RabbitMQ virtual host (e.g., `/`).
        *   `USERNAME`: Your RabbitMQ username.
        *   `PASSWORD`: (Secret) Your RabbitMQ password.
        *   `QUEUE_NAME`: The queue to listen to (e.g., `TestQueue`).

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy**.
4.  Ensure configurations are set correctly.
5.  Select the environment and deploy.

## 5. Testing on Choreo

1.  Ensure your RabbitMQ server is accessible from Choreo (publicly or via allowed IPs if Choreo runs in a private data plane).
2.  Publish a message to the configured RabbitMQ queue (`QUEUE_NAME`) from any RabbitMQ producer/client.
3.  Navigate to the **Observe** > **Logs** page for your component in the Choreo console. You should see log entries indicating the message was received and processed by the Python script.

---
*Ensure your RabbitMQ server is network accessible from Choreo's runtime environment.*