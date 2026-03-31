from typing import List
from fastapi import HTTPException
from sqlmodel import Session
from app.models import category
from app.repositories.category_repo import CategoryRepository
from app.models.category import CategoryCreate, CategoryUpdate, Category


class CategoryService:
    def __init__(self, session: Session):
        self.repository = CategoryRepository(session)

    def list_categories(self) -> List[Category]:
        return self.repository.get_all()

    def get_category(self, category_id: int) -> Category:
        db_category = self.repository.get_by_id(category_id)
        if not db_category:
            raise HTTPException(status_code=404, detail="category not found")
        return db_category

    def create_category(self, category_data: CategoryCreate) -> Category:
        return self.repository.create(category_data)

    def update_category(self, category_id: int, category_data: CategoryUpdate) -> Category:
        db_category = self.get_category(category_id)
        return self.repository.update(db_category, category_data)

    def delete_category(self, category_id: int):
        db_category = self.get_category(category_id)
        self.repository.delete(db_category)
        return {"message": "Deleted successfully."}