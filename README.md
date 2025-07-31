# CarbonLeap


# Field Insights Dashboard

This project is a full-stack web application built for the Carbonleap Full Stack Intern assignment. It simulates a real-world IoT system for ingesting, processing, and analyzing farm sensor data like temperature and soil moisture.

The core of the project is a backend API that handles data submission and runs background jobs, with a simple React frontend to visualize the data and interact with the system.

**Live Demo:** `[PASTE YOUR RENDER.COM URL HERE]`

## Key Features

*   **RESTful API:** A well-structured API built with FastAPI for creating and retrieving sensor readings.
*   **Asynchronous Background Processing:** Uses Celery and Redis to handle large batch uploads without blocking the API, ensuring a responsive user experience.
*   **Real-time Job Status Tracking:** The frontend polls the backend to show the live status of submitted background jobs (Pending -> Success/Failure).
*   **Persistent Data Storage:** All sensor data is stored and managed in a PostgreSQL database.
*   **Interactive Frontend:** A clean, responsive UI built with React that allows for data submission and displays the latest sensor readings.
*   **Containerized Environment:** The entire application stack (backend, frontend, database, etc.) is fully containerized with Docker and Docker Compose for easy setup and consistent environments.

## Architecture & Tech Stack

The application is built as a set of communicating microservices orchestrated by Docker Compose.

*   **Backend:**
    *   **Framework:** Python 3.9+ with **FastAPI**
    *   **Database:** **PostgreSQL**
    *   **ORM:** **SQLAlchemy**
    *   **Async Tasks:** **Celery**
*   **Frontend:**
    *   **Framework:** **React**
    *   **HTTP Client:** **Axios**
*   **Infrastructure:**
    *   **Containerization:** **Docker & Docker Compose**
    *   **Message Broker/Cache:** **Redis** (for Celery)

## Running the Project Locally

The entire project is containerized, so you only need Docker to run it.

#### Prerequisites

*   You must have **Docker** and **Docker Compose** installed on your machine. Docker Desktop is the easiest way to get this.

#### Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[YOUR_GITHUB_USERNAME]/carbonleap-dashboard.git
    cd carbonleap-dashboard
    ```
2.  **Build and run the services:**
    From the root directory of the project, run the following command. This will build the necessary Docker images and start all the services.
    ```bash
    docker compose up --build
    ```
3.  **Access the application:**
    Once the containers are up and running, you can access the different parts of the application:
    *   **Frontend UI:** [http://localhost:3000](http://localhost:3000)
    *   **Backend API Docs (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints

The backend provides the following endpoints:

| Method | Path                  | Description                                            |
| :----- | :-------------------- | :----------------------------------------------------- |
| `POST` | `/readings/`          | Submits a single sensor reading synchronously.         |
| `GET`  | `/readings/`          | Retrieves a list of all sensor readings from the DB.   |
| `POST` | `/readings/batch`     | Submits a batch of readings for async background processing. Returns a `job_id`. |
| `GET`  | `/jobs/{job_id}`      | Checks the status and result of a background job.      |

## Data Generation

To realistically test the asynchronous processing capabilities and populate the dashboard with meaningful data, I generated a test dataset of 500 records.

I used Google's Gemini with the following prompt, as recommended by the assignment:

> "Generate 500+ farm sensor readings as a table or CSV. Each reading must have:
>
> *   timestamp (ISO 8601, UTC),
> *   field_id (e.g., 'field_1', 'field_2', ...),
> *   sensor_type (one of: soil_moisture, temperature, humidity, ph, sunlight, rainfall, wind_speed, soil_nitrogen),
> *   reading_value (in a realistic range for the type),
> *   unit (see below).
>
> Output as CSV or JSONL."

The resulting file, `data.json`, is included in the root of this repository.

## Design Choices & Potential Improvements

If I had more time, here are a few things I would have added or improved:

*   **Robust Analytics Endpoint:** I would build a dedicated `GET /analytics` endpoint that could perform aggregations (e.g., average temperature per field, daily rainfall totals) directly in the database for efficiency.
*   **Frontend State Management:** For a more complex app, I'd integrate a state management library like Redux Toolkit or Zustand to handle the application state more cleanly instead of passing props down through multiple levels.
*   **Testing:** I would write unit and integration tests for the backend using `pytest` and component tests for the frontend using React Testing Library to ensure reliability and prevent regressions.
*   **Error Handling & Logging:** I'd implement structured logging in the backend and provide more specific error feedback to the user on the frontend.
