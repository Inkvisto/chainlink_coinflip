import { TextField } from '@mui/material'

export default function PriceTextField ({ listingFee, onChange, disabled, error } : any) {
  return (
    <TextField
      id="price-input"
      label="Price"
      name="price"
      size="small"
      fullWidth
      required={!disabled}
      margin="dense"
      type="number"
      inputProps={{ step: 'any' }}
      disabled={disabled}
      onChange={onChange}
      error={error}
      sx={{ margin: '0', width:'120px' }}
    />
  )
}