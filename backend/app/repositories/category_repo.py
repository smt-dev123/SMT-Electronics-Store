from typing import List, Optional
from sqlmodel import Session, select
from app.models.category import Category, CategoryCreate, CategoryUpdate

class CategoryRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Category]:
        return self.session.exec(select(Category)).all()

    def get_by_id(self, category_id: int) -> Optional[Category]:
        return self.session.get(Category, category_id)

    def create(self, category_data: CategoryCreate) -> Category:
        db_category = Category.model_validate(category_data)
        self.session.add(db_category)
        self.session.commit()
        self.session.refresh(db_category)
        return db_category

    def update(self, db_category: Category, update_data: CategoryUpdate) -> Category:
        obj_data = update_data.model_dump(exclude_unset=True)
        db_category.sqlmodel_update(obj_data)
        self.session.add(db_category)
        self.session.commit()
        self.session.refresh(db_category)
        return db_category

    def delete(self, db_category: Category):
        self.session.delete(db_category)
        self.session.commit()