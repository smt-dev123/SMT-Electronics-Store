# FastAPI

### Install Dependencies:

```
pip install fastapi sqlmodel uvicorn
```

### Run Server:

```
uvicorn app.main:app --reload
```

## OR Using UV

### Install Dependencies:

```
uv sync
```

### Run Server:

```
fastapi dev
```

```
app/
├── api/
│ └── endpoints/
│ └── slides.py # API Router (Controller Layer)
├── services/
│ └── slide_service.py # Business Logic Layer
├── repositories/
│ └── slide_repository.py # Data Access Layer
├── models/
│ └── slide.py # SQLModel Data Models
└── db/
└── database.py # Database Configuration
```
