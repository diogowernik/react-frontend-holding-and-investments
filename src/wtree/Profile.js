import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { FaEthereum, FaBitcoin } from 'react-icons/fa';
import './Profile.css';

const WalletCard = ({ type, address }) => {
    const icons = {
        Bitcoin: <FaBitcoin className="wallet-icon bitcoin" />,
        Ethereum: <FaEthereum className="wallet-icon ethereum" />,
        
    };

    return (
        <div className='wallet-card'>
            {icons[type] || null}
            <span>{type}</span>
            <p className='wallet-card-p'>{address}</p>
        </div>
    );
};


const Profile = () => {
    const profile = {
        id: 1,
        name: 'Diogo Wernik',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQH9GhJevfAQFA/profile-displayphoto-shrink_800_800/0/1669894845989?e=1711584000&v=beta&t=4mYrRWkdawmH4z5EjUyz7oI5k86m91M24k3-a3kX4so',
        message: "Support my work by donating to my wallets:",
        slug: "diogo.wernik"
    };

    const wallets = [
        {
            id: 1,
            type: "Ethereum",
            address: "0x12..5678"
        },
        {
            id: 2,
            type: "Bitcoin",
            address: "bc1f...x0wlh"
        }
    ];

    return (
        <Container id="profile-container">
        <Row className="justify-content-center mb-5">
            <Col md={12} className="text-center">
                <div className="profile-card p-4">
                    <img src={profile.avatar || "default-avatar.png"} alt="Perfil do usuário" className="profile-card-image mb-3" />
                    <h2 className="h5 mb-4">@{profile.name}</h2>
                    <p className="mb-4">{profile.message}</p>

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

