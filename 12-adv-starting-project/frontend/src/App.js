// Challenge / Exercise



// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './page/HomePage'
import EventsPage, {loader as eventLoader} from './components/Events'
import EventDetailPage, {loader as eventDetailLoader, action as eventDetailAction} from './page/EventDetailPage'
import NewEventPage from './page/NewEventPage'
import EditEventPage from './page/EditEventPage'
import Root from './page/Root'
import EventRootPage from './page/EventRoot'
import ErrorPage from './page/Error'
import { action as manipulateEventAction } from './components/EventForm'
import NewsletterPage, {action as newsletterAction } from './page/NewsLetter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element:<HomePage/> },
      {
        path: 'events',
        element: <EventRootPage/>,
        children: [
          {index: true, element: <EventsPage/>, loader: eventLoader},
          {path: ':eventId', loader: eventDetailLoader, children: [
            {index: true, element: <EventDetailPage/>, action: eventDetailAction},
            {path: 'edit', element: <EditEventPage/>, action: manipulateEventAction}
          ], id:'event-detail'},
          {path: 'new', element: <NewEventPage/>, action: manipulateEventAction},
          
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
