import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publish } from '../../services/accommodations/publish.js';
import NavBar from '../Compartilhado/navbar.js';
import './PublishAccommodation.css';

const PublishAccommodation = () => {
    const [formData, setFormData] = useState({
        nome: '',
        quantidadeQuartos: '',
        lotacaoMaxima: '',
        precoPorNoite: '',
        userId: '123' // Assuming userId is hardcoded for now
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await publish(formData);
            setLoading(false);
            navigate('/my-accommodations/list');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div>
        <NavBar />
            <div className="container">
                
                <h1>Publish Accommodation</h1>
                <form onSubmit={handleSubmit} className="publish-form">
                    <label>
                        Name:
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Quantidade de Quartos:
                        <input type="number" name="quantidadeQuartos" value={formData.quantidadeQuartos} onChange={handleChange} required />
                    </label>
                    <label>
                        Capacidade Maxima:
                        <input type="number" name="lotacaoMaxima" value={formData.lotacaoMaxima} onChange={handleChange} required />
                    </label>
                    <label>
                        Preço por Noite:
                        <input type="number" name="precoPorNoite" value={formData.precoPorNoite} onChange={handleChange} required />
                    </label>
                    <button type="submit">Publish</button>
                </form>
            </div>
        </div>
    );
};

export default PublishAccommodation;
