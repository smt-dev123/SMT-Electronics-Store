from typing import List, Optional

from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from app.models.product import Product, ProductCreate, ProductUpdate

class ProductRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Product]:
        statement = (
            select(Product)
            .options(selectinload(Product.brand))
            .offset(skip)
            .limit(limit)
        )
        return self.session.exec(statement).all()

    def get_by_id(self, product_id: int) -> Optional[Product]:
        statement = select(Product).where(Product.id == product_id).options(selectinload(Product.brand))
        return self.session.exec(statement).first()

    def create(self, product_data: ProductCreate) -> Product:
        db_product = Product.model_validate(product_data)
        self.session.add(db_product)
        self.session.commit()
        self.session.refresh(db_product)
        return db_product

    def update(self, db_product: Product, update_data: ProductUpdate) -> Product:
        obj_data = update_data.model_dump(exclude_unset=True)
        db_product.sqlmodel_update(obj_data)
        self.session.add(db_product)
        self.session.commit()
        self.session.refresh(db_product)
        return db_product

    def delete(self, db_product: Product):
        self.session.delete(db_product)
        self.session.commit()