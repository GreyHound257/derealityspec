from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime

class RoleBase(BaseModel):
    name: str
    permissions: dict

class RoleResponse(RoleBase):
    id: UUID

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str
    referral_code: Optional[str] = None
    role_id: Optional[UUID] = None

class UserResponse(UserBase):
    id: UUID
    role_id: Optional[UUID] = None
    referral_code: Optional[str] = None
    referred_by_id: Optional[UUID] = None
    created_at: datetime

    class Config:
        from_attributes = True
