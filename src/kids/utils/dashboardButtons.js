import {
  FaPiggyBank,
  FaCoins,
  FaShoppingCart,
  FaMoneyBillWave,
  FaGamepad,
  FaBullseye,
  FaBook,
  FaChartLine,
  FaGifts,
  FaUniversity,
  FaGlobeAmericas,
  FaUserCog,
} from 'react-icons/fa';
import { fetchKidsButtons } from '../../apis';

// Configurações padrão de visibilidade para os botões
const defaultVisibilitySettings = {
  show_dividends: true,
  show_quests: true,
  show_earnings: true,
  show_expenses: true,
  show_games: true,
  show_events: true,
  show_goals: true,
  show_education: true,
  show_growth: true,
  show_banks: true,
  show_explore: true,
  show_settings: true,
};

// Mapeamento padrão dos textos para os botões
const defaultTexts = {
  show_dividends: "Mesadinha",
  show_earnings: "Recebi",
  show_quests: "Ganhar",
  show_expenses: "Gastei",
  show_games: "Jogos",
  show_events: "Eventos",
  show_goals: "Metas",
  show_education: "Educação",
  show_growth: "Crescimento",
  show_banks: "Bancos",
  show_explore: "Explorar",
  show_settings: "Config",
};

// Configuração expandida dos botões
const buttonConfig = [
  { id: 1, Icon: FaCoins, color: "#FFD700", key: "show_dividends", link: "/mesadinha", isActive: true },
  { id: 2, Icon: FaPiggyBank, color: "#6495ED", key: "show_earnings", link: "/recebi", isActive: true },
  { id: 3, Icon: FaMoneyBillWave, color: "#85BB65", key: "show_quests", link: "/ganhar", isActive: true },
  { id: 4, Icon: FaShoppingCart, color: "#FF6B6B", key: "show_expenses", link: "/gastei", isActive: true },
  { id: 5, Icon: FaGamepad, color: "#F6D365", key: "show_games", link: "/jogos", isActive: true },
  { id: 6, Icon: FaGifts, color: "#FF9A9E", key: "show_events", link: "/eventos", isActive: true },
  { id: 7, Icon: FaBullseye, color: "#F0E6A7", key: "show_goals", link: "/metas", isActive: true },
  { id: 8, Icon: FaBook, color: "#C3AED6", key: "show_education", link: "/educacao", isActive: true },
  { id: 9, Icon: FaChartLine, color: "#7fdbda", key: "show_growth", link: "/crescimento", isActive: true },
  { id: 10, Icon: FaUniversity, color: "#4A90E2", key: "show_banks", link: "/bancos", isActive: true },
  { id: 11, Icon: FaGlobeAmericas, color: "#F5A623", key: "show_explore", link: "/explorar", isActive: true },
  { id: 12, Icon: FaUserCog, color: "#9B9B9B", key: "show_settings", link: "/config", isActive: true },
];

export async function fetchAndUpdateButtonVisibility(slug, token) {
  try {
    const response = await fetchKidsButtons(slug, token);
    if (Array.isArray(response) && response.length > 0) {
      const data = response[0];
      return data;
    } else {
      return defaultVisibilitySettings;
    }
  } catch (error) {
    console.error('Error fetching button visibility:', error);
    return defaultVisibilitySettings;
  }
}

export const updatedDashboard = async (slug, token) => {
  const visibilitySettings = await fetchAndUpdateButtonVisibility(slug, token);

  const updatedButtons = buttonConfig.map(config => {
    const isVisible = visibilitySettings[config.key] !== undefined ? visibilitySettings[config.key] : defaultVisibilitySettings[config.key];
    const text = defaultTexts[config.key]; // Assume que defaultTexts mapeia keys para textos personalizados
    return { ...config, text, isVisible: isVisible };
  });

  return updatedButtons;
};
