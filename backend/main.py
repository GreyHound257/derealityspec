from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import models
from .database import engine, get_db

# Create tables
# Note: In production, use Alembic for migrations instead of creating tables here
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="De Reality Spec API", description="Enterprise REMS API")

@app.get("/")
def read_root():
    return {"message": "Welcome to De Reality Spec API"}

@app.get("/api/estates")
def get_estates(db: Session = Depends(get_db)):
    return db.query(models.Estate).all()

@app.get("/api/plots")
def get_plots(db: Session = Depends(get_db)):
    return db.query(models.Plot).all()

@app.get("/api/payments")
def get_payments(db: Session = Depends(get_db)):
    return db.query(models.Payment).all()
