import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { list } from '../../services/accommodations/list.js';
import { deleteAccommodation } from '../../services/accommodations/delete.js';
import NavBar from '../Compartilhado/navbar.js';
import PopUp from '../Compartilhado/popUp.js';
import Button from '../Compartilhado/button.js'
import EditAccommodationModal from './EditAccommodationModal.js';
import './AccommodationsList.css';

const AccommodationsList = () => {
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await list()
        setAccommodations(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchAccommodations()
  }, [])

  const handlePublishClick = () => {
    navigate('/publish')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this accommodation?')) {
            try {
                await deleteAccommodation(id);
                setAccommodations(accommodations.filter(accommodation => accommodation.id !== id));
            } catch (error) {
                console.error('Error deleting accommodation:', error);
            }
        }
    };

    const handleUpdate = (updatedAccommodation) => {
        setAccommodations(prevState =>
          prevState.map(accommodation =>
            accommodation.id === updatedAccommodation.id ? updatedAccommodation : accommodation
          )
        );
      };

    return (
        <div>
            <NavBar />
            <div className="containerList">
                <h1>My Accommodations List</h1>
                <Button destino='/my-promos' nome='Ver Minhas Promoções Ativas' />
                <button className="publish-button" onClick={handlePublishClick}>
                Publish Accommodation
                </button>
                <div className="accommodation-list">
                {accommodations.map((accommodation) => (
                    <div key={accommodation.id} className="accommodation-item">
                        <h2>{accommodation.nome}</h2>
                        <p>Rooms: {accommodation.quantidadeQuartos}</p>
                        <p>Max Occupancy: {accommodation.lotacaoMaxima}</p>
                        <p>Price per Night: ${accommodation.precoPorNoite}</p>
                        <PopUp title='Edit'>
                        <EditAccommodationModal
                            accommodation={accommodation} 
                            onClose={() => window.location.reload()} 
                            onUpdate={handleUpdate} />
                        </PopUp>
                        <button onClick={() => handleDelete(accommodation.id)} className="delete-button">
                            Delete
                        </button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AccommodationsList
