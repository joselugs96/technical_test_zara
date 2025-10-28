# Zara Technical Test - Jose Luis García

## 🎧 Podcaster Application

This project is a web application built with **React and TypeScript** to list, filter, and view the details and episodes of podcasts, leveraging the rankings and public information from the iTunes/Apple Music API.

## 🚀 Installation and Execution Guide

This section explains how to set up and run the application locally.

**Prerequisites**

Ensure you have Node.js (version 16 or higher) and npm (or Yarn) installed.

**1. Installing Dependencies**

Clone the repository and install the project dependencies:

```bash
# Clone the repository
git clone https://github.com/joselugs96/technical_test_zara.git
cd technical_test_zara

# Install dependencies
npm install
# or yarn install
```

**2. Execution Modes**

The repository supports two main execution modes, each suited for different purposes.

**Development**

Use this mode for active development, debugging, and Hot Reloading.

```bash
npm run dev
# or yarn dev
```

Once started, the application will be available in your browser at: http://localhost:3000 (or the configured port).

**Production**

**A. Building the Application (Build):**

This mode generates an optimized, minimized, and deployable version of the application. It requires two steps: first building, then serving the static files.

```bash
npm run build
# or yarn build
```

This command creates the final application version in the dist/ folder (or the folder configured in your project).

**B. Serving Locally (Serve):**

To simulate a real web server environment, you may use a tool like serve.

1. Install serve (Globally, if you don't have it):

```bash
npm install -g serve
```

2. Run the Local Server:

```bash
serve -s dist -l 5000
```

The optimized application will be available at: http://localhost:5000.

## 💻 Key Technologies

- Framework: React
- Language: TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- Routing: React Router DOM
- APIs: iTunes Search API (with a caching layer)

## ⚠️ Important Note: CORS and the Testing Proxy

**Activating the CORS Proxy for Detail Loading**

To access the specific podcast details and fetch the episode list from the Apple/iTunes API, we must use a **proxy server**. This is necessary because the API endpoint enforces **Cross-Origin Resource Sharing (CORS) restrictions** that prevent direct browser requests.

For local development and testing, we are temporarily using the public proxy https://cors-anywhere.herokuapp.com/.

**🚨 IMPORTANT: Enabling Testing Mode**

The proxy server requires a manual step to be used with local development. Before running the application for the first time or if you experience CORS errors, you must **proxy server**:

1. Open https://cors-anywhere.herokuapp.com/ in your browser.
2. Click the "**Request temporary access to the demo server**" button.

This action enables the proxy to route your requests for a limited time.

**Request Structure:**

Once activated, all API requests in your code must be prefixed as follows:

```bash
https://cors-anywhere.herokuapp.com/ + <API_URL>
```

**⚠️ Warning for Production:**

1. **Development/Testing Only**: This proxy is strictly for local development and **MUST NOT be used in a production environment**. Public proxies are subject to rate limits, security risks, and service downtime.
2. **Production Solution**: If this project moves to production, this proxy must be replaced by a robust, self-hosted solution (e.g., a simple serverless function or a dedicated web server configuration).

## 🧪 Testing and Quality Control

This project uses Vitest for running unit tests across services, Redux slices, components, and utilities, ensuring the application logic is robust and reliable.

**Running Unit Tests**

To execute the entire suite of unit tests, use the following command:

```bash
npm run test
# or yarn test
```
