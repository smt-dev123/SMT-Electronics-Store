from fastapi import FastAPI
from sqlmodel import SQLModel
from app.api import root, slides, categories, brands, products
from app.db.database import engine
from app.models import  slide, category, brand, product

SQLModel.metadata.create_all(engine)
app = FastAPI()

app.include_router(root.router, tags=["Root"])
app.include_router(slides.router, prefix="/slides", tags=["Slides"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(brands.router, prefix="/brands", tags=["Brands"])
app.include_router(products.router, prefix="/products", tags=["Products"])