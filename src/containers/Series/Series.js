import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


function Series() {

  const [series, setSeries] = useState([]);

  useEffect(() => {
    Axios.get('/api/series').then((res) => {
      setSeries(res.data.data);
    })
  }, []);

  const deleteSerie = (serieId) => {
    Axios.delete('/api/series/' + serieId)
      .then(res => {
        setSeries(series.filter(serie => serie.id !== serieId));
      });
  }

  function renderTableData(serie) {
    return (
      <tr key={serie.id}>
        <th scope="row">{serie.id}</th>
        <td>{serie.name}</td>
        <td>
          <Link className="btn btn-warning" to={"/series/" + serie.id}>Edit</Link>
          <button className="btn btn-danger" onClick={() => deleteSerie(serie.id)}>Remove</button>
        </td>
      </tr>);
  }


  return (
    <div className="container">
      <h1>Series</h1>
      <Link to="/series/new"><button className="btn btn-primary">Nova Série</button></Link>
      <table className="table table-dark table-striped  ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(series.length > 0) ? series.map(renderTableData) : <tr><td className="text-center" colSpan='3'>There's no series registered</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Series;