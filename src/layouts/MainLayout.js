import { Navbar, Nav, Container } from 'react-bootstrap';
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

  const gotoPlaces = () => {
    history.push('/places');
  };

  const gotoPortfolios = () => {
    history.push('/portfolios');
  };

  return (
    <>
      <Navbar bg='light' variant='light' className='mb-4'>
        <Navbar.Brand href='/'>Minha Holding</Navbar.Brand>
        <Nav className='flex-grow-1'>
          <Nav.Link onClick={gotoPlaces}>Places</Nav.Link>
          <Nav.Link onClick={gotoPortfolios}>Portfolios</Nav.Link>
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
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
