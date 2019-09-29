import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Badge } from 'reactstrap';


function InfoSerie({ match }) {
  const [data, setData] = useState('');
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('EDIT');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Axios.get('/api/series/' + match.params.id).then((res) => {
      setData(res.data);
      setForm(res.data);
    })
  }, [match.params.id]);

  useEffect(() => {
    Axios.get('/api/genres/').then(res => {
      setGenres(res.data.data)
    })
  }, [])


  const handleChange = field => (event) => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  const saveSerie = (event) => {
    event.preventDefault();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Axios.put('/api/series/' + match.params.id, form).then((res) => {
      setSuccess(true);
    });

  }

  if (success) {
    return <Redirect to="/series" />;
  }

  const masterHeader = {
    height: '20vh',
    minHeight: '400px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  if (success) {
    return <Redirect to='/series' />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3"><img className="img-fluid img-thumbnail" src={data.poster} /></div>
              <div className="col-9">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {
                    data.status == 'WATCHED'
                      ? <Badge color="success">Assistido</Badge>
                      : <Badge color="warning">Não Assistido</Badge>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div><button className="btn btn-primary" onClick={() => setMode('EDIT')}>Edit</button></div>
      {
        mode === 'EDIT' &&

        <div className="container">
          <h1>New Serie</h1>
          <pre>{JSON.stringify(form)}</pre>
          <button className="btn btn-primary" onClick={() => setMode('INFO')}>Cancel Edit</button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" value={form.name} onChange={(event) => handleChange('name')(event)} className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <input type="text" value={form.comments} onChange={(event) => handleChange('comments')(event)} className="form-control" id="comment" placeholder="Comment" />
            </div>
            <div class="form-group">
              <label htmlFor="genre">Genre</label>
              <select class="form-control" id="genre" onChange={(event) => handleChange('genre_id')(event)}>
                {genres.map(genre => { return (<option key={genre.id} select={genre.id === form.genre} value={genre.id}>{genre.name}</option>)})}
              </select>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
              <label claclassNamess="form-check-label" htmlFor="exampleRadios1">
                Default radio
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
              <label className="form-check-label" htmlFor="exampleRadios2">
                Second default radio
              </label>
            </div>
            <button onClick={saveSerie} type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      }
    </div>
  );
}

export default InfoSerie;