// KidsNav.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPiggyBank, FaChartLine, FaGift, FaQuestionCircle, FaMoneyBillWave } from 'react-icons/fa';

const KidsNav = () => {
  return (
    <Navbar bg="light" variant="light" className="justify-content-center custom-navbar" fixed="top">
      <Nav>
        <NavLink to="/kids/isabel" className="nav-link nav-icon">
          <FaHome color="#F28D35" size={30} />
        </NavLink>
        <Nav.Link href="#investments" className="nav-icon"><FaPiggyBank color="#85BB65" size={30} /></Nav.Link>
        <Nav.Link href="#growth" className="nav-icon"><FaChartLine color="#6495ED" size={30} /></Nav.Link>
        <Nav.Link href="#rewards" className="nav-icon"><FaGift color="#FF69B4" size={30} /></Nav.Link>
        <Nav.Link href="#help" className="nav-icon"><FaQuestionCircle color="#FFD700" size={30} /></Nav.Link>
        <Nav.Link href="#help" className="nav-icon"><FaMoneyBillWave color="#85BB65" size={30} /></Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default KidsNav;
