from fastapi import APIRouter
from .schemas import Item

router = APIRouter(prefix="/api")

fake_data = []


@router.post("/items")
def create_item(item: Item):
    fake_data.append(item)
    return {"data": item}


@router.get("/items")
def get_items():
    return {"data": fake_data}
