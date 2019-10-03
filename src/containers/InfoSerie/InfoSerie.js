import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Badge } from 'reactstrap';


function InfoSerie({ match }) {
  const [data, setData] = useState('');
  const [form, setForm] = useState({name: ''});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('EDIT');
  const [genres, setGenres] = useState(new Array());
  const [genreIdSelected, setGenreIdSelected] = useState('');

  useEffect(() => {
    if (match.params.id) {
      Axios.get('/api/series/' + match.params.id).then((res) => {
        setData(res.data);
        setForm(res.data);
      })
    }
  }, [match.params.id]);

  useEffect(() => {
    Axios.get('/api/genres/').then(res => {
      setGenres(res.data.data)
      const genres = res.data.data;
      const found = genres.find(value => data.genre === value.name);
      if (found) {
        setGenreIdSelected({
          ...form,
          genre_id: found.id
        })
      }
    })
  }, [data])


  const handleChange = field => (event) => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  const handleChangeGenre = event => {
    setGenreIdSelected(event.target.value);
  }

  const selectOption = value => () => {
    setForm({
      ...form,
      status: value
    });
  }

  const saveSerie = (event) => {
    event.preventDefault();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Axios.put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreIdSelected
    }).then((res) => {
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
                    data.status === 'ASSISTIDO'
                      ? <Badge color="success">Assistido</Badge>
                      : <Badge color="warning">Para Assistir</Badge>
                  }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container"><button className="btn btn-primary" onClick={() => setMode('EDIT')}>Edit</button></div>
      {
        mode === 'EDIT' &&

        <div className="container">
          <h1>New Serie</h1>
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
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select className="form-control" id="genre" value={genreIdSelected} onChange={(event) => handleChangeGenre(event)}>
                {genres.map(genre => { return (<option key={genre.id} value={genre.id}>{genre.name}</option>) })}
              </select>
            </div>
            <div className="form-check">
              <input className="form-check-input" checked={form.status === 'ASSISTIDO'} type="radio" name="status" id="watched" value="ASSISTIDO" onChange={selectOption('ASSISTIDO')} />
              <label className="form-check-label" htmlFor="watched">
                Watched
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" checked={form.status === 'PARA_ASSISTIR'} type="radio" name="status" id="toWatch" value="PARA_ASSISTIR" onChange={selectOption('PARA_ASSISTIR')} />
              <label className="form-check-label" htmlFor="toWatch">
                To Watch
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