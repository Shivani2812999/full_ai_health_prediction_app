# full_ai_health_prediction_app

 # AI Health Prediction Application

## Overview

AI Health Prediction Application is a full-stack healthcare management system that allows users to manage patient records and generate AI-powered health predictions based on blood test parameters.

The application provides complete CRUD functionality, data validation, persistent storage, and integration with an AI-powered health prediction service to generate health-related remarks automatically.

This project was developed as part of the Junior AI/ML Developer Technical Assessment.

---

## Features

### Patient Management

* Create new patient records
* View all patient records
* Update patient information
* Delete patient records

### Data Validation

* Valid email address validation
* Date of birth validation
* Numeric validation for blood test values
* Required field validation

### Health Prediction

* AI-powered health assessment
* Automated health remarks generation
* Blood parameter analysis

### Persistent Storage

* Database-backed patient management
* Secure storage and retrieval of records

### Responsive User Interface

* Clean and intuitive design
* Easy navigation and usability
* Real-time feedback and validation

---

## Patient Information Captured

| Field         | Description                    |
| ------------- | ------------------------------ |
| Full Name     | Patient's full name            |
| Date of Birth | Patient's date of birth        |
| Email Address | Patient's email                |
| Glucose       | Blood glucose level            |
| Haemoglobin   | Haemoglobin level              |
| Cholesterol   | Cholesterol level              |
| Remarks       | AI-generated health prediction |

---

## Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* Bootstrap

### Backend

* Python
* FastAPI

### Database

* SQLite

### AI Integration

* Groq API
* LLM-based health analysis

---

## Project Architecture

```text
Frontend (React)

        │

        ▼

Backend API (FastAPI)

        │

        ▼

SQLite Database

        │

        ▼

AI Prediction Service (Groq)

        │

        ▼

Health Prediction Remarks
```

---

## Application Workflow

1. User enters patient details.
2. Input validation is performed.
3. Data is sent to the FastAPI backend.
4. Backend stores patient information in SQLite.
5. AI service analyzes blood test parameters.
6. Prediction remarks are generated.
7. Results are saved and displayed to the user.
8. Users can update or delete records at any time.

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/full_ai_health_prediction_app.git

cd full_ai_health_prediction_app
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run backend server
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=YOUR_API_KEY
```

Important:

* Do not upload API keys to GitHub.
* Use environment variables for sensitive information.

---

## API Endpoints

### Create Patient

```http
POST /patients
```

### Get All Patients

```http
GET /patients
```

### Update Patient

```http
PUT /patients/{id}
```

### Delete Patient

```http
DELETE /patients/{id}
```

---

## Challenges Faced

* Integrating AI predictions with patient workflows
* Managing frontend-backend communication
* Implementing proper validation
* Secure handling of API keys
* Maintaining clean and reusable code structure

---

## Future Enhancements

* User Authentication
* Role-Based Access Control
* PDF Report Generation
* Advanced Predictive Analytics
* Medical History Tracking
* Dashboard and Data Visualization
* Cloud Deployment

---

## Project Structure

```text
full_ai_health_prediction_app/

├── backend/
│   ├── main.py
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── ai_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Author

Shivani Hadapad

Junior AI/ML Developer Assessment Submission

GitHub: https://github.com/Shivani2812999

LinkedIn: (Add LinkedIn Profile)

---

## Disclaimer

This application is developed for educational and assessment purposes only. AI-generated health predictions are informational and should not be considered professional medical advice. Always consult qualified healthcare professionals for diagnosis and treatment.

