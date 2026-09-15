import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Load connection string from environment (e.g. Neon serverless Postgres)
# Example format: postgresql+asyncpg://user:password@host/dbname
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost/derealityspec")

# Configure connection pooling
engine = create_async_engine(
    DATABASE_URL,
    pool_size=10,        # Number of connections to keep open
    max_overflow=20,     # Maximum number of connections to allow beyond pool_size
    pool_pre_ping=True,  # Ping connection before use to ensure it's still active
    echo=False,          # Set to True for SQL query logging
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
