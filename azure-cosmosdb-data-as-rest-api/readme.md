# Azure CosmosDB Data as REST API

## 1. Sample Overview

This sample demonstrates a Ballerina service that performs CRUD (Create, Read, Update, Delete) operations on an Azure Cosmos DB. It exposes a REST API to interact with employee data stored in Cosmos DB.

## 2. Prerequisites

*   **Cloud Services:**
    *   A Microsoft Azure Account with an active subscription.
    *   An Azure Cosmos DB account (SQL API).
        *   Within Cosmos DB: A database created (e.g., `EmployeeDB`).
        *   Within the database: A container created (e.g., `EmployeesContainer`) with `id` as the partition key.
    *   Azure Cosmos DB URI and Primary Key (obtain these from your Cosmos DB account under "Keys").
*   **Language Runtime:** Ballerina.
*   **Tools:** Git, curl or Postman.
*   **Choreo Account:** Access to the Choreo console.

## 3. Local Development & Testing

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/azure-cosmosdb-data-as-rest-api
```

### 3.2. Configure Local Environment
Create a file named `Config.toml` in the `azure-cosmosdb-data-as-rest-api` directory with the following content, replacing placeholders with your Azure Cosmos DB details:
```toml
[<ORG_NAME>.azure_cosmosdb_data_as_rest_api] # Replace <ORG_NAME> with your Ballerina organization name if applicable, or use the module name from your Ballerina.toml
baseUrl = "<YOUR_COSMOS_DB_ACCOUNT_URI>"  # e.g., "https://your-account.documents.azure.com:443/"
containerId = "<YOUR_CONTAINER_ID>"      # e.g., "EmployeesContainer"
databaseId = "<YOUR_DATABASE_ID>"        # e.g., "EmployeeDB"
primaryKeyOrResourceToken = "<YOUR_COSMOS_DB_PRIMARY_KEY>"
```
*Note: Ensure the organization name in `Config.toml` matches your Ballerina project's organization if you are using one, or the module name defined in your `Ballerina.toml`.*

### 3.3. Run the Application
```bash
bal run
```
The service will start on port 8090 by default.

### 3.4. Test Locally
*   **Insert an employee:**
    ```bash
    curl -v -X POST http://localhost:8090/employees -H "Content-Type: application/json" -d '{"empId": "1", "firstName": "Foo", "email": "a@a.com", "designation": "SE"}'
    ```
*   **Get an employee:**
    ```bash
    curl -v -X GET http://localhost:8090/employees/1
    ```
*   **Update an employee detail:**
    ```bash
    curl -v -X PUT http://localhost:8090/employees -H "Content-Type: application/json" -d '{"empId": "1", "firstName": "FooUpdated", "email": "a.updated@a.com", "designation": "SSE"}'
    ```
*   **Delete an employee:**
    ```bash
    curl -v -X DELETE http://localhost:8090/employees/1
    ```

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Service**.
4.  Enter a **Name** (e.g., `CosmosDB Employee API`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **Ballerina**.
5.  **Ballerina Project Directory:** `azure-cosmosdb-data-as-rest-api`.
6.  Click **Create**.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo will auto-detect the endpoint (likely `/employees` on port `8090` based on the sample). Confirm the details.
2.  **Configurations (Environment Variables, ConfigMaps, Secrets):**
    *   Navigate to **Deploy** > **Configs & Secrets**.
    *   The Ballerina code reads configuration values (like `baseUrl`, `containerId`, `databaseId`, `primaryKeyOrResourceToken`) which need to be provided as environment variables in Choreo. These correspond to the keys in your local `Config.toml`.
    *   Create the following:
        *   `CHO_AZURE_COSMOSDB_DATA_AS_REST_API_BASEURL`: (ConfigMap) Your Azure Cosmos DB Account URI.
        *   `CHO_AZURE_COSMOSDB_DATA_AS_REST_API_CONTAINERID`: (ConfigMap) Your Cosmos DB Container ID.
        *   `CHO_AZURE_COSMOSDB_DATA_AS_REST_API_DATABASEID`: (ConfigMap) Your Cosmos DB Database ID.
        *   `CHO_AZURE_COSMOSDB_DATA_AS_REST_API_PRIMARYKEYORRESOURCETOKEN`: (Secret) Your Azure Cosmos DB Primary Key.
    *   *Note: The prefix `CHO_` and uppercasing with underscores is a common convention for environment variables derived from Ballerina `configurable` variables when deployed on Choreo. Verify the exact environment variable names Choreo expects for your Ballerina version's configurable variables, or check the sample's Ballerina code for how it reads these configurations.*

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy**.
4.  Ensure the configurations (environment variables mapped from secrets/configmaps) are correctly set up.
5.  Select the environment and deploy.

## 5. Testing on Choreo

*   Use the **OpenAPI Console** in Choreo or `curl` with the Choreo service URL:
    *   **Insert an employee:**
        ```bash
        curl -v -X POST https://<your-choreo-service-url>/employees -H "Content-Type: application/json" -d '{"empId": "2", "firstName": "Bar", "email": "b@b.com", "designation": "QA"}'
        ```
    *   **Get an employee:**
        ```bash
        curl -v -X GET https://<your-choreo-service-url>/employees/2
        ```
    *   *(Adapt other CRUD operations similarly)*

---
*Ensure your Azure Cosmos DB instance is network accessible from Choreo if IP restrictions are in place.*
