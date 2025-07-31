from pydantic import BaseModel
from datetime import datetime

class SensorReadingCreate(BaseModel):
    timestamp: datetime
    field_id: str
    sensor_type: str
    reading_value: float
    unit: str

class SensorReading(SensorReadingCreate):
    id: int

    class Config:
        orm_mode = True