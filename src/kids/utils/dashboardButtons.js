import { FaPiggyBank, FaCoins, FaShoppingCart, FaGamepad, FaBullseye, FaBook, FaChartLine, FaMoneyBillWave, FaGifts } from 'react-icons/fa';
// import { removePortfolioAsset } from '../../apis';

export const dashboardButtons = [
    { id: 3, Icon: FaCoins, color: "#FFD700", text: "Mesadinha", isActive: true },
    { id: 2, Icon: FaMoneyBillWave, color: "#85BB65", text: "Ganhar", isActive: true},
    // Desativar esses botões por enquanto (não temos as telas), mas o icone aparecer meio apagado
    { id: 1, Icon: FaPiggyBank, color: "#6495ED", text: "Recebi", isActive: true},
    { id: 4, Icon: FaShoppingCart, color: "#FF6B6B", text: "Gastei", isActive: true},
    { id: 5, Icon: FaGamepad, color: "#F6D365", text: "Desafios", isActive: false},
    { id: 6, Icon: FaGifts, color: "#FF9A9E", text: "Eventos", isActive: false},
    { id: 7, Icon: FaBullseye, color: "#F0E6A7", text: "Metas", isActive: false},
    { id: 8, Icon: FaBook, color: "#C3AED6", text: "Educação", isActive: false},
    { id: 9, Icon: FaChartLine, color: "#7fdbda", text: "Crescimento", isActive: false},
    // rosa #FF69B4
];