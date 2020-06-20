import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";


function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      setRepository(response.data);
    }

    loadRepositories();
  }, []);


  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: `Meu novo Título${Date.now()}`,
      url: 'http://www.rocketlab.com.br',
      techs: [
        "ReactJs", "Node", "React-Native"
      ]
    });

    setRepository([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const filterRepository = repositories.filter((repository) => repository.id !== id);

    setRepository(filterRepository);

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => {
            return (
              <li key={repository.id}>{repository.title}
            
              <button onClick={() => handleRemoveRepository(repository.id)} >
                Remover
              </button>
              </li>
            )}
          )}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
