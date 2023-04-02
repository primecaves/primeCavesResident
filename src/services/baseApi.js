import axios from 'axios';
import _get from 'lodash/get';

class Service {
  constructor() {
    const service = axios.create({
      baseURL: 'http://31.220.21.195:3000/api/v1/',
    });
    this.service = service;
  }

  getHeaders = () => {
    const headers = {};
    return headers;
  };

  get(url) {
    return this.service.request({
      method: 'GET',
      headers: this.getHeaders(),
      url,
      responseType: 'json',
    });
  }

  put(url, payload) {
    return this.service.request({
      method: 'PUT',
      headers: this.getHeaders(),
      url,
      responseType: 'json',
      data: payload,
    });
  }

  delete(url, payload) {
    return this.service.request({
      method: 'DELETE',
      headers: this.getHeaders(),
      url,
      responseType: 'json',
      data: payload,
    });
  }

  post(url, payload) {
    return this.service.request({
      method: 'POST',
      headers: this.getHeaders(),
      url: encodeURI(url),
      responseType: 'json',
      data: payload,
    });
  }
}

export default new Service();
