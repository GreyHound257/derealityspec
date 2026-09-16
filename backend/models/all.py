import enum
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from core.database import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    permissions = Column(JSONB, default=dict, nullable=False)

    users = relationship("User", back_populates="role")

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"), nullable=True)
    referral_code = Column(String, unique=True, index=True, nullable=True)
    referred_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    role = relationship("Role", back_populates="users")
    # For self-referential referral tree
    referred_by = relationship("User", remote_side=[id], backref="referrals")

class PlotStatus(str, enum.Enum):
    AVAILABLE = "available"
    RESERVED = "reserved"
    PENDING = "pending"
    SOLD = "sold"

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"

class Estate(Base):
    __tablename__ = "estates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True, nullable=False)
    total_land_size_sqm = Column(Float, nullable=False)
    title_document = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    plots = relationship("Plot", back_populates="estate")

class Plot(Base):
    __tablename__ = "plots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    plot_number = Column(String, index=True, nullable=False)
    estate_id = Column(UUID(as_uuid=True), ForeignKey("estates.id"), nullable=False)
    svg_id = Column(String, index=True, nullable=True) # ID mapping to SVG paths
    rate_per_sqm = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(Enum(PlotStatus), default=PlotStatus.AVAILABLE, nullable=False)

    estate = relationship("Estate", back_populates="plots")
    payments = relationship("Payment", back_populates="plot")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    plot_id = Column(UUID(as_uuid=True), ForeignKey("plots.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False) # Client making payment
    amount = Column(Float, nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    korapay_reference = Column(String, unique=True, index=True, nullable=True)
    proof_of_receipt_url = Column(String, nullable=True)
    verified_by_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    plot = relationship("Plot", back_populates="payments")
    client = relationship("User", foreign_keys=[user_id])
    verified_by = relationship("User", foreign_keys=[verified_by_admin_id])

class AgentPay(Base):
    __tablename__ = "agent_pay"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    payment_id = Column(UUID(as_uuid=True), ForeignKey("payments.id"), nullable=False)
    commission_percentage = Column(Float, nullable=False)
    payout_amount = Column(Float, nullable=False)
    status = Column(String, default="unpaid", nullable=False) # unpaid/settled
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    agent = relationship("User", foreign_keys=[agent_id])
    payment = relationship("Payment")
