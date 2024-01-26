import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEthereum, FaBitcoin } from 'react-icons/fa';

const WalletCard = ({ type, address }) => {
    const icons = {
        Ethereum: <FaEthereum className="wallet-icon ethereum" />,
        Bitcoin: <FaBitcoin className="wallet-icon bitcoin" />
    };

    return (
        <Card className="wallet-card my-3">
            <Card.Body className="text-center">
                {icons[type] || null}
                <Card.Title>{type}</Card.Title>
                <Card.Text>{address}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const Profile = () => {
    const profile = {
        id: 1,
        name: 'Elon Musk',
        avatar: 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSmzBXdMiGL1J2TOIEYotw6k3TEokyCrRdubuVrlNxdhKgI0kWElRHAB_DmFKd5U6zP',
        message: "Empreendedor de tecnologia e espaço",
        slug: "elon.musk"
    };

    const wallets = [
        {
            id: 1,
            type: "Ethereum",
            address: "0x1234...5678"
        },
        {
            id: 2,
            type: "Bitcoin",
            address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        }
    ];

    return (
        <Container className="full-height" id="profile">
            <Row className="justify-content-center mb-5">
                <Col md={4} className="text-center">
                    <div className="profile-example p-4">
                        <img src={profile.avatar || "default-avatar.png"} alt="Perfil do usuário" className="profile-image mb-3" />
                        <h2 className="h5 mb-3">@{profile.name}</h2>
                        <p>{profile.message}</p>

                        {wallets.map(wallet => (
                            <WalletCard 
                                key={wallet.address}
                                type={wallet.type}
                                address={wallet.address}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
