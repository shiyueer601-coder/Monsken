# Monsken Backend Main Entry Point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Monsken API",
    description="Emotional Operating System Backend",
    version="0.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Monsken API 🌙"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
