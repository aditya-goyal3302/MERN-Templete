import { Box, Button, InputBase, Typography, Avatar, Menu, MenuItem } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from './UserLayout.module.css'
import openSvg from '../../assets/Svg/openSideBar.svg'
import LogoSvg from '../../assets/Svg/LogoUser.svg'
import locationPin from '../../assets/Svg/locationPin.svg'
import searchPng from '../../assets/Svg/searchLens.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {   } from '../../store/store'
import { logout } from '../../store/User/User.Slice'
import { fetchUserData } from '../../store/User/User.Api'

const UserLayout = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menuAnchorRef, setMenuAnchorRef] = useState(null)
    const open = Boolean(menuAnchorRef);
    const handleClickAvatar = (event) => {
        setMenuAnchorRef(event.currentTarget);
    };
    const handleCloseAvatar = () => {
        setMenuAnchorRef(null);
    };
    const handleLogout = () => {
        handleCloseAvatar();
        dispatch(logout())
    }
    const state = useSelector((state) => state.persistedReducer)
    useEffect(() => {
        if (!state.user.image && !state.user.phone_no)
            dispatch(fetchUserData('.'))
    }, [])
    return (
        <Box className={styles.root}>
            <Box className={styles.navbar}>
                <Box className={styles.nav1}>
                    <img src={openSvg} alt={'more'} />
                    <img src={LogoSvg} alt={'InstaCart'} />
                </Box>
                <Box className={styles.nav2}>
                    <InputBase
                        type={'text'}
                        placeholder='Search products, Store, and Recipies'
                        className={styles.searchInput}
                        endAdornment={<Box className={styles.serachBtn}>
                            <img src={searchPng} alt='search' />
                        </Box>}
                    />
                    <Box className={styles.location}>
                        <img src={locationPin} alt='location' className={styles.locationPng} />
                        <Typography className={styles.locationText}>110036</Typography>
                    </Box>
                </Box>
                <Box className={styles.nav3}>
                    {
                        state.isLogedin ?
                            (<Avatar src={state.user.image} className={`${styles.navAvatar} ${''}`} onClick={(event) => { handleClickAvatar(event) }} />)
                            :
                            (<Button className={`${styles.navBtn} ${styles.loginBtn}`} onClick={() => { navigate('/auth/login') }} >Log in</Button>)
                    }
                    {/* <Button className={`${styles.navBtn} ${styles.cartBtn}`} > <img src={cartPng} alt={'cart'} />0</Button> */}
                    <Menu
                        id="basic-menu"
                        anchorEl={menuAnchorRef}
                        open={open}
                        onClose={handleCloseAvatar}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={()=>{ navigate('/user/setting');handleCloseAvatar()}}>Profile</MenuItem>
                        <MenuItem onClick={()=>{ navigate('/user/setting');handleCloseAvatar()}}>My account</MenuItem>
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box className={styles.children}>
                {props.children || <Outlet />}
            </Box>
        </Box>
    )
}

export default UserLayout
