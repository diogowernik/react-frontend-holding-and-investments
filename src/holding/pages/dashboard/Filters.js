import React from 'react';
import { TextField } from '@mui/material';

function Filters({ filter, setFilter }) {
  return (
    <>
      <TextField
        label="Filter by Category"
        variant="outlined"
        value={filter.category}
        onChange={e => setFilter(prev => ({ ...prev, category: e.target.value }))}
        style={{ margin: 8 }}
      />
      <TextField
        label="Filter by Broker"
        variant="outlined"
        value={filter.broker}
        onChange={e => setFilter(prev => ({ ...prev, broker: e.target.value }))}
        style={{ margin: 8 }}
      />
    </>
  );
}

export default Filters;
