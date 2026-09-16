from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class PlotStatus(str, enum.Enum):
    AVAILABLE = "available"
    RESERVED = "reserved"
    SOLD = "sold"

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    INSTALLMENT = "installment"
    FULLY_PAID = "fully_paid"
    OVERDUE = "overdue"

class Estate(Base):
    __tablename__ = "estates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String, nullable=False)
    total_plots = Column(Integer, nullable=False)
    description = Column(String)
    
    plots = relationship("Plot", back_populates="estate")

class Plot(Base):
    __tablename__ = "plots"

    id = Column(Integer, primary_key=True, index=True)
    plot_number = Column(String, index=True, nullable=False)
    estate_id = Column(Integer, ForeignKey("estates.id"), nullable=False)
    size_sqm = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(Enum(PlotStatus), default=PlotStatus.AVAILABLE, nullable=False)
    
    estate = relationship("Estate", back_populates="plots")
    payments = relationship("Payment", back_populates="plot")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    plot_id = Column(Integer, ForeignKey("plots.id"), nullable=False)
    client_name = Column(String, nullable=False)
    amount_paid = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    plot = relationship("Plot", back_populates="payments")
