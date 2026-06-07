from pydantic import BaseModel, Field, EmailStr
from pydantic import EmailStr
from pydantic import BaseModel
from datetime import date

class PatientResponse(BaseModel):

    id: int
    full_name: str
    email: str
    dob: date

    glucose: float
    haemoglobin: float
    cholesterol: float

    remarks: str

    class Config:
        from_attributes = True


class PatientCreate(BaseModel):
    full_name: str = Field(min_length=3, max_length=50)

    email: EmailStr

    dob: date

    glucose: float = Field(gt=0, lt=500)

    haemoglobin: float = Field(gt=0, lt=25)

    cholesterol: float = Field(gt=0, lt=400)


class PatientResponse(PatientCreate):

    id: int

    remarks: str

    class Config:
        from_attributes = True