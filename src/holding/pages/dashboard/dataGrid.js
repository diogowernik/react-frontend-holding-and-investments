import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Box, CircularProgress} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { grey } from '@mui/material/colors';

import AuthContext from '../../../contexts/AuthContext';
import MainLayout from '../../../layouts/MainLayout';
import { fetchPortfolioAssets, removePortfolioAsset, updatePortfolioAsset } from '../../../apis';
import Filters from './Filters';
import { onRemoveAsset, processRowUpdate } from './dataGridActions';
import { getColumns } from './columns';
import DeleteDialog from './deleteDialog';

const EditableTables = () => {
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]); // Adicionado para gerenciar os ativos filtrados
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ category: '', broker: '' }); // Estado para os filtros
    const auth = useContext(AuthContext);
    const params = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [assetIdToDelete, setAssetIdToDelete] = useState(null);

    useEffect(() => {
        const fetchAssets = async () => {
            const assets = await fetchPortfolioAssets(params.id, auth.token);
            setPortfolioAssets(assets || []);
            setFilteredAssets(assets || []); // Inicializa o filteredAssets
            setLoading(false);
        };
        fetchAssets();
    }, [params.id, auth.token]);

    useEffect(() => {
        // Aplica os filtros sempre que o estado filter ou portfolioAssets mudar
        const filtered = portfolioAssets.filter(asset =>
            asset.category.toLowerCase().includes(filter.category.toLowerCase()) &&
            asset.broker.toLowerCase().includes(filter.broker.toLowerCase())
        );
        setFilteredAssets(filtered);
    }, [filter, portfolioAssets]);

  const handleProcessRowUpdate = useCallback((newRow) => {
        return processRowUpdate(newRow, updatePortfolioAsset, auth.token);
    }, [auth.token]);

  const handleDialogOpen = (id) => {
      setOpenDialog(true);
      setAssetIdToDelete(id);
  }

  const handleDialogClose = () => {
      setOpenDialog(false);
  }

  const handleDeleteConfirmed = () => {
      setOpenDialog(false);
      onRemoveAsset(assetIdToDelete, removePortfolioAsset, setPortfolioAssets, auth.token);
  }


    const columns = getColumns(handleDialogOpen);
    

    return (
        <MainLayout>
            <Box sx={{ height: 750, width: '100%' }}>
                <Filters filter={filter} setFilter={setFilter} /> {/* Passando estado e setter para o componente Filters */}
                {loading ? <CircularProgress /> : (
                    <DataGrid
                        rows={filteredAssets} // Usando filteredAssets ao invés de portfolioAssets
                        columns={columns}
                        rowsPerPageOptions={[5, 10, 20]}
                        getRowId={(row) => row.id}
                        processRowUpdate={handleProcessRowUpdate}
                        experimentalFeatures={{ newEditingApi: true }}
                        sx={{ [`& .${gridClasses.row}`]: { bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900] } }}
                    />
                )}

                <DeleteDialog
                    open={openDialog}
                    handleClose={handleDialogClose}
                    handleDeleteConfirmed={handleDeleteConfirmed}
                />      
            </Box>
        </MainLayout>
    );
};

export default EditableTables;
