import React, { useState } from 'react';
import NavBar from '../Compartilhado/navbar.js';
import HotelCard from './hotelCard.js';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    location: '',
    maxPrice: '',
    petFriendly: false,
    accessible: false,
    minRating: '',
    rooms: ''
  });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFilters = {
        checkIn: formatDate(filters.checkIn),
        checkOut: formatDate(filters.checkOut),
        guests: filters.guests,
        location: filters.location
    };

    if (filters.maxPrice) formattedFilters.maxPrice = filters.maxPrice;
    if (filters.petFriendly) formattedFilters.petFriendly = filters.petFriendly;
    if (filters.accessible) formattedFilters.accessible = filters.accessible;
    if (filters.minRating) formattedFilters.minRating = filters.minRating;
    if (filters.rooms) formattedFilters.rooms = filters.rooms;

    try {
        const response = await fetch('http://localhost:5001/searching/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedFilters)
        });

        if (!response.ok) {
            throw new Error('No hotels found');
        }

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


  return (
    <div>
      <NavBar />
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <input type="date" name="checkIn" value={filters.checkIn} onChange={handleChange} required />
          <input type="date" name="checkOut" value={filters.checkOut} onChange={handleChange} required />
          <input type="number" name="guests" value={filters.guests} onChange={handleChange} required placeholder="Guests" />
          <input type="text" name="location" value={filters.location} onChange={handleChange} required placeholder="Location" />
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Max Price" />
          <label>
            Pet Friendly
            <input type="checkbox" name="petFriendly" checked={filters.petFriendly} onChange={handleChange} />
          </label>
          <label>
            Accessible
            <input type="checkbox" name="accessible" checked={filters.accessible} onChange={handleChange} />
          </label>
          <input type="number" name="minRating" value={filters.minRating} onChange={handleChange} placeholder="Min Rating" />
          <input type="number" name="rooms" value={filters.rooms} onChange={handleChange} placeholder="Rooms" />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
