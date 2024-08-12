import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate, isError, error, isPending, signal} = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate('/events')
    }
  });


  function handleSubmit(formData) {
    mutate({
      event: formData,
      signal: signal
    })
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (<>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)}
      </EventForm>
      {isError && <ErrorBlock title='An error occured' message={error.info?.message || 'An error occured while sending the data'}/>}
    </Modal>
  );
}
