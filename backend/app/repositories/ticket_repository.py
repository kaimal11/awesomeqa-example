import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][:limit]
    
    def get_message_from_id(self, msg_id: str) -> dict:
        messages = self.data["messages"]
        return next((msg for msg in messages if msg.get('id') == msg_id), None)
    
    def remove_ticket(self, id:str):
        tickets = self.data["tickets"]
        tickets[:] = [item for item in tickets if item.get('id') != id]

        with open('data.json', 'w') as file:
            json.dump(tickets, file, indent=2)
