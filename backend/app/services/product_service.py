from typing import List
from fastapi import HTTPException
from sqlmodel import Session
from app.models.product import ProductCreate, ProductUpdate, Product
from app.repositories.product_repo import ProductRepository


class ProductService:
    def __init__(self, session: Session):
        self.repository = ProductRepository(session)

    def list_products(self, skip: int = 0, limit: int = 100) -> List[Product]:
        return self.repository.get_all(skip=skip, limit=limit)

    def get_product(self, product_id: int) -> Product:
        db_product = self.repository.get_by_id(product_id)
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")
        return db_product

    def create_product(self, product_data: ProductCreate) -> Product:
        return self.repository.create(product_data)

    def update_product(self, product_id: int, product_data: ProductUpdate) -> Product:
        db_product = self.get_product(product_id)
        return self.repository.update(db_product, product_data)

    def delete_product(self, product_id: int):
        db_product = self.get_product(product_id)
        self.repository.delete(db_product)
        return {"message": "Deleted successfully."}