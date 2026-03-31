from typing import List
from fastapi import HTTPException
from sqlmodel import Session
from app.repositories.brand_repo import BrandRepository
from app.models.brand import BrandCreate, BrandUpdate, Brand


class BrandService:
    def __init__(self, session: Session):
        self.repository = BrandRepository(session)

    def list_categories(self) -> List[Brand]:
        return self.repository.get_all()

    def get_brand(self, brand_id: int) -> Brand:
        db_brand = self.repository.get_by_id(brand_id)
        if not db_brand:
            raise HTTPException(status_code=404, detail="Brand not found")
        return db_brand

    def create_brand(self, brand_data: BrandCreate) -> Brand:
        return self.repository.create(brand_data)

    def update_brand(self, brand_id: int, brand_data: BrandUpdate) -> Brand:
        db_brand = self.get_brand(brand_id)
        return self.repository.update(db_brand, brand_data)

    def delete_brand(self, brand_id: int):
        db_brand = self.get_brand(brand_id)
        self.repository.delete(db_brand)
        return {"message": "Deleted successfully."}