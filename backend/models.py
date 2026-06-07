from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from database import Base
from sqlalchemy import Column, Integer, String, Float, Date


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String)
    email = Column(String)
    dob = Column(Date)

    glucose = Column(Float)
    haemoglobin = Column(Float)
    cholesterol = Column(Float)
    status = Column(String)
    
    remarks = Column(String)