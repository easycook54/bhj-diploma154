/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.withCredentials = true;
  const formData = new FormData();
  let urlString = options.url;

  if (options.data) {
    if (options.method === 'GET') {
      urlString += '?' + Object.entries(options.data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    }
    else {
      Object.entries(options.data).forEach(v => formData.append(...v));
    }
  }

  xhr.addEventListener('load', function() {
    let err = null;
    let response = null;
    const r = xhr.response;
    if (r && r.success) {
      response = r;
    }
    else {
        err = r;
    }
    options.callback(err, response);
  });
  
  try {
    xhr.open(options.method, urlString);
    xhr.send(formData);
  }
  catch (e) {
    callback(e);
  }
};