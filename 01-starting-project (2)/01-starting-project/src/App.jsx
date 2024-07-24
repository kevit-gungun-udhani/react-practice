import { useEffect, useRef, useState, useCallback } from 'react';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'

const storedId = JSON.parse(localStorage.getItem('selectedItem')) || [];
const storedItem = storedId.map((id) => AVAILABLE_PLACES.find((place) => id === place.id));

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedItem);
  const [availablePlaces, setAvailablePlaces]  = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude)
      setAvailablePlaces(sortedPlaces)
    })
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedId = JSON.parse(localStorage.getItem('selectedItem')) || [];
    if(storedId.indexOf(id) === -1){
      localStorage.setItem('selectedItem', JSON.stringify([id, ...storedId]));
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    setModalIsOpen(false);

    const storedId = JSON.parse(localStorage.getItem('selectedItem'));
    localStorage.setItem('selectedItem', JSON.stringify(storedId.filter((id) => id !== selectedPlace.current)));
  }, [])

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Please wait..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
