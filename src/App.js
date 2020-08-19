import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [contador,setContador] = useState(1);
  useEffect(()=>{
    api.get('repositories').then(response => {
     console.log(response); 
     setRepositories(response.data);
     
    });
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Conceitos de react ${contador}`,
      url: "https://github.com/daanfeliix/Conceitos-ReactJs.git",
      techs: ["NodeJs", "JavaScript"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
    setContador(contador+1);
  }

  async function handleRemoveRepository(id) {

    const indexRepo = repositories.findIndex(project => project.id === id );
    api.delete(`repositories/${id}`).then(()=>{
    repositories.splice(indexRepo,1)
    setRepositories([...repositories]);    
  })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

             <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
             </button>
          </li>


        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
