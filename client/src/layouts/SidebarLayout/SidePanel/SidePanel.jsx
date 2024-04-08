import { Box, Link } from '@mui/material'
import React from 'react'
import logo from '../../../assets/Images/logo.png'
import styles from './SidePanel.module.css'
import PanelButton from './PanelButton'
import DashboardPng from '../../../assets/Images/dashboard.png'
import OrderPng from '../../../assets/Images/order.png'
import CustomerPng from '../../../assets/Images/customer.png'
import SettingPng from '../../../assets/Images/setting.png'
import LogoutPng from '../../../assets/Images/logout.png'
import AllTicketsPng from '../../../assets/Images/alltickets.png'
import PanelAccordian from './PanelAccordian'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const SidePanel = ({ handleLogout }) => {
   const state = useSelector((state) => state.persistedReducer)
   const Navigate = useNavigate()
   return (
      <Box className={styles.root}>
         <Box className={styles.headLogo}>
            <img src={logo} alt="logo" className={styles.logo} /> &nbsp;
            Flight Ease
         </Box>
         <PanelButton id={1} title={'Dashboard'} image={DashboardPng} handleClick={() => { Navigate('dashboard') }} />
         {/* <PanelAccordian title='All Tickets' image={AllTicketsPng} id={1} /> */}
         {/* <PanelButton id={2} title={'Orders'} image={OrderPng} handleClick={() => { Navigate('Orders') }} /> */}
         {/* {state.user.role === 'Vendor' &&  <PanelButton id={2} title={'Products'} image={OrderPng} handleClick={() => { Navigate('products') }} />} */}
         {/* <PanelButton id={3} title={'Customers'} image={CustomerPng} handleClick={() => { Navigate('customers') }} /> */}
         <PanelButton id={4} title={'Settings'} image={SettingPng} handleClick={() => { Navigate('setting') }} />
         <PanelButton id={5} title={'Log out'} image={LogoutPng} handleClick={() => { handleLogout() }} />

      </Box>
   )
}

export default SidePanel