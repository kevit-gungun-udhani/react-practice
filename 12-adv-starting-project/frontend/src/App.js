// Challenge / Exercise



// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './page/HomePage'
import EventsPage, {loader as eventLoader} from './components/Events'
import EventDetailPage, {loader as eventDetailLoader} from './page/EventDetailPage'
import NewEventPage, {action as newEventAction} from './page/NewEventPage'
import EditEventPage from './page/EditEventPage'
import Root from './page/Root'
import EventRootPage from './page/EventRoot'
import ErrorPage from './page/Error'

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
            {index: true, element: <EventDetailPage/>},
            {path: 'edit', element: <EditEventPage/>}
          ], id:'event-detail'},
          {path: 'new', element: <NewEventPage/>, action: newEventAction},
          
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
