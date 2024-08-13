import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const params = useParams();
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();

  const {data, isError, isPending, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => {
     return fetchEvent({
      signal,
      id: params.id
     })
    },
    staleTime: 10000
  })

  const {mutate, data: editedData} = useMutation({
    mutationFn: updateEvent,

    onMutate: async (data) => {
      const newEvent = data.event;
      console.log("New Event", newEvent);

      await queryClient.cancelQueries({ queryKey: ['events', params.id] });

      const previousData = queryClient.getQueryData(['events', params.id]);
      

      queryClient.setQueryData(['events', params.id], newEvent );
      console.log("Previous data", previousData)

      return {
        previousData: previousData
      }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id])
    }
  }) 


  function handleSubmit(formData) {
    submit(formData, {method: 'PUT'})
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
      {navigation === 'submitting' ? <p>Submitting</p> : 
       <>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </>}
     
    </EventForm>
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({params}){
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => {
     return fetchEvent({
      signal,
      id: params.id
     })
    }
  })
}

export async function action({request, params}){
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({id: params.id, event: updatedEventData});
  await queryClient.invalidateQueries(['events']);
  return redirect('../')
}