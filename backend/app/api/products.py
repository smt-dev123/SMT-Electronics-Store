from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.services.product_service import ProductService
from app.models.product import Product, ProductCreate, ProductReadWithBrand, ProductUpdate

router = APIRouter()

def get_product_service(session: Session = Depends(get_session)):
    return ProductService(session)

@router.get("/", response_model=List[ProductReadWithBrand])
async def list_products(
    skip: int = 0,
    limit: int = 100,
    service: ProductService = Depends(get_product_service)
):
    return service.list_products(skip=skip, limit=limit)

@router.get("/{product_id}", response_model=ProductReadWithBrand)
async def get_product(product_id: int, service: ProductService = Depends(get_product_service)):
    return service.get_product(product_id)

@router.post("/", response_model=Product, status_code=201)
async def create_product(product: ProductCreate, service: ProductService = Depends(get_product_service)):
    return service.create_product(product)

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: int, product: ProductUpdate, service: ProductService = Depends(get_product_service)):
    return service.update_product(product_id, product)

@router.delete("/{product_id}")
async def delete_product(product_id: int, service: ProductService = Depends(get_product_service)):
    return service.delete_product(product_id)