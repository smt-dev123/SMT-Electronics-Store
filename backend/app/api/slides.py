from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.database import get_session
from app.models.slide import Slide, SlideCreate, SlideUpdate
from app.services.slide_service import SlideService

router = APIRouter()

def get_slide_service(session: Session = Depends(get_session)):
    return SlideService(session)

@router.get("/", response_model=List[Slide])
async def list_slides(service: SlideService = Depends(get_slide_service)):
    return service.list_slides()

@router.get("/{slide_id}", response_model=Slide)
async def get_slide(slide_id: int, service: SlideService = Depends(get_slide_service)):
    return service.get_slide(slide_id)

@router.post("/", response_model=Slide, status_code=201)
async def create_slide(slide: SlideCreate, service: SlideService = Depends(get_slide_service)):
    return service.create_slide(slide)

@router.put("/{slide_id}", response_model=Slide)
async def update_slide(slide_id: int, slide: SlideUpdate, service: SlideService = Depends(get_slide_service)):
    return service.update_slide(slide_id, slide)

@router.delete("/{slide_id}")
async def delete_slide(slide_id: int, service: SlideService = Depends(get_slide_service)):
    return service.delete_slide(slide_id)