export const apiUrl = (path) => `${process.env.REACT_APP_API}/v1${path}`;

export const get = (url) =>
  fetch(url).then(async (r) => {
    const ret = await r.json();
    if (ret.error) {
      throw ret;
    }
    return ret;
  });

export const post = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((r) => r.json());

export const patch = (url, data) =>
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((r) => r.json());

export const remove = (url) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.text());
