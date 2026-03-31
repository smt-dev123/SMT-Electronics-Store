from typing import List, Optional
from sqlmodel import Session, select
from app.models.slide import Slide, SlideCreate, SlideUpdate

class SlideRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Slide]:
        return self.session.exec(select(Slide)).all()

    def get_by_id(self, slide_id: int) -> Optional[Slide]:
        return self.session.get(Slide, slide_id)

    def create(self, slide_data: SlideCreate) -> Slide:
        db_slide = Slide.model_validate(slide_data)
        self.session.add(db_slide)
        self.session.commit()
        self.session.refresh(db_slide)
        return db_slide

    def update(self, db_slide: Slide, update_data: SlideUpdate) -> Slide:
        obj_data = update_data.model_dump(exclude_unset=True)
        db_slide.sqlmodel_update(obj_data)
        self.session.add(db_slide)
        self.session.commit()
        self.session.refresh(db_slide)
        return db_slide

    def delete(self, db_slide: Slide):
        self.session.delete(db_slide)
        self.session.commit()