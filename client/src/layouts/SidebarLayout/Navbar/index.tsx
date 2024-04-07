import { Box, Icon, InputBase, Typography, Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import styles from './SidePanelNavbar.module.css'
import calenderSvg from '../../../assets/Images/Calendar.png'
import NotificationSvg from '../../../assets/Images/bell.png'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { RootState } from '../../../store/store'
import { fetchUserData } from '../../../store/User/User.Api'

interface propsType {
    handleClickAvatar: any
}

const SidePanelNavbar = (props: propsType) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.persistedReducer.user)
    const { handleClickAvatar } = props
    const getWeekDay = () => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const curr_date = new Date(Date.now())
        var date: string | number = curr_date.getDate()
        date = date === 1 ? "1st" : date === 2 ? "2nd" : date === 3 ? "3rd" : `${date}th`

        return `${weekday[curr_date.getDay()]}, ${date} ${months[curr_date.getMonth()]} `
    }
    useEffect(() => {
        if (!user.image && !user.phone_no)
            dispatch(fetchUserData('.'))
    }, [])
    return (
        <Box className={styles.root}>
            <Box className={styles.left}>
                <Box className={styles.searchBox}>
                    <Icon />
                    <InputBase
                        placeholder='Search...' className={styles.searchInput} />
                </Box>
            </Box>
            <Box className={styles.right}>

                <Box className={styles.dateBox}>
                    <img src={calenderSvg} alt='calender' /> &nbsp;
                    <Typography className={styles.dateText}>{getWeekDay()}</Typography>
                </Box>
                <Box className={styles.notificationBox}>
                    <img src={NotificationSvg} alt='calender' />
                </Box>
                <Box className={styles.profileBox}>
                    <Box className={styles.profileTextBox}>
                        <Typography className={styles.userName}>{user.name}</Typography>
                        <Typography className={styles.userTitle}>{user.role}</Typography>
                    </Box>
                    <Avatar className={styles.userAvatar} src={user.image} onClick={(event: any) => { handleClickAvatar(event) }} />
                </Box>
            </Box>
        </Box>
    )
}

export default SidePanelNavbar
