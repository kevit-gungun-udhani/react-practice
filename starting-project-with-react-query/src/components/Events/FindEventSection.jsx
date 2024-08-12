import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { fetchEvents } from '../../util/http';
import EventItem from './EventItem';
import LoadingIndicator from '../UI/LoadingIndicator';
import { useState } from 'react';
import ErrorBlock from '../UI/ErrorBlock';

export default function FindEventSection() {
  const searchElement = useRef('');
  const [searchTerm, setSearchTerm] = useState();
  console.log('searchterm', searchTerm)
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['events', { search: searchTerm }],
    queryFn: ({ signal }) => {
      const data = fetchEvents({ signal, searchTerm });
      return data;
    },
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value)
  }

  let CONTENT = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    CONTENT = <LoadingIndicator />;
  }

  if (isError) {
    CONTENT = <ErrorBlock title='An Error Occured' message={error.info?.message || 'Failed to fecth the resources'}/>
  }

  if (data) {
    CONTENT = (
      <ul className="events-list">
        {data.map((event) => {
          return (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {CONTENT}
    </section>
  );
}
