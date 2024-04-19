// deleteAction.js - conferir

import { useState, useCallback } from 'react';
import DeleteDialog from './deleteDialog';

const useDeleteAction = (deleteFunction) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDialogOpen = useCallback((id) => {
        setOpenDialog(true);
        setItemToDelete(id);
    }, []);

    const handleDialogClose = useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleDeleteConfirmed = useCallback(() => {
        deleteFunction(itemToDelete);
        setOpenDialog(false);
    }, [itemToDelete, deleteFunction]);

    const renderDeleteDialog = () => (
        <DeleteDialog
            open={openDialog}
            handleClose={handleDialogClose}
            handleDeleteConfirmed={handleDeleteConfirmed}
        />
    );

    return { handleDialogOpen, renderDeleteDialog };
};

export default useDeleteAction;
