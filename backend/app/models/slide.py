from sqlmodel import Field, SQLModel

class SlideBase(SQLModel):
    title: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None)
    badge: str | None = None
    image: str | None = None

class Slide(SlideBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class SlideCreate(SlideBase):
    pass

class SlideUpdate(SlideBase):
    title: str | None = None
    description: str | None = None
    badge: str | None = None
    image: str | None = None