import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './UserSettings.module.css'

type propsTypes = {
  img:string
  title: string
  active?: boolean
  onClick: ()=> void
}
const SideNavBtn = (props:propsTypes) => {
  return (
    <Button onClick={props.onClick} className={`${styles.sideNavBtnRoot} ${props.active && styles.sideNavBtnRootActive}`}>
      <Box className={styles.iconWrapper}>
        <img src={props.img} alt={props.title}/>
      </Box>
      <Box className={styles.textWrapper}>{props.title}</Box>
    </Button>
  )
}

export default SideNavBtn