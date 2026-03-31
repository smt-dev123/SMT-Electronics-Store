from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.services.brand_service import BrandService
from app.models.brand import Brand, BrandCreate, BrandUpdate

router = APIRouter()

def get_brand_service(session: Session = Depends(get_session)):
    return BrandService(session)

@router.get("/", response_model=List[Brand])
async def list_categories(service: BrandService = Depends(get_brand_service)):
    return service.list_categories()

@router.get("/{brand_id}", response_model=Brand)
async def get_brand(brand_id: int, service: BrandService = Depends(get_brand_service)):
    return service.get_brand(brand_id)

@router.post("/", response_model=Brand, status_code=201)
async def create_brand(brand: BrandCreate, service: BrandCreate = Depends(get_brand_service)):
    return service.create_brand(brand)

@router.put("/{brand_id}", response_model=Brand)
async def update_brand(brand_id: int, brand: BrandUpdate, service: BrandService = Depends(get_brand_service)):
    return service.update_brand(brand_id, brand)

@router.delete("/{brand_id}")
async def delete_brand(brand_id: int, service: BrandService = Depends(get_brand_service)):
    return service.delete_brand(brand_id)