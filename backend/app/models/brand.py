from sqlmodel import Field, SQLModel, Relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.product import Product


class BrandBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)

class Brand(BrandBase, table=True):
    __tablename__ = "brands"

    id: int | None = Field(default=None, primary_key=True)
    products: list["Product"] = Relationship(back_populates="brand")

class BrandRead(BrandBase):
    id: int

class BrandCreate(BrandBase):
    pass

class BrandUpdate(BrandBase):
    name: str | None = Field(default=None, min_length=1, max_length=100)