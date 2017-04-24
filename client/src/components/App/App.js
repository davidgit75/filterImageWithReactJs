import React from 'react';
import { Route } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import './styles.css';

import Indicator from './Indicator';
import Filters from './Filters';
import ButtonUpload from './ButtonUpload';

import filterActions from '../../redux/actions/buttonActions';

const ButtonFilter = ({ filterImage }) => {
  return (
    <FloatingActionButton
      className="fab filter"
      onTouchTap={() => filterImage()}
    >
      <i className="material-icons">format_paint</i>
    </FloatingActionButton>
  );
};

const App = (props) => {
  return (
    <div className="container">
      <div className="row">

      <div className="col s8 offset-s2 m6 offset-m3 mrow">
        <Indicator />
      </div>

      <div className="col s8 offset-s2 m6 offset-m3 mrow">
        <Filters />
      </div>

      <div className="col s8 offset-s2 m6 offset-m3 mrow">
        <form encType="multipart/form-data">
          <input
            type="file"
            accept='image/*'
            onChange={e => {
              props.setImage(e.target.files[0]);
              props.setUpload(true);
            }}
          />
        </form>
      </div>

      
      <ButtonUpload uploadImage={() => props.uploadImage()} />
      <ButtonFilter filterImage={() => props.filterImage()}/>

      <br />
      <img src={props.src} />

      </div>
    </div>
  );
};

export default App;