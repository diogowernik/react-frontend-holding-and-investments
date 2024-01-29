import { FaPiggyBank, FaCoins, FaShoppingCart, FaGamepad, FaBullseye, FaBook, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

export const dashboardButtons = [
    { id: 3, Icon: FaCoins, color: "#FFD700", text: "Mesadinha", isActive: true },
    { id: 2, Icon: FaMoneyBillWave, color: "#85BB65", text: "Ganhar", isActive: true},
    // Desativar esses botões por enquanto (não temos as telas), mas o icone aparecer meio apagado
    { id: 1, Icon: FaPiggyBank, color: "#6495ED", text: "Guardar", isActive: false},
    { id: 4, Icon: FaShoppingCart, color: "#FF6B6B", text: "Lojinha", isActive: false},
    { id: 5, Icon: FaGamepad, color: "#F6D365", text: "Desafios", isActive: false},
    { id: 6, Icon: FaBook, color: "#FF9A9E", text: "Extrato", isActive: false},
    { id: 7, Icon: FaBullseye, color: "#F0E6A7", text: "Metas", isActive: false},
    { id: 8, Icon: FaBook, color: "#C3AED6", text: "Educação", isActive: false},
    { id: 9, Icon: FaChartLine, color: "#7fdbda", text: "Crescimento", isActive: false},
];