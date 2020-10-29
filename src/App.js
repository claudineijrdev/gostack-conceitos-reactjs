import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRespoitories] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRespoitories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const ret = await api.post('repositories',newRepository)
    setRespoitories([...repositories, ret.data])

  }

  async function handleRemoveRepository(id) {
    const ret = await api.delete(`repositories/${id}`)
    const index = repositories.findIndex(repository => repository.id === id )
    setRespoitories(repositories.filter(item => item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(item => {
            return (
              <li key={item.id}>
                {item.title}
                <button onClick={() => handleRemoveRepository(item.id)}>Remover</button>
              </li> 
            )
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
