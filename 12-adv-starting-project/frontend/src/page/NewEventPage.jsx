import EventForm from "../components/EventForm"
import { json, redirect } from "react-router-dom";
export default function NewEventPage(){
    return (
        <EventForm/>
    )
}

export async function action({request}){
    const data = await request.formData();
    
    const eventData = {
        title: data.get('title'),
        description: data.get('description'),
        image: data.get('image'),
        date: data.get('date')
    }


    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-type': 'application/json'
        }
    })


    if(!response.ok){
        throw json({message: 'Error while sending the data'}, {status: 500})
    }

    return redirect('/events')
}