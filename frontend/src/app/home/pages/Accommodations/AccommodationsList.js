import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { list } from '../../services/accommodations/list.js';
import NavBar from '../Compartilhado/navbar.js';
import './AccommodationsList.css'

const AccommodationsList = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const data = await list();
                setAccommodations(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);

    const handlePublishClick = () => {
        navigate('/publish');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="containerList">
                <h1>My Accommodations List</h1>
                <button className="publish-button" onClick={handlePublishClick}>
                Publish Accommodation
                </button>
                <ul className="accommodation-list">
                    {accommodations.map(accommodation => (
                        <li key={accommodation.id} className="accommodation-item">
                            <h2>{accommodation.nome}</h2>
                            <p>Quantidade de Quartos: {accommodation.quantidadeQuartos}</p>
                            <p>Lotação Máxima: {accommodation.lotacaoMaxima}</p>
                            <p>Preço por Noite: ${accommodation.precoPorNoite}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AccommodationsList;
