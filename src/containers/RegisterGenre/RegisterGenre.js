import React, { useState } from 'react';
import Axios from 'axios';


function RegisterGenre(props) {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  const saveGenre = (event) => {
    event.preventDefault();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Axios.post('/api/genres', { name }).then((res) => {
      props.history.push('/genres');
    })
    
  }

  return (
    <div className="container">
      <h1>New Genre</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" placeholder="Name" />
        </div>
        <button onClick={saveGenre} type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default RegisterGenre;