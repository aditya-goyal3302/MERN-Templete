import React, { ReactNode, useState } from 'react'
import { Box, Menu, MenuItem } from '@mui/material'
import { Outlet } from 'react-router';
import SidePanel from './SidePanel/SidePanel';
import SidePanelNavbar from './Navbar';
import styles from './SidebarLayout.module.css'
import { useAppDispatch } from '../../hooks';
import { logout } from '../../store/User/User.Slice';
interface LayoutProps {
  children?: ReactNode;
}

const SidebarLayout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch()
  const [menuAnchorRef, setMenuAnchorRef] = useState<HTMLElement | null>(null)
  const open = Boolean(menuAnchorRef);
  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorRef(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setMenuAnchorRef(null);
  };
  const handleLogout = () => {
    handleCloseAvatar();
    dispatch(logout())
  }
  return (
    <Box className={styles.root} sx={{}}>
      <Box className={styles.sidebar}>
        <SidePanel handleLogout={handleLogout}/>
      </Box>
      <Box className={styles.content}>
        <SidePanelNavbar handleClickAvatar={handleClickAvatar} />
        <Menu
          id="basic-menu"
          anchorEl={menuAnchorRef}
          open={open}
          onClose={handleCloseAvatar}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseAvatar}>Profile</MenuItem>
          <MenuItem onClick={handleCloseAvatar}>My account</MenuItem>
          <MenuItem onClick={handleLogout} >Logout</MenuItem>
        </Menu>
        {children || <Outlet />}
      </Box>
    </Box>
  )
}

export default SidebarLayout