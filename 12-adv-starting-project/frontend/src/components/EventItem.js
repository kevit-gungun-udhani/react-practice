import { Link } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to='edit'>Edit</Link>
        <button >Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
