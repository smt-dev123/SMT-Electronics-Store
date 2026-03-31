from typing import List
from fastapi import HTTPException
from sqlmodel import Session
from app.repositories.slide_repo import SlideRepository
from app.models.slide import Slide, SlideCreate, SlideUpdate

class SlideService:
    def __init__(self, session: Session):
        self.repository = SlideRepository(session)

    def list_slides(self) -> List[Slide]:
        return self.repository.get_all()

    def get_slide(self, slide_id: int) -> Slide:
        slide = self.repository.get_by_id(slide_id)
        if not slide:
            raise HTTPException(status_code=404, detail="Slide not found")
        return slide

    def create_slide(self, slide_data: SlideCreate) -> Slide:
        return self.repository.create(slide_data)

    def update_slide(self, slide_id: int, slide_data: SlideUpdate) -> Slide:
        db_slide = self.get_slide(slide_id)
        return self.repository.update(db_slide, slide_data)

    def delete_slide(self, slide_id: int):
        db_slide = self.get_slide(slide_id)
        self.repository.delete(db_slide)
        return {"message": "Deleted successfully."}