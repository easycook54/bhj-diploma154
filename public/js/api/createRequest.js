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
    urlString += "?";
    for (let key in options.data) {
      urlString += key + "=" + options.data[key] + "&";
      formData.append(key, options.data[key]);
    }
    urlString = urlString.slice(0, -1);

  } else {
    options.data = {};
    urlString = "";
  }

  try {
    if (options.method === "GET") {
      xhr.open(options.method, urlString);
      xhr.send();

    } else {
      xhr.open(options.method, urlString);
      xhr.send(formData);
    }

  } catch (e) {
    console.log('catch' + e);
  }

  xhr.addEventListener('load', function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        options.callback(null, xhr.response);
      }
    });
};