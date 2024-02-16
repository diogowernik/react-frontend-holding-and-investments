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
        if (response.ok) {
          if (method === 'POST') {
            toast.success(JSON.stringify(message).slice(1, -1));
          } else if (method === 'DELETE') {
            return true;
          }
          return response.json();
        }
  
        // Se houver erros
        return response.json().then((json) => {
          if (response.status === 400) {
            // Exibe erros detalhados para Bad Request
            const detailedErrors = Object.keys(json).map(key => {
              return `${key}: ${json[key].join(', ')}`;
            }).join('\n');
            toast.error('Erro: ' + detailedErrors);
            throw new Error('Erro: ' + detailedErrors);
          }
  
          throw new Error(JSON.stringify(json));
        });
      })
      .catch((e) => {
        toast.error(e.message);
        console.error('Erro na requisição:', e.message); // Log detalhado no console
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
// reits and stocks
export function fetchReits(token) {
  return request('/api/reits/', { token });
}

export function fetchStocks(token) {
  return request('/api/stocks/', { token });
}


export function addPortfolio(data, token) {
  return request('/api/portfolios/', { data, token, method: 'POST', message: 'portfolio criado com sucesso' });
}

export function addTransaction(data, token) {
  return request('/api/trade/', { 
    data, 
    token,
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

export function fetchPortfolioQuotas(id, token) {
  return request(`/api/portfolios/${id}/quotas`, { token });
}
export function fetchPortfolioAssets(id, token) {
  return request(`/api/portfolios/${id}/assets`, { token });
}

export function fetchPortfolioRadars(id, token) {
  return request(`/api/portfolios/${id}/radars`, { token });
  // return request(`/api/portfolios/2/radars`, { token });
}

export function fetchRadar(id, token) { 
  return request(`/api/radars/${id}`, { token });
}
export function fetchRadarCategories(id, radar_id, token) {
  return request(`/api/radars/${radar_id}/categories`, { token });
}
export function fetchRadarAssets(id, radar_id, token) {
  return request(`/api/radars/${radar_id}/assets`, { token });
}

// fetchPortfolioDividends
export function fetchPortfolioDividends(id, token) {
  return request(`/api/portfolios/${id}/dividends`, { token });
}

// fetchPortfolioEvolution

export function fetchPortfolioEvolution(id, token) {
  return request(`/api/portfolio/${id}/evolution`, { token });
}

export function removePortfolioAsset(id, token) {
  return request(`/api/portfolio_assets/${id}`, { token, method: "DELETE", message: 'Ativo deletado com sucesso' });
}

// addPortfolioAsset, updatePortfolioAsset
export function addPortfolioAsset(data, token) {
  return request('/api/portfolio_assets/', { data, token, method: 'POST', message: 'Ativo adicionado com sucesso' });
}
export function updatePortfolioAsset(id, data, token) {
  return request(`/api/portfolio_assets/${id}`, { data, token, method: "PATCH", message: 'Ativo atualizado com sucesso' });
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

// KidsProfile

export function fetchKidsProfiles(token) {
  return request('/api/kids/', { token });
}

export function fetchKidsProfile(slug, token) {
  return request(`/api/kids/${slug}`, { token });
}

export function fetchKidsProfileQuests(slug, token) {
  return request(`/api/kids/${slug}/quests`, { token });
}

export function fetchKQuest(slug, quest_key, token) {
  return request(`/api/kids/${slug}/quests/${quest_key}`, { token });
}

export function fetchKidsProfileDividends(slug, token) {
  return request(`/api/kids/${slug}/dividends`, { token });
}

export function fetchKidsEarns(slug, token) {
  return request(`/api/kids/${slug}/earns`, { token });
}

export function fetchKidsExpenses(slug, token) {
  return request(`/api/kids/${slug}/expenses`, { token });
}

export function fetchKidsButtons(slug, token) {
  return request(`/api/kids/${slug}/buttons`, { token });
}