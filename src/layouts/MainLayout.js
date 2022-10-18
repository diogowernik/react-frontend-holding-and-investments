import { Navbar, Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const MainLayout = ({ children }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const params = useParams();


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

  return (
    <>
      <Navbar bg='light' variant='light' className='mb-4'>
        <Navbar.Brand href='/'>Minha Holding</Navbar.Brand>
        <Nav className='flex-grow-1'>
          <Nav.Link onClick={gotoPortfolios}>Portfolios</Nav.Link>
          <Nav.Link onClick={gotoRadar}>Radar</Nav.Link>
        </Nav>
        <Nav variant="pills" className="justify-content-end">
            <Nav.Item>
                <Nav.Link onClick={() => history.push(`/portfolio_usd/${params.id}`)}>Usd</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => history.push(`/portfolio_brl/${params.id}`)}>Brl</Nav.Link>
            </Nav.Item>
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
