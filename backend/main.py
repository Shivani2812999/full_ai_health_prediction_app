from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from fastapi import Depends

from database import Base
from database import engine
from database import SessionLocal

from schemas import PatientCreate

import crud
import ai_service

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# @app.post("/patients")
# def create_patient(
#     patient: PatientCreate,
#     db: Session = Depends(get_db)
# ):
#     remarks = ai_service.generate_health_remark(
#     patient.glucose,
#     patient.haemoglobin,
#     patient.cholesterol
#     )

#     patient_record = crud.create_patient(db, patient, remarks)

#     # patient_record = crud.create_patient(db, patient)

#     # patient_record.remarks = ai_service.generate_health_remark(
#     #     patient.glucose,
#     #     patient.haemoglobin,
#     #     patient.cholesterol
#     # )

#     db.commit()
#     db.refresh(patient_record)

#     return patient_record

@app.post("/patients")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    patient_record = crud.create_patient(db, patient)
    return patient_record


@app.get("/patients")
def get_patients(
    db: Session = Depends(get_db)
):
    return crud.get_patients(db)

@app.delete("/patients/{patient_id}")
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_patient(
        db,
        patient_id
    )

@app.put("/patients/{patient_id}")
def update_patient(patient_id: int, patient: PatientCreate, db: Session = Depends(get_db)):
    return crud.update_patient(db, patient_id, patient)