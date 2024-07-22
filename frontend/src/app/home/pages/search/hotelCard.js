import React from 'react';
import './styleCard.css'; 

const HotelCard = ({ hotel }) => {
  if (!hotel) {
    return <div>Invalid hotel data</div>;
  }

  return (
    <div className="hotel-card">
      <img className="hotel-card-image" src='https://www.blumarturismo.com.br/blog/wp-content/uploads/2022/11/1.jpg-1-840x500.png' alt='Hotel exemplo' />
      <div className="hotel-card-content">
        <h2 className="hotel-card-name">{hotel.name || 'No name available'}</h2>
        <p className="hotel-card-price">{hotel.price ? `R$${hotel.price}` : 'No price available'}</p>
      </div>
    </div>
  );
};

export default HotelCard;
