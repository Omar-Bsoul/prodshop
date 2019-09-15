import storage from './storage';
import http from './http';

const isAuth = async setCancel => {
  const user = JSON.parse(storage.retrieve('user'));

  if (user && user.authToken) {
    http.setAuthToken(user.authToken);
    try {
      const response = await http.get('users', setCancel);
      if (response.status === 200) {
        return true;
      } else if (response.status >= 400 && response.status < 500) {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

const authEffect = (resolve, reject) => {
  return () => {
    let cancelRequest = null;
    const setCancel = cancel => (cancelRequest = cancel);

    isAuth(setCancel)
      .then(resolve)
      .catch(reject);

    return () => {
      cancelRequest && cancelRequest();
    };
  };
};

export default { isAuth, authEffect };
