from typing import List, Optional
from sqlmodel import Session, select
from app.models.brand import Brand, BrandCreate, BrandUpdate

class BrandRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Brand]:
        return self.session.exec(select(Brand)).all()

    def get_by_id(self, brand_id: int) -> Optional[Brand]:
        return self.session.get(Brand, brand_id)

    def create(self, brand_data: BrandCreate) -> Brand:
        db_brand = Brand.model_validate(brand_data)
        self.session.add(db_brand)
        self.session.commit()
        self.session.refresh(db_brand)
        return db_brand

    def update(self, db_brand: Brand, update_data: BrandUpdate) -> Brand:
        obj_data = update_data.model_dump(exclude_unset=True)
        db_brand.sqlmodel_update(obj_data)
        self.session.add(db_brand)
        self.session.commit()
        self.session.refresh(db_brand)
        return db_brand

    def delete(self, db_brand: Brand):
        self.session.delete(db_brand)
        self.session.commit()