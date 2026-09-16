from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from enum import Enum

class PlotStatusEnum(str, Enum):
    AVAILABLE = "available"
    RESERVED = "reserved"
    PENDING = "pending"
    SOLD = "sold"

class PlotBase(BaseModel):
    plot_number: str
    estate_id: UUID
    svg_id: Optional[str] = None
    rate_per_sqm: float
    total_price: float
    status: PlotStatusEnum

class PlotUpdateStatus(BaseModel):
    status: PlotStatusEnum

class PlotResponse(PlotBase):
    id: UUID

    class Config:
        from_attributes = True

class EstateBase(BaseModel):
    name: str
    total_land_size_sqm: float
    title_document: Optional[str] = None

class EstateResponse(EstateBase):
    id: UUID

    class Config:
        from_attributes = True
