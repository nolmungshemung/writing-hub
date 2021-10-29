from typing import List
from uuid import uuid4

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.requests import Request

from app.common.consts import MAX_API_KEY, MAX_API_WHITELIST
from app.database.conn import db
from app.database.schema import Users
from app import models as m
from app.errors import exceptions as ex
import string
import secrets

from app.models import MessageOk, UserMe

router = APIRouter(prefix='/user')

@router.get('/me', response_model=UserMe)
async def get_me(request: Request):
    user = request.state.user
    user_info = Users.get(id=user.id)
    return user_info