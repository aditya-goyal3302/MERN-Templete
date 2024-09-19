import { Box } from '@mui/material'
import React from 'react'
import styles from './SidePanel.module.css'
import PanelButton from './PanelButton'
import DashboardPng from '../../../assets/Images/dashboard.png'
import SettingPng from '../../../assets/Images/setting.png'
import LogoutPng from '../../../assets/Images/logout.png'
import Leave from '../../../assets/Svg/leaveSummary.svg'
import PanelAccordian from './PanelAccordian'
import { useLocation, useNavigate } from 'react-router-dom'
import leaveRequestImg from '../../../assets/Svg/accOT.svg'
import holidayImg from '../../../assets/Svg/accTWO.svg'
import attendenceImg from '../../../assets/Images/attendance.png'
import leaveBalanceImg from '../../../assets/Svg/leave.svg'
import PolicyImg from '../../../assets/Svg/policyM.svg'
import PeopleImg from '../../../assets/Svg/people.svg'
import AdminImg from '../../../assets/Svg/admin.svg'
import UserRole from '../../../assets/Svg/userRole.svg'

import { useAppSelector } from '../../../hooks'

const SidePanel = ({ handleLogout }: { handleLogout: Function }) => {
   const location = useLocation()
   const userRole = useAppSelector((state) => state?.persistedReducer?.user?.role_data?.title)
   // const leaveSummaryOptions = [
   //    { title: 'Leave Requests', image: leaveRequestImg, id: 11, redirect:"/leave-summary/leave-requests"},
   // ]   
   // const adminOptions = [
   //    { title: 'Admin Dashboard', image: DashboardPng, id: 21, redirect:"/admin/dashboard"},
   // ]
   const Navigate = useNavigate()
   return (
      <Box className={styles.root}>
         {/* <PanelButton selected={location.pathname==="/dashboard"} id={1} title={'Dashboard'} image={DashboardPng} handleClick={() => { Navigate('/dashboard') }} />
         <PanelButton selected={location.pathname==="/attendence"} id={2} title={'Attendance'} image={attendenceImg} handleClick={() => { Navigate('attendence') }} />
         <PanelButton selected={location.pathname==="/event"} id={2} title={'Event'} image={leaveBalanceImg} handleClick={() => { Navigate('/event') }} />
         {userRole ==="Admin" && <PanelAccordian title='Admin Management' image={AdminImg} id={0} options={adminOptions} />}
          <PanelAccordian title='Leave Summary' image={Leave} id={0} options={leaveSummaryOptions} />  */}
         {/* <PanelButton selected={location.pathname==="/warning"} id={2} title={'Warning'} image={DashboardPng} handleClick={() => { Navigate('warning') }} /> */}
         {/* <PanelButton selected={location.pathname==="/notification"} id={2} title={'Notification'} image={DashboardPng} handleClick={() => { Navigate('notification') }} /> */}
         <PanelButton selected={location.pathname === "/setting"} id={4} title={'Profile'} image={SettingPng} handleClick={() => { Navigate('setting') }} />
         <PanelButton selected={location.pathname === "/logout"} id={5} title={'Log out'} image={LogoutPng} handleClick={() => { handleLogout() }} />
      </Box>
   )
}

export default SidePanel