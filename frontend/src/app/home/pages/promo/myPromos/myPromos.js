import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import deletarPromo from '../../../services/promo/deletarPromo.js';
import ListarPromo from '../../../services/promo/listarPromo.js';
import NavBar from '../../Compartilhado/navbar.js';
import PopUp from '../../Compartilhado/popUp.js';
import ModalCadastrar from './modalCadastrar.js';
import ModalEditarPromo from './modalEditarPromo.js';
import './stylePromo.css';

const MyPromos = () => {
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

  const handleDeletePromo = async (id) => {
    try {
      await deletarPromo(id);
      window.location.reload();
    } catch (error) {
      alert('Erro ao deletar promoção');
    }
  };

  const handleUpdatePromo = (updatedPromo) => {
    setPromos(promos.map((promo) => (promo.promoId === updatedPromo.id ? { ...promo, ...updatedPromo } : promo)));
  };

  return (
    <div>
      <NavBar />
      <div>
        <header className='header-cadastro'>
          <h1>Minhas Promoções Cadastradas</h1>
          <div>
            <PopUp title='Cadastrar Promoção' >
              <ModalCadastrar onClose={() => window.location.reload()} onUpdate={handleUpdatePromo} />
            </PopUp>
          </div>
        </header>
        <div className='promo-list'>
          {promos.length === 0 ? (
            <p>No promotions available.</p>
          ) : (
            promos.map((promo) => (
              <div key={promo.promoId} className='promo-card'>
                <img src='https://www.blumarturismo.com.br/blog/wp-content/uploads/2022/11/1.jpg-1-840x500.png' alt='Hotel exemplo' className='promo-image' />
                <div className='promo-info'>
                  <h3>{promo.promoName}</h3>
                  <p>Propriedade: {promo.nome}</p>
                  <p>Preço: R$ {promo.precoPorNoite}</p>
                  <p>ID: {promo.id}</p>
                  <p>Desconto: {promo.desconto}%</p>
                  <p>Início: {promo.data_inicio}</p>
                  <p>Fim: {promo.data_fim}</p>
                  <Link to={`/promo/${promo.promoId}`} className='details-link'>Ver detalhes</Link>
                </div>
                <div className='promo-actions'>
                <MdDelete className={`lixeira ${promo.promoName.replace(/\s+/g, '-').toLowerCase()}`} onClick={() => handleDeletePromo(promo.promoId)} />
                  <PopUp title='Editar Promoção' className={`edit-popup ${promo.promoName.replace(/\s+/g, '-').toLowerCase()}`}>
                    <ModalEditarPromo promo={promo} onClose={() => window.location.reload()} onUpdate={handleUpdatePromo} />
                  </PopUp>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPromos;
