from sqlalchemy.orm import Session
from models import Patient
import ai_service


def create_patient(db: Session, patient_data):

    # AI call inside CRUD (clean architecture)
    remarks = ai_service.generate_health_remark(
        patient_data.glucose,
        patient_data.haemoglobin,
        patient_data.cholesterol
    )

    status = ai_service.extract_status(remarks)

    patient = Patient(
        full_name=patient_data.full_name,
        dob=patient_data.dob,
        email=patient_data.email,
        glucose=patient_data.glucose,
        haemoglobin=patient_data.haemoglobin,
        cholesterol=patient_data.cholesterol,
        remarks=remarks,
        status=status   # ✅ IMPORTANT
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient


def get_patients(db: Session):
    return db.query(Patient).all()


def delete_patient(db: Session, patient_id):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if patient:
        db.delete(patient)
        db.commit()

    return patient


def update_patient(db: Session, patient_id, patient_data):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        return None

    remarks = ai_service.generate_health_remark(
        patient_data.glucose,
        patient_data.haemoglobin,
        patient_data.cholesterol
    )

    status = ai_service.extract_status(remarks)

    patient.full_name = patient_data.full_name
    patient.email = patient_data.email
    patient.dob = patient_data.dob
    patient.glucose = patient_data.glucose
    patient.haemoglobin = patient_data.haemoglobin
    patient.cholesterol = patient_data.cholesterol

    patient.remarks = remarks
    patient.status = status   # ✅ IMPORTANT

    db.commit()
    db.refresh(patient)

    return patient