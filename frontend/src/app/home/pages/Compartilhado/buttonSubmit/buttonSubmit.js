import React from "react";
import './style.css';

const ButtonSubmit = ({ nome }) => {
    return (
        <button type="submit" data-testid="buttonSubmit" className="login-button">
            {nome}
        </button>
    );
}

export default ButtonSubmit;