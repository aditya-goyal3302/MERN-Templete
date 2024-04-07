import { Avatar, Box, Button, Divider, FormGroup, FormLabel, Grid, InputBase, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styles from './PersonalInfo.module.css'
import StateNames from '../../../assets/Json/State.json'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { RootState } from '../../../store/store'
import { fetchUserData, patchUserImage } from '../../../store/User/User.Api'
import Upload from '../../../components/imageUploader/Upload'

type data = {
    _id?: string,
    name?: string,
    role_id?: string,
    role?: string
    image?: string,
    email?: string,
    pincode?: number,
    address?: string,
    city?: string,
    country?: string,
    state?: string,
    fax?: number,
    phone_no?: String,
}
type e = any
type props = {
    setReqData: any
}
const PersonalInfo = (props: props) => {
    const dispatch = useAppDispatch();
    const init = useRef<true | false>(true);
    const [data, setData] = useState<data>({});
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string[]>([])
    const [imageStatus, setImageStatus] = useState<{ [key: string]: number }>({})
    // console.log('image: ', image);
    // console.log('data: ', data);
    const user = useAppSelector((state: RootState) => state.persistedReducer.user)
    useEffect(() => {
        props.setReqData(data)
    }, [data])
    useEffect(() => {
        if (image !== null) {
            (async () => {
                let url: string = await Upload(image, setImageStatus) as string
                console.log(image)
                const resp = await dispatch(patchUserImage(url))
                console.log('resp: ', resp);
                setImage(null)
            })()
        }
    }, [image])
    useEffect(() => {
        let status = Object.values(imageStatus)[0]
        if (status !== undefined && status === 100) {
            window.location.reload();
        }
        else return
    }, [imageStatus])
    useEffect(() => {
        if (init.current) {
            init.current = false;
            (async () => {
                await dispatch(fetchUserData('.'));
            })()
        }
        setData({ ...user })
    }, [user])
    const deleteImage = async () => {
        const resp = await dispatch(patchUserImage('.'))
        console.log('resp: ', resp);
        if(resp)
            window.location.reload();
    }
    return (
        <Box className={styles.root}>
            <Typography className={styles.title}>
                General Information
            </Typography>
            <Divider />
            <Box className={styles.profileWrap}>
                <Typography className={styles.ptofileTitle}>Profile Picture</Typography>
                <Box className={styles.profile}>
                    <Avatar className={styles.avatar} src={user.image} />
                    <input type='file' id='profilePicInput' onChange={(e: any) => { setImage(e?.target?.files[0]) }} hidden={true} aria-hidden={true} />
                    <Box className={styles.profileTextWrap}>
                        <Typography className={styles.name}>{user.name} </Typography>
                        <Typography className={styles.oth}>{user.role}</Typography>
                        <Typography className={styles.oth}>location</Typography>
                    </Box>
                    <Box className={styles.btns}>
                        <Button className={styles.btn1} onClick={() => document.getElementById('profilePicInput')?.click()}> Change</Button>
                        <Button className={styles.btn2} onClick={() => deleteImage()}> Delete</Button>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.form}>
                <Grid container columns={12} columnSpacing={4} >
                    <Grid item xs={6}>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Phone Number</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, phone_no: e.target.value })) }} value={data?.phone_no} placeholder='Your Phone number' type='number' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Pincode / Zip-code</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, pincode: e.target.value })) }} value={data?.pincode} placeholder='Your Pincode / zip-code' type='number' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Address</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, address: e.target.value })) }} value={data?.address} placeholder='Your Address' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>City</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, city: e.target.value })) }} value={data?.city} placeholder='Your City' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>


                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Email address</FormLabel>
                                <InputBase disabled={true} onChange={(e: e) => { setData((pre: data) => ({ ...pre, email: e.target.value })) }} value={data?.email} placeholder='Your Email Address' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Fax</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, fax: e.target.value })) }} value={data?.fax} placeholder='Your Fax' type='number' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Country</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, country: e.target.value })) }} value={data?.country} placeholder='Your Country' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>State</FormLabel>
                                <Select onChange={(e: e) => { setData((pre: data) => ({ ...pre, state: e.target.value })) }} value={user?.state !== '' ? user.state : StateNames.states[0].name} placeholder='Your State' className={`${styles.inputBox}`} >
                                    {
                                        StateNames.states.map((item, index) => {
                                            return <MenuItem key={index} value={item.name} >{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default PersonalInfo
