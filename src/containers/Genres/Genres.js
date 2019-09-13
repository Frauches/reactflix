import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


function Genres() {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Axios.get('/api/genres').then((res) => {
      setGenres(res.data.data);
    })
  }, []);

  function renderTableData(genre) {
    return (
      <tr key={genre.id}>
        <th scope="row">{genre.id}</th>
        <td>{genre.name}</td>
        <td><button>+</button></td>
      </tr>);
  }


  return (
    <div>
      <h1>Genres</h1>
      <div><Link to="/genres/new">Novo Gênero</Link></div>
      <table className="table table-dark table-striped  ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(genres.length > 0) ? genres.map(renderTableData) : <tr><td className="text-center" colSpan='3'>There's no genres registered</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Genres;