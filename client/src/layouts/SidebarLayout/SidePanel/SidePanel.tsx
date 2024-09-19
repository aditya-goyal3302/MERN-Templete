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
   const [selected, setSelected] = React.useState<number>(1)
   const location = useLocation()
   const userRole = useAppSelector((state) => state?.persistedReducer?.user?.User_role?.role_type)
   const leaveSummaryOptions = [
      { title: 'Leave Requests', image: leaveRequestImg, id: 11, redirect:"/leave-summary/leave-requests"},
      { title: 'Leave Balances', image: leaveBalanceImg, id: 13, redirect:"/leave-summary/leave-balance" },
      { title: 'Leave Approve', image: leaveBalanceImg, id: 13, redirect:"/leave-summary/leave-approve" },
      { title: 'Applied Policies', image: PolicyImg, id: 14, redirect:"/leave-summary/applied-policy" },
   ]   
   const adminOptions = [
      { title: 'Admin Dashboard', image: DashboardPng, id: 21, redirect:"/admin/dashboard"},
      { title: 'Policy Management', image: PolicyImg, id: 22, redirect:"/admin/policy-management"},
      { title: 'Leave Management', image: leaveBalanceImg, id: 23, redirect:"/admin/leave-management" },
      { title: 'Employee Management', image: PeopleImg, id: 24, redirect:"/admin/employee-management" },
      { title: 'Role Management', image: UserRole, id: 25, redirect:"/admin/role-management" },
      { title: 'Attendance Management', image: attendenceImg, id: 26, redirect:"/admin/attendence-management" },
      { title: 'Event Management', image: holidayImg, id: 12, redirect:"/admin/event-management" },
   ]
   const Navigate = useNavigate()
   return (
      <Box className={styles.root}>
         <PanelButton selected={location.pathname==="/dashboard"} id={1} title={'Dashboard'} image={DashboardPng} handleClick={() => {setSelected(1); Navigate('/dashboard') }} />
         <PanelButton selected={location.pathname==="/attendence"} id={2} title={'Attendance'} image={attendenceImg} handleClick={() => { Navigate('attendence') }} />
         <PanelButton selected={location.pathname==="/event"} id={2} title={'Event'} image={leaveBalanceImg} handleClick={() => {setSelected(7); Navigate('/event') }} />
         {userRole ==="Admin" && <PanelAccordian title='Admin Management' image={AdminImg} id={0} options={adminOptions} />}
          <PanelAccordian title='Leave Summary' image={Leave} id={0} options={leaveSummaryOptions} /> 
         {/* <PanelButton selected={location.pathname==="/warning"} id={2} title={'Warning'} image={DashboardPng} handleClick={() => {setSelected(6); Navigate('warning') }} /> */}
         <PanelButton selected={location.pathname==="/notification"} id={2} title={'Notification'} image={DashboardPng} handleClick={() => {setSelected(8); Navigate('notification') }} />
         <PanelButton selected={location.pathname==="/setting"} id={4} title={'Profile'} image={SettingPng} handleClick={() => {setSelected(4); Navigate('setting') }} />
         <PanelButton selected={location.pathname==="/logout"} id={5} title={'Log out'} image={LogoutPng} handleClick={() => {setSelected(5); handleLogout() }} />
      </Box>
   )
}

export default SidePanel