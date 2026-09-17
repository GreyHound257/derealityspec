import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models import Base, Estate, Plot
from models.all import PlotStatus

# Ensure we use the local DB for seeding
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://jules:password@localhost/derealityspec"
)

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

async def seed_data():
    async with AsyncSessionLocal() as session:
        # Create Dummy Estate
        estate = Estate(
            name="Alpha Prototype Estate",
            total_land_size_sqm=50000.0,
            title_document="C of O"
        )
        session.add(estate)
        await session.flush() # flush to get estate.id

        # Create 5 Mock Plots matching our dummy SVG
        plots_data = [
            {"plot_number": "A1", "svg_id": "plot-A1", "sqm": 500, "price": 1000000, "status": PlotStatus.AVAILABLE},
            {"plot_number": "A2", "svg_id": "plot-A2", "sqm": 500, "price": 1000000, "status": PlotStatus.AVAILABLE},
            {"plot_number": "A3", "svg_id": "plot-A3", "sqm": 500, "price": 1000000, "status": PlotStatus.RESERVED},
            {"plot_number": "A4", "svg_id": "plot-A4", "sqm": 500, "price": 1000000, "status": PlotStatus.SOLD},
            {"plot_number": "A5", "svg_id": "plot-A5", "sqm": 600, "price": 1200000, "status": PlotStatus.AVAILABLE},
        ]

        for data in plots_data:
            plot = Plot(
                plot_number=data["plot_number"],
                estate_id=estate.id,
                svg_id=data["svg_id"],
                rate_per_sqm=data["price"] / data["sqm"],
                total_price=data["price"],
                status=data["status"]
            )
            session.add(plot)

        await session.commit()
        print("Database seeded successfully with 1 Estate and 5 Plots.")

if __name__ == "__main__":
    asyncio.run(seed_data())
