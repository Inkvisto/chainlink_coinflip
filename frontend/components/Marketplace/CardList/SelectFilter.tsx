import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectFilter({nftFilter, setNftFilter,setNfts}:any) {

  const handleChange = (event: SelectChangeEvent) => {
    setNftFilter(event.target.value as string)
    setNfts([])
  };

  return (
    <Box sx={{ maxWidth: 120, backgroundColor:'#fff', margin:'10px' }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nftFilter}
          label="Choose filter"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'listed'}>Listed</MenuItem>
          <MenuItem value={'owned'}>Owned</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}