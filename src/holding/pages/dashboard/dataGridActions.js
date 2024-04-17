import { toast } from 'react-toastify';

export async function onRemoveAsset(id, removeAssetApi, updateStateCallback, token) {
    const isDeleted = await removeAssetApi(id, token);
    if (isDeleted) {
        updateStateCallback(prev => prev.filter(asset => asset.id !== id));
        toast.success("Asset deleted successfully");
    }
}

export async function processRowUpdate(newRow, updateAssetApi, token) {
    try {
        // Filtrar apenas os dados que queremos atualizar
        const flatData = {
            shares_amount: newRow.shares_amount,
            share_average_price_brl: newRow.share_average_price_brl,
            share_average_price_usd: newRow.share_average_price_usd
        };

        const updatedRow = await updateAssetApi(newRow.id, flatData, token);
        toast.success("Asset updated successfully");
        return { ...newRow, ...updatedRow };
    } catch (error) {
        toast.error("Failed to update asset");
        throw error;  // This will prevent the DataGrid from committing the update
    }
}
