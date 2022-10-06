import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const MainLayout = ({ children }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onSignIn = () => {
    history.replace('/login');
  };
  const onRegister = () => {
    history.replace('/register');
  };
  const onSignOut = () => {
    auth.signOut();
    history.push('/login');
  };

  const gotoPortfolios = () => {
    history.push('/portfolios');
  };

  const gotoRadar = () => {
    history.push('/radar');
  };

  // gambiarra need to fix
  const gotoDividends = () => {
    history.push('/dividends/2');
  };

  return (
    <>
      <Navbar bg='light' variant='light' className='mb-4'>
        <Navbar.Brand href='/'>Minha Holding</Navbar.Brand>
        <Nav className='flex-grow-1'>
          <Nav.Link onClick={gotoPortfolios}>Portfolios</Nav.Link>
          <Nav.Link onClick={gotoRadar}>Radar</Nav.Link>
          <Nav.Link onClick={gotoDividends}>Dividendos</Nav.Link>
        </Nav>

        <Nav className='flex-grow-1 justify-content-end'>
          {auth.token ? (
            <Nav.Link onClick={onSignOut}>Logout</Nav.Link>
          ) : (
            [
              <Nav.Link key={1} onClick={onSignIn}>
                Login
              </Nav.Link>,
              <Nav.Link key={2} onClick={onRegister}>
                Register
              </Nav.Link>,
            ]
          )}
        </Nav>
      </Navbar>
      <>{children}</>
    </>
  );
};

export default MainLayout;
