import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, json, useLoaderData, defer } from 'react-router-dom';

function EventsPage() {
  const data = useLoaderData();
  
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={data.events}>
        {(loadedEvents) => <EventsList  events={loadedEvents}/>}
        </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({message: 'An error has occured b'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function loader(){
    return defer({
        events: loadEvents()
    });
} 