import { Outlet } from "react-router-dom"
import EventPagination from "../components/EventPagination"
export default function EventRootPage(){
    return (
        <>
            <EventPagination/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}