import uvicorn
import models
import schemas

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from celery.result import AsyncResult
from worker import process_batch_readings, celery_app
from worker import celery_app
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Field Insights API",
    description="API for ingesting and analyzing farm sensor data.",
    version="0.1.0"
)

origins = [
    "http://localhost:3000",
    "http://localhost",
    "https://pleasing-solace-production.up.railway.app/"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

@app.get("/")
def read_root():
    return {"message": "Welcome to the Field Insights API2!"}


@app.post("/readings/", response_model=schemas.SensorReading)
def create_sensor_reading(reading: schemas.SensorReadingCreate, db: Session = Depends(get_db)):
    db_reading = models.SensorReading(**reading.dict())
    db.add(db_reading)
    db.commit()
    db.refresh(db_reading)
    return db_reading


@app.get("/readings/", response_model=List[schemas.SensorReading])
def read_sensor_readings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all sensor readings from the database with pagination.
    - **skip**: Number of records to skip.
    - **limit**: Maximum number of records to return.
    """
    readings = db.query(models.SensorReading).offset(skip).limit(limit).all()
    return readings


@app.post("/readings/batch", status_code=202)
def create_batch_readings(readings: List[schemas.SensorReadingCreate]):
    readings_dict = [r.model_dump() for r in readings]
    task = process_batch_readings.delay(readings_dict)
    return {"job_id": task.id}


@app.get("/jobs/{job_id}")
def get_job_status(job_id: str):
    """
    Retrieve the status and result of a background job.
    """
    task_result = AsyncResult(id=job_id, app=celery_app)
    
    response = {
        "job_id": job_id,
        "status": task_result.status,
        "result": task_result.result
    }
    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)