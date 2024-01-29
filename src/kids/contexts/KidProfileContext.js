import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { fetchKidsProfile } from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const KidProfileContext = createContext({});

export const KidProfileProvider = ({ children }) => {
    const [kidProfile, setKidProfile] = useState(null);
    const auth = useContext(AuthContext);
    const params = useParams();

    const onFetchKidsProfile = useCallback(async () => {
        try {
            const json = await fetchKidsProfile(params.slug, auth.token);
            if (json) {
                setKidProfile(json);
            }
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
        }
    }, [params.slug, auth.token]);

    useEffect(() => {
        onFetchKidsProfile();
    }, [onFetchKidsProfile]);

    return (
        <KidProfileContext.Provider value={kidProfile}>
            {children}
        </KidProfileContext.Provider>
    );
};

export const useKidProfile = () => useContext(KidProfileContext);
