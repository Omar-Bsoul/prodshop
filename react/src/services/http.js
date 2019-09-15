import axios, { CancelToken } from 'axios';

import { baseURL } from '../config.json';

function HttpClient() {
  let authToken = '';
  const config = { baseURL };
  const instance = axios.create(config);

  instance.interceptors.request.use(request => {
    request.headers['x-auth-token'] = authToken;
    return request;
  });

  instance.interceptors.response.use(null, error => {
    //console.log(error);
  });

  const setAuthToken = token => {
    authToken = token;
  };

  const httpGet = (url, setCancel) => {
    return instance.get(url, setCancel && { cancelToken: new CancelToken(setCancel) });
  };

  const httpPost = (url, payload, setCancel) => {
    return instance.post(url, payload, setCancel && { cancelToken: new CancelToken(setCancel) });
  };

  const httpPatch = (url, payload, setCancel) => {
    return instance.patch(url, payload, setCancel && { cancelToken: new CancelToken(setCancel) });
  };

  const httpPut = (url, payload, setCancel) => {
    return instance.put(url, payload, setCancel && { cancelToken: new CancelToken(setCancel) });
  };

  const httpDelete = (url, setCancel) => {
    return this.instance.delete(url, setCancel && { cancelToken: new CancelToken(setCancel) });
  };

  return {
    setAuthToken,
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    put: httpPut,
    delete: httpDelete
  };
}

export default HttpClient();
