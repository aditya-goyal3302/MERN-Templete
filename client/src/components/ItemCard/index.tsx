import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import styles from './ItemCard.module.css'
import AddIcon from '@mui/icons-material/Add';

type propData = {
  image: string
  title: string
  qty: string
  price: string
}

const ItemCard = (props:propData) => {
  const { image, title, qty, price } = props
  return (
    <Box className={styles.root}>
          <IconButton className={styles.addBtn}>
            <AddIcon />
          </IconButton>
      <Box className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </Box>
      <Box className={styles.content}>
        <Typography className={styles.price}>{`₹${price}`}</Typography>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.qty}>{qty}</Typography>
      </Box>

    </Box>
  )
}

export default ItemCard
