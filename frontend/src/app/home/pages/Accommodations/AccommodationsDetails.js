// src/pages/AccommodationDetails.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AccommodationDetails() {
  const { hotelName } = useParams(); // Captura o parâmetro da URL
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Função para buscar os detalhes da acomodação
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/hotels/${hotelName}`); // Substitua pelo endpoint real
        setDetails(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      }
    };

    fetchDetails();
  }, [hotelName]);

  if (!details) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      {/* Outros detalhes da acomodação */}
    </div>
  );
}

export default AccommodationDetails;
