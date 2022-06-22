import { toast } from 'react-toastify';
const base_url = process.env.REACT_APP_API_URI


// export function signIn(username, password) {
function request(path, { data = null, token = null, method = 'GET', message }) {
  return fetch(base_url + path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
    message 
  })
    .then((response) => {
      // If it is success
      if (response.ok) {
        if (method === 'POST') {
          toast.success(JSON.stringify(message).slice(1,-1), {
            
          });
        }
        else if (method === 'DELETE') {
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
    message: 'login realizado com sucesso'
  });
}

export function register(username, password) {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST',
    message: 'registro realizado com sucesso, faça o login para acessar o app'
  });
}

export function fetchPortfolios(token) {
  return request('/api/portfolios/', { token });
}
export function fetchBrokers(token) {
  return request('/api/brokers/', { token });
}
export function fetchAssets(token) {
  return request('/api/assets/', { token });
}

export function fetchFiis(token) {
  return request('/api/fiis/', { token });
}

export function fetchBrStocks(token) {
  return request('/api/br_stocks/', { token });
}

export function addPortfolio(data, token) {
  return request('/api/portfolios/', { data, token, method: 'POST', message: 'portfolio criado com sucesso' });
}
export function addTransaction(data) {
  return request('/api/transactions/', { 
    data, 
    method: 'POST', 
    message: 'Transação criada com sucesso'
  });
}

export function fetchPortfolio(id, token) {
  return request(`/api/portfolios/${id}`, { token });
}

export function removePortfolio(id, token) {
  return request(`/api/portfolios/${id}`, { token, method: "DELETE", message: 'Portfolio deletado com sucesso' });
}

export function updatePortfolio(id, data, token) {
  return request(`/api/portfolios/${id}`, { data, token, method: "PATCH", message: 'Portfolio atualizado com sucesso' });
}

export function fetchPortfolioAssets(id, token) {
  // return request(`/api/portfolios/${id}/assets`, { token });
  return request(`/api/portfolios/${id}/assets`, { token });
}

export function fetchPortfolioQuotas(id, token) {
  return request(`/api/portfolios/${id}/quotas`, { token });
}


// upload to cloudinary

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "minhaholding_photos");

  const response = await fetch("https://api.cloudinary.com/v1_1/minhaholding/image/upload", {
    method: "POST",
    body: formData,
  });
  return await response.json();
}
