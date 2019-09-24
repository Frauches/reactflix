import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';


function EditGenre({props, match}) {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setName(event.target.value);
  }

  useEffect(() => {
    Axios.get('/api/genres/' + match.params.id).then((res) => {
      setName(res.data.name);
    })
  }, [match.params.id]);

  const editGenre = (event) => {
    event.preventDefault();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Axios.put('/api/genres/'+ match.params.id, { name }).then((res) => {
      setSuccess(true);
    })
    
  }

  if (success) {
    return <Redirect to='/genres' />;
  }

  return (
    <div className="container">
      <h1>Edit Genre</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" placeholder="Name" />
        </div>
        <button onClick={editGenre} type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default EditGenre;