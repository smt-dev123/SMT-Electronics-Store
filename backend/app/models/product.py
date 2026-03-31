from sqlmodel import Field, SQLModel, Relationship
from typing import Optional, TYPE_CHECKING

from app.models.brand import BrandRead
from app.models.category import CategoryRead

if TYPE_CHECKING:
    from app.models.brand import Brand 
    from app.models.category import Category

class ProductBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)
    slug: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None)
    price: Optional[float] = Field(default=0.0)
    oldPrice: Optional[float] = Field(default=None)
    isUsed: Optional[bool] = Field(default=False)
    image: Optional[str] = Field(default=None)
    brandId: Optional[int] = Field(default=None, foreign_key="brands.id")
    category_id: Optional[int] = Field(default=None, foreign_key="categories.id")

class Product(ProductBase, table=True):
    __tablename__ = "products"
    id: Optional[int] = Field(default=None, primary_key=True)

    brand: Optional["Brand"] = Relationship(back_populates="products")
    category: Optional["Category"] = Relationship(back_populates="products")

class ProductRead(ProductBase):
    id: int

class ProductReadWithBrand(ProductRead):
    brand: Optional[BrandRead] = None
    category: Optional[CategoryRead] = None


class ProductCreate(ProductBase):
    pass

class ProductUpdate(SQLModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    oldPrice: Optional[float] = None
    image: Optional[str] = None
    isUsed: Optional[bool] = None
    brandId: Optional[int] = None
    category_id: Optional[int] = None