from sqlmodel import Field, SQLModel, Relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.product import Product

class CategoryBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)

class Category(CategoryBase, table=True):
    __tablename__ = "categories"

    id: int | None = Field(default=None, primary_key=True)
    products: list["Product"] = Relationship(back_populates="category")

class CategoryRead(CategoryBase):
    id: int

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    name: str | None = Field(default=None, min_length=1, max_length=100)