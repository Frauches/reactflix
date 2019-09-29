import React, { useState } from 'react';
import Axios from 'axios';


function RegisterSerie(props) {
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  const saveSerie = (event) => {
    event.preventDefault();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Axios.post('/api/series', { name }).then((res) => {
      props.history.push('/series');
    })
    
  }

  return (
    <div className="container">
      <h1>New Serie</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" placeholder="Name" />
        </div>
        <button onClick={saveSerie} type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default RegisterSerie;