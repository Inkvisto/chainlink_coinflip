import { Popover, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

function getPriceText (nft:any) {
  const { sold, canceled } = nft
  if (sold) {
    return 'Sold for'
  }

  if (canceled) {
    return 'Offered for'
  }

  return 'Price'
}

export default function NFTPrice ({ nft }:any) {
  const priceText = getPriceText(nft)
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event:any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <div style={{ textAlign: 'center' }}>

      <Typography
      variant="h6"
      color="text.secondary"
      >
        {priceText}
      </Typography>
      <Typography
      gutterBottom
      variant="h6"
      color="text.secondary"
      sx={{display:'flex', alignItems:'center'}}
      >
        <span style={{ display: 'inline-block', transform: 'translateY(3px)' }}>
          <Image
            alt='token image'
            src='/logo.svg'
            width={50}
            height={50}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
        </span>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none'
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Token</Typography>
        </Popover>
        {' '}{nft.price.toString().slice(0,4)}
      </Typography>
    </div>
  )
}