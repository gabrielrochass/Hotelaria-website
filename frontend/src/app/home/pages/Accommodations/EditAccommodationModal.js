import React, { useState } from 'react';
import { updateAccommodation } from '../../services/accommodations/update.js';
import Button from '../Compartilhado/button.js';

const EditAccommodationModal = ({ accommodation, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        id: accommodation.id,
        nome: accommodation.nome,
        quantidadeQuartos: accommodation.quantidadeQuartos,
        lotacaoMaxima: accommodation.lotacaoMaxima,
        precoPorNoite: accommodation.precoPorNoite,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedAccommodation = await updateAccommodation(formData.id, formData);
            onUpdate(updatedAccommodation);
            onClose();
        } catch (error) {
            console.error('Error updating accommodation:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Accommodation</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Rooms:
                        <input
                            type="number"
                            name="quantidadeQuartos"
                            value={formData.quantidadeQuartos}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Max Occupancy:
                        <input
                            type="number"
                            name="lotacaoMaxima"
                            value={formData.lotacaoMaxima}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price per Night:
                        <input
                            type="number"
                            name="precoPorNoite"
                            value={formData.precoPorNoite}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditAccommodationModal;