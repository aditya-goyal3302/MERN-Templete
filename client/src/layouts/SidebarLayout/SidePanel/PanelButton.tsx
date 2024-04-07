import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './SidePanel.module.css'

interface props {
    id: Number
    title: string
    image?: string
    handleClick: () => void ;
}

const PanelButton = (props: props) => {
    const { title, image, handleClick } = props
    return (
        <Box className={styles.items} onClick={handleClick}>
            <img src={image} alt={title} className={styles.itemImg} />
            &nbsp;&nbsp;<Typography>
                {title}
            </Typography>
        </Box>
    )
}

export default PanelButton