from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db, engine
import models

app = FastAPI(title="De Reality Spec ERP API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Update in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to De Reality Spec ERP API"}

@app.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    return {"status": "ok", "database": "connected"}

# We rely on Alembic for migrations, but this is a fallback for simple local dev testing
# async def init_db():
#     async with engine.begin() as conn:
#         await conn.run_sync(models.Base.metadata.create_all)

# @app.on_event("startup")
# async def on_startup():
#     await init_db()
