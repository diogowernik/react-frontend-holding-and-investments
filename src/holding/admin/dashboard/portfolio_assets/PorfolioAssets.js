import React, { useEffect, useState, useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AuthContext from '../../../../contexts/AuthContext';
import MainLayout from '../../../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { fetchPortfolioAssets } from '../../../../apis';
import PortfolioAssetsGrid from './portfolioAssetsGrid';
import DynamicFilters from '../shared/dynamicFilters';

const PortfolioAssets = () => {
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const params = useParams();

    const [filters, setFilters] = useState({ category: '', broker: '' });
    const [filteredAssets, setFilteredAssets] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            const assets = await fetchPortfolioAssets(params.id, auth.token);
            setPortfolioAssets(assets || []);
            setLoading(false);
        };
        fetchAssets();
    }, [params.id, auth.token]);

    useEffect(() => {
        const filtered = portfolioAssets.filter(asset =>
            asset.category.toLowerCase().includes(filters.category.toLowerCase()) &&
            asset.broker.toLowerCase().includes(filters.broker.toLowerCase())
        );
        setFilteredAssets(filtered);
    }, [filters, portfolioAssets]);

    return (
        <MainLayout>
            <Box sx={{ height: 750, width: '100%' }}>
                <DynamicFilters filters={filters} setFilters={setFilters} />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <PortfolioAssetsGrid
                        assets={filteredAssets}
                        setAssets={setPortfolioAssets}
                        authToken={auth.token}
                    />
                )}
            </Box>
        </MainLayout>
    );
};

export default PortfolioAssets;
