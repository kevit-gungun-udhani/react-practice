import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const {data, isError, isPending, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => {
      return fetchEvent({
        id: params.id,
        signal
      })
    }
  });

  const {mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: errorDeletion} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events')
    }
  })

  function handleDeleteStart(){
    setIsDeleting(true)
  }

  function handleDeleteStop(){
    setIsDeleting(false)
  }

  function handleDeleteEvent(){
    mutate({
      id
    })
  }
 
  return (
    <>
      {
        isDeleting && 
        <Modal onClose={handleDeleteStop}>
          <h1>Are you sure?</h1>
          {isPendingDeletion && <p>Deleting...</p>}
          {!isPendingDeletion && <div className='form-actions'>
            <button onClick={handleDeleteStop} className='button-text'>Cancel</button>
            <button onClick={handleDeleteEvent} className='button'>Delete</button>
          </div>}
          {isErrorDeletion && <ErrorBlock title='An error occured' message={errorDeletion.info?.message || 'Error while deleting an event'}/>}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator/>}

      {isError && <ErrorBlock title='An error occured while fetching data' message={error.info?.message || 'An error loading an event'}/>}

      {data && <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDeleteStart}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @  {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>}
    </> 
  );
}
