import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({signal, searchTerm, max}) {
  console.log(searchTerm)
  let url = 'http://localhost:3000/events';

  if (searchTerm && max) {
    url +=`?search=${searchTerm}&max=${max}`;
  }else if(searchTerm){
    url += `?search=${searchTerm}`
  }else if(max){
    url +=`?max=${max}`;
  }

  const response = await fetch(url, {signal: signal});

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(event) {
  console.log("data", event)
  const response = await fetch('http://localhost:3000/events', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json', 
    },
  });

  if (!response.ok) {
    const error = new Error('An error occured while sending new data');
    console.log(error);
    error.code = response.status;
    error.info = await response.json();
    throw error
  }

  const {events} = await response.json();
  return events;
}

export async function fetchImages({signal}){
   const response = await fetch('http://localhost:3000/events/images', {signal: signal});

   if(!response.ok){
    const error = new Error('Request to fetch images failed')
    error.code = response.status;
    error.info = await response.json();
    throw error;
   }

   const {images} = await response.json();
   return images;
}

export async function fetchEvent({id, signal}){
  const respone = await fetch(`http://localhost:3000/events/${id}`, {signal: signal});

  if(!respone.ok){
    const error = new Error('Error while fetching event data');
    error.code = respone.status;
    error.info = await respone.json();
    throw error;
  }

  const {event} = await respone.json();
  return event
}

export async function deleteEvent({id}){
   const respone = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'DELETE'
   })

   if(!respone.ok){
    const error = new Error('The delete request failed');
    error.code = respone.status;
    error.info = await respone.json();
    throw error;
   }

   return respone.json();
}

export async function updateEvent({id, event}){
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify({event}),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if(!response.ok){
    const error = new Error('Updating the data failed');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}

