# PHP Hello World Service

## 1. Sample Overview

This sample provides a very simple "Hello World" REST API built with PHP. It's designed to demonstrate the basic deployment of a PHP service on Choreo using a Dockerfile (if one is present) or the PHP buildpack. It typically exposes an endpoint that returns a greeting message.

## 2. Prerequisites

*   **Language Runtime:** PHP (e.g., 7.4, 8.x - specify if known, otherwise assume a common version supported by Choreo buildpacks).
*   **Package Manager:** Composer (if `composer.json` is present).
*   **Tools:** Git, curl or Postman.
*   **Choreo Account:** Access to the Choreo console.
*   **(Optional) Local Web Server:** e.g., Apache or Nginx with PHP-FPM, or PHP's built-in server for local testing.

## 3. Local Development & Testing (Optional but Recommended)

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/hello-world-php-service
```

### 3.2. Install Dependencies (if applicable)
*If a `composer.json` exists:*
```bash
composer install
```

### 3.3. Run the Application
*Using PHP's built-in server (for simple cases, assuming `index.php` is the entry point):*
```bash
php -S localhost:8000
```
*(Adjust if a different local server setup is standard for this sample).*

### 3.4. Test Locally
*e.g., Assuming an endpoint `/` or `/hello`:*
```bash
curl http://localhost:8000/
# or
curl http://localhost:8000/hello
```

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Service**
4.  Enter a **Name** (e.g., `PHP Hello Service`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **PHP** (or **Dockerfile** if a `Dockerfile` is present and preferred for this sample).
5.  **Project Directory / Dockerfile Path:**
    *   `hello-world-php-service`
6.  **(If Dockerfile) Docker Context Path:**
    *   `hello-world-php-service`
7.  **(If PHP Buildpack) PHP Version:**
    *   Select a compatible version (e.g., 8.x).
8.  Click **Create**.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo should auto-detect an endpoint.
    *   Port: **80** or **8080** (Verify the port PHP applications typically expose in Choreo, or the port used in the Dockerfile if applicable. Default for PHP buildpack might be 8080 or configurable).
    *   The `openapi.yaml` in this directory might define the specific paths.
2.  **Configurations:**
    *   This simple sample likely requires no special environment variables.

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy** (or **Deploy**).
4.  Select the environment and deploy.

## 5. Testing on Choreo

*   Use the **OpenAPI Console** in Choreo or `curl`:
    ```bash
    curl https://<your-choreo-service-url>/ 
    # or the specific path defined in openapi.yaml, e.g., /hello
    ```
    *(Check `openapi.yaml` for actual endpoint paths like `/`, `/index.php`, or `/hello`)*

---
*Remember to verify paths and configurations against the actual sample structure if possible. The `openapi.yaml` in the `hello-world-php-service` directory should be consulted for the correct service paths.*
