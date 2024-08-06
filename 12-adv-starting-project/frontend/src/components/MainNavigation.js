import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to='/events' className={({isActive}) => isActive ? classes.active : undefined} end>Events</NavLink>
          </li>
          <li>
            <NavLink to='/events/:id' className={({isActive}) => isActive ? classes.active : undefined} end>Event Detail</NavLink>
          </li>
          <li>
            <NavLink to='/events/new' className={({isActive}) => isActive ? classes.active : undefined}>New Event</NavLink>
          </li>
          <li>
            <NavLink to='/events/:id/edit' className={({isActive}) => isActive ? classes.active : undefined}>Edit Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
// => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage