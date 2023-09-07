import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaEthereum, FaBitcoin, FaShieldAlt, FaEyeSlash } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';

const Home = () => {
  // Função para rolagem suave
    const handleNavLinkClick = (e, id) => {
      e.preventDefault();

      const element = document.querySelector(id);
      if (element) {
          element.scrollIntoView({
              behavior: 'smooth'
          });
      }
  };

  return (
      <div>
          <Navbar bg="light" expand="lg" fixed="top">
              <Navbar.Brand href="#">Wallet Tree</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <Nav.Link href="#introduction" onClick={(e) => handleNavLinkClick(e, '#introduction')}>Introduction</Nav.Link>
                      <Nav.Link href="#profile" onClick={(e) => handleNavLinkClick(e, '#profile')}>Profile</Nav.Link>
                      <Nav.Link href="#privacy" onClick={(e) => handleNavLinkClick(e, '#privacy')}>Privacy</Nav.Link>
                      <Nav.Link href="#roadmap" onClick={(e) => handleNavLinkClick(e, '#roadmap')}>Roadmap</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>

          {/* Seção 1: Introdução */}
          <Container className="full-height bg-color1" id="introduction">
              <Row className="justify-content-center mb-5">
                  <Col md={8} className="text-center">
                      <h1 className="display-4">Wallet Tree</h1>
                      <p className="lead">
                          A revolutionary platform that lets you create a personal wallet profile, similar to link trees, but for your various cryptocurrency wallets. Receive donations, keep track of them, and even leave messages with each transaction.
                      </p>
                      <p className="font-weight-bold text-success">
                          Anticipated launch in May. Stay tuned!
                      </p>
                      <Button href="#profile" onClick={(e) => handleNavLinkClick(e, '#profile')} variant="success" size="lg" className="mb-4 notify-btn">Read more</Button>
                  </Col>
              </Row>
          </Container>

          {/* Seção 2: Explicação & Perfil de exemplo */}
          <Container className="full-height" id="profile">
              <Row className="justify-content-center mb-5">
                  <Col md={8}>
                      <h2 className='mb-3'>Your Customized Profile</h2>
                      <p>
                          Here, you'll be able to create unique profiles tailored to your cryptocurrency needs. Easily display all your wallet addresses in one place, making it simpler for others to send you funds or for you to keep track of multiple assets.
                      </p>
                      <div className="mt-5">
                          <h3 className="mb-5 mt-5">Share Your Unique Link</h3>
                          <p>
                              Once you've set up your profile, you'll receive a unique and customizable link. Share this link across social platforms, websites, or anywhere you'd like others to see your wallet addresses.
                          </p>
                          <div className="custom-link mt-5 p-3 rounded">
                              <span className="font-weight-bold">Your Link: </span><a href="https://wtr.ee/username" target="_blank" rel="noopener noreferrer">https://wtr.ee/username</a>
                          </div>
                      </div>
                  </Col>
                  <Col md={4} className="text-center">
                      {/* Exemplo de perfil */}
                      <div className="profile-example p-4">
                      <img src="profile.png" alt="User's profile" className="profile-image mb-3" />
                          <h2 className="h5 mb-3">@username</h2>
                          <p>Support my work by donating to my wallets:</p>

                          {/* Ethereum Card */}
                          <div className="wallet-card">
                              <FaEthereum className="wallet-icon ethereum" />
                              <span>Ethereum</span>
                              <p>0x1234...5678</p>
                          </div>

                          {/* Bitcoin Card */}
                          <div className="wallet-card">
                              <FaBitcoin className="wallet-icon bitcoin" />
                              <span>Bitcoin</span>
                              <p>bc1qxy2kgdygj...</p>
                          </div>

                          {/* Outros cards podem ser adicionados aqui */}
                      </div>
                  </Col>
              </Row>
          </Container>

          {/* Seção 4: Privacidade */}
          <Container className="full-height justify-content-center" id="privacy">
            <Row className="justify-content-center" id="privacy">
                <Col md={10} className="text-center padded-sides">
                    <h2 className="h2 mb-5">Your Privacy is Our Priority</h2>
                    <p className="mb-5">
                        At Wallet Tree, we deeply respect your privacy. Our platform is designed to offer convenience without compromising on the confidentiality of your transactions. We employ state-of-the-art security measures to ensure that your wallet details and transactions remain private and secure at all times.
                    </p>
                    <h3 className="h4 mb-5">Your peace of mind is central to our mission.</h3>
                    <Row className="mt-5">
                        <Col md={4}>
                            <Card className="privacy-card mb-5">
                                <Card.Body className="text-center">
                                    <FaShieldAlt size="8em" className="m-3 green-icon" />
                                    <Card.Title>Secure Encryption</Card.Title>
                                    <Card.Text>Advanced encryption techniques guard your data.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="privacy-card mb-5">
                                <Card.Body className="text-center">
                                    <MdLock size="8em" className="m-3 green-icon" />
                                    <Card.Title>Strict Confidentiality</Card.Title>
                                    <Card.Text>Your data are kept confidential and are never shared.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="privacy-card mb-5">
                                <Card.Body className="text-center">
                                    <FaEyeSlash size="8em" className="m-3 green-icon" />
                                    <Card.Title>Private Views</Card.Title>
                                    <Card.Text>Private options ensure security. We keep it really safe.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
          </Container>

          {/* Seção 5: Roadmap */}
          <Container className="full-height bg-color1" id="roadmap">
              <Container>
                  <Row className="justify-content-center mb-5">
                      <Col md={8} className="text-center">
                          <h2>Our Roadmap</h2>
                          <p className="lead">A glimpse into our journey and where we're headed next.</p>
                      </Col>
                      <Col md={10} className="mt-4 roadmap-list">
                          {/* Step 1 */}
                          <div className="roadmap-item completed">
                              <h4>Step 1: Ideation</h4>
                              <p>Conceptualization of the project and initial research.</p>
                          </div>
                          {/* Step 2 */}
                          <div className="roadmap-item">
                              <h4>Step 2: Prototyping</h4>
                              <p>Design and development of low-fidelity prototypes for the platform.</p>
                          </div>
                          {/* Step 3 */}
                          <div className="roadmap-item">
                              <h4>Step 3: Backend Development</h4>
                              <p>Setup of backend architecture, database, and initial integrations.</p>
                          </div>
                          {/* Step 4 */}
                          <div className="roadmap-item">
                              <h4>Step 4: Frontend Development</h4>
                              <p>User interface creation in React, initial usability tests.</p>
                          </div>
                          {/* Step 5 */}
                          <div className="roadmap-item">
                              <h4>Step 5: Social Media and Marketing</h4>
                              <p>Establishing online presence and kick-starting marketing campaigns.</p>
                          </div>
                          {/* Step 6 */}
                          <div className="roadmap-item">
                              <h4>Step 6: Beta Launch</h4>
                              <p>Releasing the beta version to a selected group of users and gathering feedback.</p>
                          </div>
                      </Col>
                  </Row>
              </Container>
          </Container>

          {/* Seção 6: Contato */}
          <footer className="container-fluid bg-dark text-white mt-5">
              <Container className="py-4">
                  <Row className="justify-content-center">
                      <Col md={8} className="text-center">
                          <h4 className="mb-3">Wallet Tree</h4>
                          <p>Empowering the cryptocurrency community, one link at a time.</p>
                          
                          {/* Social media icons */}
                          {/* <div className="my-3">
                              <a href="#" className="text-white mx-2">
                                  <i className="fab fa-facebook-f"></i>
                              </a>
                              <a href="#" className="text-white mx-2">
                                  <i className="fab fa-twitter"></i>
                              </a>
                              <a href="#" className="text-white mx-2">
                                  <i className="fab fa-instagram"></i>
                              </a>
                          </div> */}

                          {/* Copyright text */}
                          <p>&copy; 2023 Wallet Tree. All rights reserved.</p>
                      </Col>
                  </Row>
              </Container>
          </footer>
      </div>
    );
  };
export default Home;