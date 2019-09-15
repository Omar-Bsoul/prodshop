const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  const event = new Event('itemChanged');

  event.value = value;
  event.key = key;

  document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};

const store = (key, value) => {
  localStorage.setItem(key, value);
};

const retrieve = key => {
  return localStorage.getItem(key);
};

const registerOnChange = (key, handler) => {
  document.addEventListener(
    'itemChanged',
    event => {
      if (event.key === key) {
        handler(event.value);
      }
    },
    false
  );
};

const removeOnChange = handler => {
  document.removeEventListener('itemChanged', handler, false);
};

export default {
  store,
  retrieve,
  registerOnChange,
  removeOnChange
};
