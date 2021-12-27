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

export function fetchPortfolios(token) {
  return request('/api/portfolios/', { token });
}

export function addPortfolio(data, token) {
  return request('/api/portfolios/', { data, token, method: 'POST' });
}


export function fetchPortfolio(id, token) {
  return request(`/api/portfolios/${id}`, { token });
}

export function addRadar(data, token) {
  return request("/api/radars/", { data, token, method: "POST" });
}

export function addRadarItems(data, token) {
  return request("/api/radar_items/", { data, token, method: "POST" });
}

export function updateRadarItem(id, data, token) {
  return request(`/api/radar_items/${id}`, { data, token, method: "PATCH" });
}

export function removePortfolio(id, token) {
  return request(`/api/portfolios/${id}`, { token, method: "DELETE" });
}

export function removeRadar(id, token) {
  return request(`/api/radars/${id}`, { token, method: "DELETE" });
}

export function removeRadarItem(id, token) {
  return request(`/api/radar_items/${id}`, { token, method: "DELETE" });
}

export function updatePortfolio(id, data, token) {
  return request(`/api/portfolios/${id}`, { data, token, method: "PATCH" });
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
