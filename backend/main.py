from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import PROJECT_NAME, API_V1_STR
from routers import auth, users

app = FastAPI(title=PROJECT_NAME, description="Enterprise REMS API")

# Setup CORS to allow requests from the frontend during dev (and later prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Add production URLs here later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=API_V1_STR + "/auth", tags=["auth"])
app.include_router(users.router, prefix=API_V1_STR + "/users", tags=["users"])
# We will include estates/plots routers here as we build them

@app.get("/")
def read_root():
    return {"message": "Welcome to De Reality Spec API"}
