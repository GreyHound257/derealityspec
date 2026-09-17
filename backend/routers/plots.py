from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID
from core.database import get_db
from core.security import get_current_user
from models import Plot, User
from schemas.plots import PlotResponse, PlotUpdateStatus

router = APIRouter()

@router.get("/", response_model=List[PlotResponse])
async def get_plots(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Fetch all plots. Must be authenticated.
    """
    result = await db.execute(select(Plot))
    plots = result.scalars().all()
    return plots

@router.put("/{plot_id}/status", response_model=PlotResponse)
async def update_plot_status(
    plot_id: UUID,
    status_update: PlotUpdateStatus,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a plot's status. Must be authenticated.
    """
    result = await db.execute(select(Plot).where(Plot.id == plot_id))
    plot = result.scalars().first()

    if not plot:
        raise HTTPException(status_code=404, detail="Plot not found")

    plot.status = status_update.status
    await db.commit()
    await db.refresh(plot)

    return plot
