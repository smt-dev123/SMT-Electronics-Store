from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.services.category_service import CategoryService
from app.models.category import Category, CategoryCreate, CategoryUpdate

router = APIRouter()

def get_category_service(session: Session = Depends(get_session)):
    return CategoryService(session)

@router.get("/", response_model=List[Category])
async def list_categories(service: CategoryService = Depends(get_category_service)):
    return service.list_categories()

@router.get("/{category_id}", response_model=Category)
async def get_category(category_id: int, service: CategoryService = Depends(get_category_service)):
    return service.get_category(category_id)

@router.post("/", response_model=Category, status_code=201)
async def create_category(category: CategoryCreate, service: CategoryCreate = Depends(get_category_service)):
    return service.create_category(category)

@router.put("/{category_id}", response_model=Category)
async def update_category(category_id: int, category: CategoryUpdate, service: CategoryService = Depends(get_category_service)):
    return service.update_category(category_id, category)

@router.delete("/{category_id}")
async def delete_category(category_id: int, service: CategoryService = Depends(get_category_service)):
    return service.delete_category(category_id)