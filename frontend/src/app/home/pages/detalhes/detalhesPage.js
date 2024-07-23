import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LarDoceLar from '../../assets/LarDoceLar.jpg';
import MoradaDoMar from '../../assets/MoradaDoMar.png';
import Paraiso from '../../assets/Paraiso.jpg';
import PousadaMaresia from '../../assets/PousadaMaresia.jpg';
import Naiepe from '../../assets/PousadaNaiepe.jpg';
import Recanto from '../../assets/Recanto.jpeg';
import NavBar from '../Compartilhado/navbar.js';
import './style.css';

const Detalhes = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const name = localStorage.getItem("hotel");

  // Verifique se 'name' e 'hotels' estão definidos antes de tentar encontrar o hotel
  const hotel = name && hotels.find(hotel => hotel.name === name);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5001/consult/getHotels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      console.log('Received data:', data);

      setHotels(data.hotels || []);
      setError('');
    } catch (err) {
      console.error('Error occurred:', err);
      setError(err.message);
      setHotels([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLike = async () => {
    if (!hotel) return; // Evita tentar curtir se 'hotel' for undefined

    try {
      const userId = '1'; 
      const response = await fetch('http://localhost:5001/liking/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, accommodationId: hotel.id })
      });

      const data = await response.json();
      if (response.ok) {
        setLiked(true);
        console.log('Like added:', data);
      } else {
        console.error('Error adding like:', data.error);
      }
    } catch (err) {
      console.error('Error occurred:', err);
    }
    getData();
  };

  const handleUnlike = async () => {
    if (!hotel) return; // Evita tentar descurtir se 'hotel' for undefined

    try {
      const userId = '1'; 
      const response = await fetch('http://localhost:5001/liking/removeLike', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, accommodationId: hotel.id })
      });

      const data = await response.json();
      if (response.ok) {
        setLiked(false);
        console.log('Like removed:', data);
      } else {
        console.error('Error removing like:', data.error);
      }
    } catch (err) {
      console.error('Error occurred:', err);
    }
    getData();
  };

  let image;
  if (hotel && hotel.name === 'Morada do Mar') {
    image = MoradaDoMar;
  } else if (hotel && hotel.name === 'Pousada Maresia') {
    image = PousadaMaresia;
  } else if (hotel && hotel.name === 'Hotel Paraíso') {
    image = Paraiso;
  } else if (hotel && hotel.name === 'Lar Doce Lar') {
    image = LarDoceLar;
  } else if (hotel && hotel.name === 'Recanto dos Corais') {
    image = Recanto;
  } else if (hotel && hotel.name === 'Pousada Naiepe') {
    image = Naiepe;
  }

  const navigate = useNavigate();

  const handleReservation = () => {
    navigate('/payment-methods'); // Redireciona para a página de métodos de pagamento
  };

  return (
    <div className="detalhes-container">
      <NavBar />
      <div className="hotel-details">
        {hotel ? (
          <>
            <h1 className="hotel-name">{hotel.name}</h1>
            <img className='hotel-image' src={image} alt={hotel.name} />
            <div className="details-wrapper">
              <div className="details-info">
                <h2>Detalhes do Hotel</h2>
                <p><strong>Localização:</strong> {hotel.location}</p>
                <p><strong>Quartos disponíveis:</strong> {hotel.availableRooms}</p>
                <p><strong>Aceita animais:</strong> {hotel.petFriendly ? 'Sim' : 'Não'}</p>
                <p><strong>Acessibilidade:</strong> {hotel.accessibility ? 'Sim' : 'Não'}</p>
                <p><strong>Classificação:</strong> {`${'⭐'.repeat(hotel.rating)}`}</p>
                <p><strong>Likes:</strong> {hotel.likes}</p>
                <h3>Quartos:</h3>
                {hotel.rooms.map((room, index) => (
                  <div key={index} className="room-details">
                    <p><strong>Camas:</strong> {room.beds}</p>
                    <p><strong>Preço:</strong> {room.price}</p>
                    <p><strong>Datas livres:</strong> {room.freeDates.join(', ')}</p>
                  </div>
                ))}
              </div>
              <div className="details-actions">
                <button className="action-button" onClick={liked ? handleUnlike : handleLike}>
                  {liked ? 'Descurtir' : 'Curtir'}
                </button>
                <button className="action-button" onClick={handleReservation}>
                  Reservar
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Ops, não encontramos o hotel.</p>
        )}
      </div>
    </div>
  );
};

export default Detalhes;
