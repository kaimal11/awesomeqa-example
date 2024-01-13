from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "./data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)


@app.get("/healthz")
async def root():
    return "OK"


@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    return JSONResponse(tickets, status_code=200)

@app.put("/messages/{id}")
async def get_message(id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    message = ticket_repository.get_message_from_id(id)
    return JSONResponse(message, status_code=200)

@app.put("/tickets/{ticket_id}/update")
async def update_ticket_status(ticket_id: str, ticket_repository: TicketRepository = Depends(lambda: ticket_repository)):
    tickets = ticket_repository.remove_ticket(ticket_id)
    return JSONResponse({"status": "Updated"}, status_code=200)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
