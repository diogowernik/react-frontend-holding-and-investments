import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPiggyBank, FaMoneyBillWave, FaCoins, FaShoppingCart } from 'react-icons/fa';
import { useKidProfile } from '../../contexts/KidProfileContext'; // Ajuste o caminho conforme necessário

const KidsNav = () => {
  const kidProfile = useKidProfile();

  const menuButtons = [
    { id: 1, Icon: FaHome, color: "#6495ED", path: `/kids/${kidProfile?.slug}`, isActive: true },
    { id: 2, Icon: FaCoins, color: "#FFD700", path: `/kids/${kidProfile?.slug}/mesadinha`, isActive: true },
    { id: 3, Icon: FaMoneyBillWave, color: "#85BB65", path: `/kids/${kidProfile?.slug}/ganhar`, isActive: true },
    { id: 4, Icon: FaPiggyBank, color: "#6495ED", path: `/kids/${kidProfile?.slug}/recebi`, isActive: true },
    { id: 6, Icon: FaShoppingCart, color: "#e7ab3c", path: `/kids/${kidProfile?.slug}/gastei`, isActive: true },
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

