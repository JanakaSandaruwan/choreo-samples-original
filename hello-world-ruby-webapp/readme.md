# Ruby Hello World WebApp

## 1. Sample Overview

This sample provides a very simple "Hello World" web application built with Ruby. It's designed to demonstrate the basic deployment of a Ruby web application on Choreo, likely using a Rack-compatible setup (e.g., Sinatra or a simple Rack app) or Ruby on Rails if the sample is more complex. It typically serves a simple HTML page.

## 2. Prerequisites

*   **Language Runtime:** Ruby (e.g., 2.7, 3.x - specify if known, otherwise assume a common version supported by Choreo buildpacks).
*   **Package Manager:** Bundler (if a `Gemfile` is present).
*   **Tools:** Git, Web browser.
*   **Choreo Account:** Access to the Choreo console.
*   **(Optional) Local Ruby Web Server:** e.g., Puma, Thin, Webrick.

## 3. Local Development & Testing (Optional but Recommended)

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/hello-world-ruby-webapp
```

### 3.2. Install Dependencies (if applicable)
*If a `Gemfile` exists:*
```bash
bundle install
```

### 3.3. Run the Application
*Using `rackup` for a Rack app (if `config.ru` is present):*
```bash
bundle exec rackup -p 9292 
```
*Or, if it's a Rails app:*
```bash
bundle exec rails server
```
*(Adjust if a different local server setup is standard for this sample, e.g., `ruby app.rb`)*

### 3.4. Test Locally
*Open your web browser and navigate to `http://localhost:9292` (or the port used by the app).*

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Web Application**
4.  Enter a **Name** (e.g., `Ruby Hello App`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **Ruby** (or **Dockerfile** if a `Dockerfile` is present and preferred).
5.  **Project Directory / Dockerfile Path:**
    *   `hello-world-ruby-webapp`
6.  **(If Dockerfile) Docker Context Path:**
    *   `hello-world-ruby-webapp`
7.  **(If Ruby Buildpack) Ruby Version:**
    *   Select a compatible version (e.g., 3.x).
    *   Choreo might also need a **Rackup file** (`config.ru`) or specific **startup command** for Ruby web apps.

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo should auto-detect the primary endpoint for a web application.
    *   Port: **[e.g., 3000, 8080, 9292]** (Verify the port Ruby applications typically expose in Choreo, or the port used in the Dockerfile/startup command).
2.  **Configurations:**
    *   This simple sample likely requires no special environment variables.

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy** (or **Deploy**).
4.  Select the environment and deploy.

## 5. Testing on Choreo

*   Access the **Web App URL** provided on the Choreo component's overview page in your browser.

---
*Remember to verify paths, port, and startup commands against the actual sample structure if possible. The presence of a `config.ru`, `Gemfile`, or specific scripts will indicate how it's intended to run.*
