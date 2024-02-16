import { FaGift, FaBuilding, FaStar, FaIceCream, FaPuzzlePiece, FaQuestion, FaGifts, FaPizzaSlice } from 'react-icons/fa';

// Dicionário para mapear os nomes dos meses
const monthNames = {
  '01': 'Janeiro', '02': 'Fevereiro', '03': 'Março',
  '04': 'Abril', '05': 'Maio', '06': 'Junho',
  '07': 'Julho', '08': 'Agosto', '09': 'Setembro',
  '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
};

export const formatByYearAndMonth = (items) => {
  // Ordenar os itens pela data em ordem decrescente
  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB - dateA;
  });

  // Agrupar por ano e mês
  return sortedItems.reduce((acc, item) => {
    const [day, month, year] = item.date.split('/');
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][monthNames[month]]) {
      acc[year][monthNames[month]] = [];
    }
    acc[year][monthNames[month]].push({
      ...item,
      date: `${day}/${month}` // Formata a data como dd/mm
    });
    return acc;
  }, {});
};

export const getIconForCategory = (category, type) => {
  if (type === 'expenses') {
    switch (category) {
      case 'doces':
        return <FaIceCream color="#F0B27A" />;
      case 'brinquedos':
        return <FaPuzzlePiece color="#85C1E9" />;
      case 'comidas':
        return <FaPizzaSlice color="#F1948A" />;
      case 'outros':
        return <FaGifts color="#FFD700" />;
      // Adicione mais categorias e ícones conforme necessário para despesas
      default:
        return <FaQuestion color="#BFC9CA" />;
    }
  } else { // Assume 'earnings' como default se não for 'expenses'
    switch (category) {
      case 'presente':
        return <FaGift color="#FFD700" />;
      case 'aluguel':
        return <FaBuilding color="#85BB65" />;
      case 'missao':
        return <FaStar color="#6495ED" />;
      // Adicione mais categorias e ícones conforme necessário para ganhos
      default:
        return <FaQuestion color="#BFC9CA" />;
    }
  }
};
