import { toast } from 'react-toastify';

// export function signIn(username, password) {
function request(path, { data = null, token = null, method = 'GET' }) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  })
    .then((response) => {
      // If it is success
      if (response.ok) {
        if (method === 'DELETE') {
          // If delete, nothing return
          return true;
        }
        return response.json();
      }

      // Otherwise, if there are errors
      return response
        .json()
        .then((json) => {
          // Handle JSON error, response by the server
          if (response.status === 400) {
            const errors = Object.keys(json).map((k) => `${json[k].join(' ')}`);
            throw new Error(errors.join(' '));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          throw new Error(e);
        });
    })
    .catch((e) => {
      // Handle all errors
      toast(e.message, { type: 'error' });
    });
}

export function signIn(username, password) {
  return request('/auth/token/login/', {
    data: { username, password },
    method: 'POST',
  });
}

export function register(username, password) {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST',
  });
}

export function fetchPlaces(token) {
  return request('/api/places/', { token });
}

export function addPlace(data, token) {
  return request('/api/places/', { data, token, method: 'POST' });
}

// portfolios

export function fetchPortfolios(token) {
  return request('/api/portfolios/', { token });
}

export function addPortfolio(data, token) {
  return request('/api/portfolios/', { data, token, method: 'POST' });
}

// upload to cloudinary

export function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "minhaholding_photos");

  return fetch("https://api.cloudinary.com/v1_1/minhaholding/image/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}