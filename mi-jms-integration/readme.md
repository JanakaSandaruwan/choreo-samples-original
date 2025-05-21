# JMS Integration Sample - WSO2 Micro Integrator

## 1. Sample Overview

This sample demonstrates how to deploy a WSO2 Micro Integrator (MI) component on Choreo that integrates with a JMS (Java Message Service) broker like ActiveMQ. It typically involves an MI proxy service or API that can send messages to and/or receive messages from a JMS queue or topic. This example focuses on sending a message to a JMS queue.

## 2. Prerequisites

*   **JMS Broker:** A running JMS broker (e.g., ActiveMQ) that is **publicly accessible** from the internet. Choreo needs to be able to connect to this broker.
    *   You will need the broker's connection URL (e.g., `tcp://your-broker-host:61616`), queue name, and any required credentials.
*   **Tools:** Git, curl or Postman.
*   **Choreo Account:** Access to the Choreo console.
*   **(Optional) ngrok:** If your local JMS broker is not publicly accessible, `ngrok` or a similar tool can expose it for testing (as mentioned in the original prerequisites for local setup).

## 3. Local Development & Testing

*Direct local testing of this MI project requires a local WSO2 Micro Integrator runtime. The instructions below focus on preparing the JMS broker, which is a dependency.*

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/mi-jms-integration 
```
*(Note: The original README mentioned `jms-integration-mi` as the project directory. Ensure this path `mi-jms-integration` is correct for the Choreo project path setting.)*


### 3.2. Set up JMS Broker
1.  Ensure your JMS Broker (e.g., ActiveMQ) is running.
2.  Make it publicly accessible if you intend to test with a Choreo-deployed component later, or use `ngrok` for temporary exposure from your local machine.
    *Example using ngrok for a local ActiveMQ broker running on default port 61616 (for TCP, not HTTP):*
    ```bash
    # ngrok tcp 61616 
    # (The original docs mentioned 10088, adjust to your actual JMS broker port and ngrok setup)
    ```
    *Note the ngrok URL provided (e.g., `tcp://0.tcp.ngrok.io:XXXXX`).*

### 3.3. Understanding the MI Project
*   This MI project (located in `mi-jms-integration`) contains artifacts (like proxy services, APIs, sequences) that define the JMS integration logic.
*   The specific JMS connection details (broker URL, credentials) are typically configured within the MI artifacts or passed as parameters when deploying to Choreo.

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Service**.
4.  Enter a **Name** (e.g., `JMSOrderProcessor`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **WSO2 Micro Integrator**.
5.  **Project Directory:** `mi-jms-integration` (Verify this is the correct path containing the MI project, e.g., where `deployment.toml` or synapse configurations are).
6.  Click **Create**.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo will expose the HTTP/HTTPS endpoints defined in your MI project (e.g., an API or Proxy Service that triggers the JMS sending).
    *   The `openapi.yaml` in this directory should define the invokable REST interface.
2.  **Configurations (Environment Variables for JMS Connection):**
    *   Navigate to **Deploy** > **Configs & Secrets**.
    *   The MI component needs to know how to connect to your JMS broker. This is typically done by setting environment variables that the MI configuration files (`deployment.toml` or synapse XML) can then reference.
    *   **Crucial:** You need to define how the MI project within Choreo will get the JMS broker details. Common environment variables to set (these names are examples, your MI project might expect different ones - **check your MI project's parameterization strategy**):
        *   `JMS_BROKER_URL`: (ConfigMap) e.g., `tcp://your-public-broker.com:61616` or the ngrok URL if testing.
        *   `JMS_QUEUE_NAME`: (ConfigMap) e.g., `OrderQueue`.
        *   `JMS_USERNAME`: (Secret, if applicable) Username for JMS broker.
        *   `JMS_PASSWORD`: (Secret, if applicable) Password for JMS broker.
    *   *Consult the WSO2 MI documentation and the specific MI artifacts in this sample to understand how it's designed to be configured for JMS connections (e.g., via `deployment.toml` parameters).*

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy**. Ensure JMS configurations are correctly mapped.
4.  Select the environment and deploy.

## 5. Testing on Choreo

1.  **Ensure JMS Broker is Accessible:** Your JMS broker must be reachable from the Choreo runtime environment.
2.  **Send a POST Request:** Use the provided `curl` command (or Postman) to send a message to the Choreo endpoint of your deployed MI service. This endpoint, when invoked, should trigger the MI flow to send a message to your configured JMS queue.
    ```bash
    curl -X POST     https://<your-choreo-mi-service-url>/     -H 'Content-Type: application/orderpayment'     -d '{
        "paymentId": "1234",
        "amount": 100.0,
        "currency": "USD"
    }'
    ```
    *(Replace `<your-choreo-mi-service-url>/` with the actual Choreo endpoint)*
3.  **Verify Message in JMS Queue:** Check your JMS broker's queue to confirm that the message sent via the MI service has arrived.
4.  **Check Choreo Logs:** Observe the logs of the MI component in Choreo for any errors or success messages related to JMS publishing.

---
*Configuration of JMS connection parameters is critical for this sample to work in Choreo. Review the MI project's configuration files to determine how it expects these parameters.*
