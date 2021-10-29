from datetime import datetime
from enum import Enum
from typing import List

from pydantic import Field
from pydantic.main import BaseModel
from pydantic.networks import EmailStr, IPvAnyAddress

class UserRegister(BaseModel):
    # pip install 'pydantic[email]'
    email: str = None
    pw: str = None
    nickname: str = None


class UserLogin(BaseModel):
    email: str = None
    pw: str = None


class SnsType(str, Enum):
    email: str = "email"


class Token(BaseModel):
    Access_token: str = None
    Refresh_token: str = None


class MessageOk(BaseModel):
    message: str = Field(default="OK")


class UserToken(BaseModel):
    id: int
    email: str = None
    nickname: str = None
    status: str = None
    profile_img: str = None

    class Config:
        orm_mode = True


class UserMe(BaseModel):
    id: int
    email: str = None
    nickname: str = None
    status: str = None
    profile_img: str = None

    class Config:
        orm_mode = True


class AddApiKey(BaseModel):
    user_memo: str = None

    class Config:
        orm_mode = True


class GetApiKeyList(AddApiKey):
    id: int = None
    access_key: str = None
    created_at: datetime = None


class GetApiKeys(GetApiKeyList):
    secret_key: str = None


class CreateAPIWhiteLists(BaseModel):
    ip_addr: str = None


class GetAPIWhiteLists(CreateAPIWhiteLists):
    id: int

    class Config:
        orm_mode = True
