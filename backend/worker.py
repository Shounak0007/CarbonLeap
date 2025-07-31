from celery import Celery
from database import SessionLocal
import models
from datetime import datetime


celery_app = Celery(__name__)


celery_app.config_from_object('celery_config')



@celery_app.task
def process_batch_readings(readings_data: list):
    """..."""
    db = SessionLocal()
    try:
        db_readings = [models.SensorReading(**reading) for reading in readings_data]
        db.add_all(db_readings)
        db.commit()
        
        return {"status": "success", "processed_records": len(db_readings)}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        db.close()