import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPiggyBank,
  //  FaChartLine, FaGift, 
   FaQuestionCircle, FaMoneyBillWave, FaCoins } from 'react-icons/fa';

const KidsNav = () => {
  const menuButtons = [
    { id: 1, Icon: FaHome, color: "#6495ED", path: "/kids/isabel", isActive: true },
    { id: 2, Icon: FaCoins, color: "#FFD700", path: "/kids/isabel/mesadinha", isActive: true },
    { id: 3, Icon: FaMoneyBillWave, color: "#85BB65", path: "/kids/isabel/ganhar", isActive: true },
    { id: 4, Icon: FaPiggyBank, color: "#FF69B4", path: "/kids/isabel/guardar", isActive: false },
    // { id: 5, Icon: FaGift, color: "#FF69B4", path: "/kids/isabel/lojinha", isActive: false },
    { id: 6, Icon: FaQuestionCircle, color: "#F28D35", path: "/kids/isabel/ajuda", isActive: false },
    // { id: 7, Icon: FaChartLine, color: "#7fdbda", path: "/kids/isabel/crescimento", isActive: false },
];


    return (
      <Navbar bg="light" variant="light" className="justify-content-center custom-navbar" fixed="top">
        <Nav>
          {menuButtons.map(button => (
            button.isActive ? (
              <NavLink key={button.id} to={button.path} className="nav-link nav-icon">
                <button.Icon color={button.color} size={30} />
              </NavLink>
            ) : (
              // Use NavLink ainda para manter o espaçamento e alinhamento, mas adicione classes para desabilitar
              <NavLink key={button.id} to="#" className="nav-link nav-icon disabled" style={{ opacity: 0.5 }}>
                <button.Icon color={button.color} size={30} />
              </NavLink>
            )
          ))}
        </Nav>
    </Navbar>
    );
};

export default KidsNav;

