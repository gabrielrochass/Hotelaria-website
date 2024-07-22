// aqui vai ser onde o usuário vai ver as promoções que ele criou, criar outras, editar e deletar
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import deletarPromo from '../../../services/promo/deletarPromo.js'
import ListarPromo from '../../../services/promo/listarPromo.js'
import NavBar from '../../Compartilhado/navbar.js'
import PopUp from '../../Compartilhado/popUp.js'
import ModalCadastrar from './modalCadastrar.js'
import ModalEditarPromo from './modalEditarPromo.js'

const MyPromos = () => {
  const [promos, setPromos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ListarPromo()
        console.log('Fetched data:', data) // Adicione isto para ver o formato dos dados
        if (Array.isArray(data)) {
          setPromos(data)
        } else {
          console.error('Expected an array but got:', data)
          setPromos([])
        }
      } catch (error) {
        console.error('Error fetching promotions:', error)
        setPromos([])
      }
    }
    fetchData()
  }, [])

  const handleDeletePromo = async (id) => {
    try {
      await deletarPromo(id)
      alert('Promoção deletada com sucesso!')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting promotion:', error)
      alert('Erro ao deletar promoção')
    }
  }

  const handleUpdatePromo = (updatedPromo) => {
    setPromos(promos.map((promo) => (promo.promoId === updatedPromo.id ? { ...promo, ...updatedPromo } : promo)))
  }

  return (
    <div>
      <NavBar />
      <div className='main'>
        <h1>My Promos Page</h1>
        <p>Criar, editar e deletar promoções</p>

        <div className='promo-list'>
          {promos.length === 0 ? (
            <p>No promotions available.</p>
          ) : (
            promos.map((promo) => (
              <div key={promo.promoId} className='promo-card'>
                <br></br>
                <img src='https://www.blumarturismo.com.br/blog/wp-content/uploads/2022/11/1.jpg-1-840x500.png' alt='Hotel exemplo' />
                <h3>{promo.promoName}</h3>
                <p>Propriedade: {promo.nome}</p>
                <p>Preço: {promo.precoPorNoite}</p>
                <p>ID: {promo.id}</p>
                <p>Desconto: {promo.desconto}</p>
                <p>Início: {promo.data_inicio}</p>
                <p>Fim: {promo.data_fim}</p>
                <Link to={`/promo/${promo.promoId}`}>Ver detalhes</Link>
                <button onClick={() => handleDeletePromo(promo.promoId)}>Deletar Promoção</button>
                <PopUp title='Editar Promoção'>
                  <ModalEditarPromo promo={promo} onClose={() => window.location.reload()} onUpdate={handleUpdatePromo} />
                </PopUp>
              </div>
            ))
          )}
        </div>
        <PopUp title='Cadastrar Promoção'>
        <ModalCadastrar onClose={() => window.location.reload()} onUpdate={handleUpdatePromo} />
        </PopUp>
      </div>
    </div>
  )
}

export default MyPromos
