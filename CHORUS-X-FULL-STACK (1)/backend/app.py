from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "CHORUS-X API is running."}