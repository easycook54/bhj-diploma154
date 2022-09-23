/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = options.responseType;
  xhr.withCredentials = true;
  let formData = new FormData();
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
    if (options.method == "GET") {
      xhr.open(options.method, urlString);
      xhr.send();

    } else {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }

  } catch (e) {
    options.callback(e);
  }

  try {
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        options.callback(null, xhr.response);
      }
    });

  } catch (err) {
    options.callback(err);
  }

  return xhr;
};