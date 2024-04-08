import React, { ReactNode, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './BaseLayout.module.css'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import logo from '../../assets/Images/logo.png'

const BaseLayout = ({ children }) => {
  const navigate = useNavigate()
  const [value,setValue] = useState('1')

  const handleChange = (event,val) =>{
    setValue(val)
  }
  return (
    <Box
      className={styles.BaseLayoutRoot}
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      <Box className={styles.navbar}>
        <Box className={styles.navItems}>
          <img src={logo} alt='' className={styles.logo}/>
          <Tabs
            className={styles.navbarTabs}
            value={value}
            onChange={handleChange}
            aria-label="navbar"
          >
            <Tab value={'1'} label={"Dashboard"} className={styles.tabBtn}/>
            <Tab value={'2'} label={"Team"} className={styles.tabBtn}/>
            <Tab value={'3'} label={"Projects"} className={styles.tabBtn}/>
            <Tab value={'4'} label={"Celendar"} className={styles.tabBtn}/>
          </Tabs>
        </Box>
        <Box className={styles.navbtns}>
          <Typography className={styles.navbtns}  onClick={() => { navigate('/auth/login')}}><LoginOutlinedIcon/>&nbsp;Login/Register</Typography>
        </Box>
      </Box>
      <Box className={styles.children}>

        {children || <Outlet />}
      </Box>
    </Box>
  );
};


export default BaseLayout;
