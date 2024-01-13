import React, { useState, useEffect } from 'react';
import { Avatar, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const Tickets = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/tickets');
                const result = await response.json();

                const updatedTickets = await Promise.all(result.map(async (ticket) => {
                    const messageResult = await getMessage(ticket.msg_id);
                    return { ...ticket, "messages": messageResult };
                }));
                setData(updatedTickets);
                console.log(updatedTickets)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const getMessage = async (msg_id) => {
        try {
            const response = await fetch(`http://localhost:5001/messages/${msg_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ id: msg_id.toString() })
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleDelete = async (index, ticket_id) => {
        try {
            const response = await fetch(`http://localhost:5001/tickets/${ticket_id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket_id: ticket_id.toString() })
            });
            const result = await response.json();
            console.log(index)
            const updatedData = [...data];
            updatedData.splice(index, 1);
            setData(updatedData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    const getItemBackgroundColor = (status) => {
        return status === 'open' ? '#BF181D' : '#38B261';
    };

    const formatTime = (timestamp) => {
        const time = new Date(timestamp).toLocaleString('en-US', { hour12: false });
        return time;
    };

    return (
        <List sx={{ m: 2 }}>
            {data.map((ticket, index) => {
                const formattedTime = formatTime(ticket.timestamp);
                const bgColor = getItemBackgroundColor(ticket.status);

                return (
                    <ListItem
                        key={index}
                        sx={{
                            border: '1px solid #CCCCCC',
                            marginBottom: '8px',
                            borderRadius: '4px',
                        }}
                    >
                        <Avatar sx={{ mx: 2, bgcolor: bgColor, color: "#FFFFFF", borderRadius: 2 }}>
                            <QuestionAnswerOutlinedIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <ListItemText primary={ticket.messages.content} />
                            <ListItemText primary={"by " + ticket.messages.author.name} />
                            <a href={ticket.msg_id} target="_blank">{ticket.messages.msg_url}</a>
                        </Box>
                        <ListItemText primary={formattedTime} />
                        <IconButton aria-label="delete" onClick={() => handleDelete(index, ticket.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Tickets;
