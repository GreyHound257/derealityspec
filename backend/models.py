from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Date, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, unique=True, index=True, nullable=False) # Admin, Marketer, Accountant, etc.

    users = relationship("User", back_populates="role")

class Permission(Base):
    __tablename__ = "permissions"

    permission_id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("roles.role_id"), nullable=False)
    can_revoke_plot = Column(Boolean, default=False)
    can_verify_payment = Column(Boolean, default=False)

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.role_id"), nullable=False)
    referral_code = Column(String, unique=True, index=True, nullable=True)
    referred_by_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)

    role = relationship("Role", back_populates="users")
    referred_by = relationship("User", remote_side=[user_id], backref="referrals")
    payments_verified = relationship("Payment", back_populates="verified_by")
    commissions = relationship("AgentPay", back_populates="agent")

class Estate(Base):
    __tablename__ = "estates"

    estate_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    total_land_size_sqm = Column(Float, nullable=False)
    made_for = Column(String) # E.g., Residential, Commercial
    title_document = Column(String) # C of O, Excision, etc.

    prototypes = relationship("Prototype", back_populates="estate")
    plots = relationship("Plot", back_populates="estate")

class Prototype(Base):
    __tablename__ = "prototypes"

    prototype_id = Column(Integer, primary_key=True, index=True)
    estate_id = Column(Integer, ForeignKey("estates.estate_id"), nullable=False)
    name = Column(String, nullable=False)
    plot_size_sqm = Column(Float, nullable=False)
    room_count = Column(Integer, nullable=True)

    estate = relationship("Estate", back_populates="prototypes")

class Plot(Base):
    __tablename__ = "plots"

    plot_id = Column(Integer, primary_key=True, index=True)
    estate_id = Column(Integer, ForeignKey("estates.estate_id"), nullable=False)
    svg_id = Column(String, unique=True, nullable=False, index=True) # Unique map tag
    block_name = Column(String, nullable=False)
    plot_number = Column(String, nullable=False)
    rate_per_sqm = Column(Numeric(12, 2), nullable=False)
    total_price = Column(Numeric(12, 2), nullable=False)
    status = Column(String, default="Available") # Available, Sold, Reserved, Revoked, Pending Verification

    estate = relationship("Estate", back_populates="plots")
    payments = relationship("Payment", back_populates="plot")

class Payment(Base):
    __tablename__ = "payments"

    payment_id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    plot_id = Column(Integer, ForeignKey("plots.plot_id"), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    payment_method = Column(String, nullable=False) # e.g., Bank Transfer
    proof_of_receipt_url = Column(String, nullable=False) # URL to image/PDF
    payment_date = Column(Date, nullable=False)
    verified_by_admin_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    status = Column(String, default="Pending Verification")

    plot = relationship("Plot", back_populates="payments")
    client = relationship("User", foreign_keys=[client_id])
    verified_by = relationship("User", foreign_keys=[verified_by_admin_id], back_populates="payments_verified")
    commission = relationship("AgentPay", back_populates="payment", uselist=False)

class AgentPay(Base):
    __tablename__ = "agent_pay"

    commission_id = Column(Integer, primary_key=True, index=True)
    agent_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    payment_id = Column(Integer, ForeignKey("payments.payment_id"), nullable=False)
    commission_percentage = Column(Float, nullable=False)
    payout_amount = Column(Numeric(12, 2), nullable=False)
    payout_status = Column(String, default="Unpaid") # Unpaid, Settled Manual

    agent = relationship("User", back_populates="commissions")
    payment = relationship("Payment", back_populates="commission")
