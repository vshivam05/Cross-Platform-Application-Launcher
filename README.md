# Cross-Platform Launcher

## Project Description
This project is a cross-platform application launcher designed to provide users with a convenient interface to manage and launch various applications. It consists of a backend API server and a frontend React-based user interface.

## Backend Overview
The backend is built with Node.js and Express. It provides RESTful API endpoints under the `/api` route to manage applications, including fetching, adding, deleting, launching, and quitting apps. The backend uses middleware such as `cors` for cross-origin resource sharing, `helmet` for security headers, and `body-parser` to parse JSON request bodies. The server listens on IP `192.168.1.187` and port `2354`.

### How to Run Backend
1. Navigate to the `backend` directory.
2. Install dependencies with `npm install`.
3. Start the server with `npm start` (uses nodemon for auto-reloading).

## Frontend Overview
The frontend is a React application built with Vite for fast development and build. It uses `react-router-dom` for client-side routing, with two main pages: `Launcher` and `Settings`. The frontend communicates with the backend API to fetch and manage applications.

### How to Run Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Access the app in your browser at the URL provided by Vite (usually `http://localhost:3000`).

## How to Run the Full Project
1. Start the backend server first (see backend instructions).
2. Start the frontend development server.
3. Use the frontend interface to manage and launch applications via the backend API.

## Technologies Used
- Backend: Node.js, Express, cors, helmet, body-parser, nodemon
- Frontend: React 19, Vite, react-router-dom, ESLint

## Folder Structure Overview
- `backend/`: Contains the backend server code, routes, controllers, services, and data.
- `frontend/`: Contains the React frontend source code, components, pages, and configuration.

## Contact
For questions or contributions, please contact the project maintainer.
