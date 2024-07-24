# Meal Planner

This project is a meal planner application built using the MEAN stack (MongoDB, Express, Angular, and Node.js).

## Backend

The backend is built with Node.js, Express, and MongoDB.

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

The server will run on `http://localhost:3000`.

## Frontend

The frontend is built with Angular.

### Prerequisites

- Angular CLI

### Setup

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the Angular development server: `ng serve`

The application will run on `http://localhost:4200`.

## Environment Configuration

The frontend environment configuration is located in `src/environments`.

- `environment.ts` for development
- `environment.prod.ts` for production

## Proxy Configuration

The frontend uses a proxy configuration to route API requests to the backend. The proxy configuration is defined in `src/proxy.conf.json`.

## Mock Data

Mock data for meals is defined in `src/app/mock-meals.ts` and used in development mode.

## Testing

The project includes unit tests for Angular components and services. To run the tests, use: `ng test`
