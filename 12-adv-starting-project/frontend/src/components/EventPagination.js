import { NavLink } from "react-router-dom";
import classes from './EventsPagination.module.css';

export default function EventPagination() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events">All Event</NavLink>
          </li>
          <li>
            <NavLink to="/events/new">Add New Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
