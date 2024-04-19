// RadarCategoriesColumns.js - Mantenha este comentario

export function getColumns() {
  return [
      { field: 'radar_category_id', headerName: 'ID', width: 70, editable: false },
      { field: 'category', headerName: 'Categoria', width: 180, editable: false },
      {
          field: 'ideal_category_percentage',
          headerName: '% ideal',
          width: 130,
          editable: true,
          type: 'number',
          renderCell: (params) => `${(params.value * 100)}%`,
      }
  ];
}
