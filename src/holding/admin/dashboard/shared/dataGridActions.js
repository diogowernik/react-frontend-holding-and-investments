import { toast } from 'react-toastify';

export async function onRemoveAsset(id, removeAssetApi, updateStateCallback, token) {
    const isDeleted = await removeAssetApi(id, token);
    if (isDeleted) {
        updateStateCallback(prev => prev.filter(asset => asset.id !== id));
        toast.success("Asset deleted successfully");
    }
}

export async function processRowUpdate(newRow, updateAssetApi, token, fieldsToUpdate) {
    try {
        const flatData = {};
        Object.keys(fieldsToUpdate).forEach(field => {
            flatData[field] = newRow[field];
        });

        const updatedRow = await updateAssetApi(newRow.id, flatData, token);
        toast.success("Asset updated successfully");
        return { ...newRow, ...updatedRow };
    } catch (error) {
        toast.error("Failed to update asset");
        throw error;
    }
}
