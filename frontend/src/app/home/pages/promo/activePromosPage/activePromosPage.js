import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListarPromo from '../../../services/promo/listarPromo.js';
import NavBar from '../../Compartilhado/navbar.js';
import '../myPromos/stylePromo.css';

const ActivePromosPage = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ListarPromo();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setPromos(data);
        } else {
          console.error('Expected an array but got:', data);
          setPromos([]);
        }
      } catch (error) {
        console.error('Error fetching promotions:', error);
        setPromos([]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='active-promo'>
      <NavBar />
      <div className="main">
        <header className='header-active'>
          <h1>Promoções Ativas</h1>
        </header>
        <div className="promo-list">
          {promos.length === 0 ? (
            <p>No promotions available.</p>
          ) : (
            promos.map((promo) => (
              <div key={promo.promoId} className="promo-card">
                <img src="https://www.blumarturismo.com.br/blog/wp-content/uploads/2022/11/1.jpg-1-840x500.png" alt="Hotel exemplo" className="promo-image" />
                <div className="promo-info">
                  <h3>{promo.promoName}</h3>
                  <p>Propriedade: {promo.nome}</p>
                  <p>Preço: R$ {promo.precoPorNoite}</p>
                  <p>ID: {promo.id}</p>
                  <p>Desconto: {promo.desconto}%</p>
                  <p>Início: {promo.data_inicio}</p>
                  <p>Fim: {promo.data_fim}</p>
                  <Link to={`/promo/${promo.promoId}`} className="details-link">Ver detalhes</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivePromosPage;
