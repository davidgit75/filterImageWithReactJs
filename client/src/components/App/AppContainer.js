import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import filterActions from '../../redux/actions/filterActions';
import buttonActions from '../../redux/actions/buttonActions';
import App from './App';
import api from '../../config/api';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      nameImage: null,
      src: '',
    };
  }

  uploadImage() {
    let data = new FormData();
    data.append('file', this.state.image);
    data.append('name', 'newImage');
    console.log('data', data);
    axios.post(api.upload, data)
      .then(res => {
        this.setState({ nameImage: res.data.name })
      })
      .catch(error => console.log('error', error));
  }

  filterImage() {
    const dataFilter = { name: 'paisaje.jpg', filter: this.props.filter };
    console.log('dataFilter', JSON.stringify(dataFilter));
    axios.post(api.filter, dataFilter)
      .then(res => console.log('resFilter', res))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <App
        src={this.state.src}
        image={this.state.image}
        upload={this.props.upload}
        setImage={i => this.setState({ image: i })}
        uploadImage={e => this.uploadImage(e)}
        filterImage={() => this.filterImage()}
        setUpload={v => this.props.setUpload(v)}
      />
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
  upload: state.upload,
});

const mapDispatchToProps = dispatch => ({
  setFilter(filter){ return dispatch(filterActions(filter)) },
  setUpload(upload){ return dispatch(buttonActions(upload)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);