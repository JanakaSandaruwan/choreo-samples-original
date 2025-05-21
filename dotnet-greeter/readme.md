# .NET Greeter Service

## 1. Sample Overview

This sample provides a .NET service that exposes a simple REST API to greet a user. It demonstrates deploying a .NET application on Choreo using either the .NET buildpack or a Dockerfile. The service has an endpoint `/greeter/greet` that takes a name query parameter.

## 2. Prerequisites

*   **Language Runtime:** .NET SDK (e.g., .NET 7.x as specified in original docs).
*   **Tools:** Git, curl or Postman.
*   **Choreo Account:** Access to the Choreo console.
*   **(Optional) Docker:** If you prefer to build and run with Docker locally.

## 3. Local Development & Testing

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/dotnet-greeter
```

### 3.2. Install Dependencies
*Dependencies are typically managed by the .NET SDK and defined in the `.csproj` file. No explicit install command is usually needed unless there are project-specific tools.*

### 3.3. Run the Application
```bash
dotnet run
```
*This command builds and runs the application. It will typically host the service on a local port (e.g., `http://localhost:5000` or `https://localhost:5001`). Check the console output for the exact URLs.*

### 3.4. Test Locally
*Use curl or your browser:*
```bash
curl "http://localhost:<port>/greeter/greet?name=Developer"
```
*(Replace `<port>` with the actual port the application is running on, e.g., 5000 or 5278 as seen in launchSettings.json for HTTP)*

### 3.5. (Alternative) Build and Run with Docker Locally
*This sample includes a `Dockerfile`.*
```bash
# Ensure you are in the dotnet-greeter directory
docker build -t dotnet-greeter-sample .
docker run -p 8080:8080 dotnet-greeter-sample 
```
*(Adjust port mapping if your Dockerfile exposes a different port than 8080. The provided Dockerfile exposes 8080).*
Then test using `curl "http://localhost:8080/greeter/greet?name=DockerUser"`.

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Service**.
4.  Enter a **Name** (e.g., `DotNetGreetingService`) and **Description** (e.g., `Greeter service in .NET`).

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **.NET** (Alternatively, you can choose **Dockerfile**).
5.  **(If .NET Buildpack) .NET Project Directory:** `dotnet-greeter`.
6.  **(If .NET Buildpack) .NET Version:** `7.x`.
7.  **(If Dockerfile) Dockerfile Path:** `dotnet-greeter/Dockerfile`.
8.  **(If Dockerfile) Docker Context Path:** `dotnet-greeter`.
9.  Click **Create**.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo should auto-detect the endpoint based on your `openapi.yaml` (e.g., `/greeter/greet`).
    *   The service port defined in the Dockerfile (e.g., 8080) or the default for .NET applications in Choreo will be used. The `openapi.yaml` specifies port 8080.
2.  **Configurations:**
    *   This simple service likely requires no special environment variables.

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy** (or **Deploy**).
4.  Select the environment and deploy.

## 5. Testing on Choreo

*   Use the **OpenAPI Console** in Choreo or `curl`:
    ```bash
    curl "https://<your-choreo-service-url>/greeter/greet?name=ChoreoUser"
    ```

## 6. Repository File Structure Overview

*   `Program.cs`: The .NET service code.
*   `Dockerfile`: Used by Choreo (if Dockerfile buildpack is chosen) to build the container image.
*   `.choreo/endpoints.yaml`: Choreo-specific configuration for service exposure (often auto-generated or can be customized).
*   `openapi.yaml`: OpenAPI contract for the service, used for API management and testing.

---
*This README provides options for both .NET buildpack and Dockerfile deployment on Choreo.*
