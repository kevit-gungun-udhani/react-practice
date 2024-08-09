import { useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { Form } from 'react-router-dom';
import classes from './EventForm.module.css';
import { json, redirect } from "react-router-dom";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form className={classes.form} method={method}>
      {data && data.errors && <ul>
          {Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}){
  const data = await request.formData();
  const eventId = params.eventId;

  const eventData = {
      title: data.get('title'),
      description: data.get('description'),
      image: data.get('image'),
      date: data.get('date')
  }

  let url = 'http://localhost:8080/events';

  if(request.method === 'PATCH'){
    url = 'http://localhost:8080/events/' + eventId; 
  }

  const response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(eventData),
      headers: {
          'Content-type': 'application/json'
      }
  })

  if(response.status === 422){
      return response;
  }

  if(!response.ok){
      throw json({message: 'Error while sending the data'}, {status: 500})
  }

  return redirect('/events')
}
