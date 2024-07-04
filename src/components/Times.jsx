import React, { useState } from 'react';

export default function Times() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClubs = () => {
    setLoading(true);
    fetch('https://api.cartola.globo.com/clubes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setClubs(Object.values(data) || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clubs:', error);
        setError(error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <main>
      {loading && <p>Carregando...</p>}
      {error && <p>Error: {error.message}</p>}
      {clubs.map(club => (
        <div key={club.id} className="times">
          <img className='imagem_time' src={club.escudos['60x60']} alt={club.nome} />
         <div className='nome_apel'>
          <h2 className='h2_time'>{club.nome}</h2>
          <p className='p_time'>{club.apelido}</p></div>
        </div>
      ))}
    </main>
  );
}
