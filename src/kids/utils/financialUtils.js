import { FaGift, FaBuilding, FaStar, FaIceCream, FaPuzzlePiece, FaQuestion, FaGifts, FaPizzaSlice } from 'react-icons/fa';

// Dicionário para mapear os nomes dos meses
const monthNames = {
  '01': 'Janeiro', '02': 'Fevereiro', '03': 'Março',
  '04': 'Abril', '05': 'Maio', '06': 'Junho',
  '07': 'Julho', '08': 'Agosto', '09': 'Setembro',
  '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
};

export const formatByMonth = (items) => {
  return items.reduce((acc, item) => {
    const [day, month, year] = item.date.split('/');
    const formattedMonth = monthNames[month];
    if (!acc[formattedMonth]) {
      acc[formattedMonth] = [];
    }
    console.log(year)
    acc[formattedMonth].push({
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
