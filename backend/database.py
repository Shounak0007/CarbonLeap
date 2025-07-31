import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# --- START OF THE DEBUGGING CODE ---
print("--- DEBUGGING ---")
print(f"DATABASE_URL as seen by the app: {SQLALCHEMY_DATABASE_URL}")
print("--- END DEBUGGING ---")
# --- END OF THE DEBUGGING CODE ---


if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()