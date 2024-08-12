import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const {data, isError, isPending, error} = useQuery({
    queryKey: ['events', {id}],
    queryFn: ({signal}) => {
     return fetchEvent({
      signal,
      id
     })
    }
  })

  const {mutate} = useMutation({
    mutationFn: updateEvent
  })

  function handleSubmit(formData) {
    mutate({
      id,
      event: formData
    })
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if(isPending){
    content = <div className='center'>
      <LoadingIndicator/>
    </div>
  }

  if(isError){
    content = <>
      <ErrorBlock title='An error occured' message={error.info?.message || 'Error while fetching the data'}/>
      <div className='form-actions'>
        <Link to='../'>Okay</Link>
      </div>
    </>
  }

  if(data){
    content = <EventForm inputData={data} onSubmit={handleSubmit}>
      <Link to="../" className="button-text">
        Cancel
      </Link>
      <button type="submit" className="button">
        Update
      </button>
    </EventForm>
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
