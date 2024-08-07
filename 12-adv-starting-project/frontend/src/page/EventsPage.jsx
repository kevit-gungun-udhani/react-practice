import { NavLink } from "react-router-dom"

const EVENTS = [
    {name: "Event-1", id: "1"},
    {name: "Event-2", id: "2"},
    {name: "Event-3", id: "3"}
]
export default function EventsPage(){
    return(
        <>
            <h1>Events Page</h1>
            <ul>
                {EVENTS.map((event) => {
                    return <li key={event.id}>
                        <NavLink to={event.id}>{event.name}</NavLink>
                    </li>
                })}
            </ul>
        </>
    )
}