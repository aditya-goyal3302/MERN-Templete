import { Box, Chip, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import styles from './CategoryBtn.module.css'

type propType = {
    image: string;
    title: string;
}

const CategoryBtn = (props:propType) => {

    return (
        <Chip 
            label = {
                <>
                    <img src={props.image} alt={props.title} className={styles.img} />
                    <Typography className={styles.title}>{props.title}</Typography>
                </>
            } 
            onClick={()=>{}} className={styles.root}
         />
    )
}

export default CategoryBtn
