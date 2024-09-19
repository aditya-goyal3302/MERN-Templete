import { Avatar, Box, Button, FormGroup, FormLabel, Grid, InputBase, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import StateNames from '../../../assets/Json/State.json';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store/store';
import styles from './PersonalInfo.module.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

type data = {
    _id?: string,
    name?: string,
    last_name?: string,
    role_id?: string,
    role?: string,
    image?: string,
    email?: string,
    date_of_birth?: string,
    address?: string,
    city?: string,
    country?: string,
    state?: string,
    fax?: number,
    phone?: string,
    street?: string,
    pincode?: string,
};

type e = any;
type props = {
    setReqData: any;
};

const PersonalInfo = (props: props) => {
    const dispatch = useAppDispatch();
    const init = useRef<true | false>(true);
    const [data, setData] = useState<data>({});

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [imageStatus, setImageStatus] = useState<{ [key: string]: number }>({});
    const user = useAppSelector((state: RootState) => state.persistedReducer.user);
    console.log('user: ', user);

    useEffect(() => {
        props.setReqData(data);
    }, [data]);

    const [statenames, setStatenames] = useState<{ label: string, value: string }[]>([]);
    useEffect(() => {
        let statedata = StateNames.states?.map((item) => ({ label: item.name, value: item.name }));
        setStatenames(statedata);
    }, [StateNames.states]);

    useEffect(() => {
        if (init.current) {
            init.current = false;
            (async () => {
                // await dispatch(fetchUserData('.'));
            })();
        }
        setData({ ...user, pincode: user?.pincode?.toString() });
    }, [user]);

    const deleteImage = async () => {
        // const resp = await dispatch(patchUserImage('.'))
        // if (resp)
        //     window.location.reload();
    };

    return (
        <Box className={styles.root}>
            {/* <Typography className={styles.title}>
                General Information
            </Typography>
            <Divider /> */}
            <Box className={styles.profileWrap}>
                <Typography className={styles.ptofileTitle}>Profile Picture</Typography>
                <Box className={styles.profile}>
                    <Avatar className={styles.avatar} src={""} />
                    <input type='file' id='profilePicInput' onChange={(e: any) => { setImage(e?.target?.files[0]) }} hidden={true} aria-hidden={true} />
                    <Box className={styles.profileTextWrap}>
                        <Typography className={styles.name}>{user.name} </Typography>
                        <Typography className={styles.oth}>{user.email}</Typography>
                        <Typography className={styles.oth}>Role - {user?.User_role?.role_type}</Typography>
                        <Typography className={styles.oth}>Username - {user.username}</Typography>
                        <Typography className={styles.oth}>Department - {user.department}</Typography>
                        <Typography className={styles.oth}>{user?.username}</Typography>
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
                                <FormLabel className={styles.formLabel}>First Name</FormLabel>
                                <InputBase disabled onChange={(e: e) => { setData((pre: data) => ({ ...pre, name: e.target.value })) }} value={data?.name} placeholder='First Name' type='text' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Last Name</FormLabel>
                                <InputBase disabled onChange={(e: e) => { setData((pre: data) => ({ ...pre, last_name: e.target.value })) }} value={data?.last_name} placeholder='Last Name' type='text' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Phone Number</FormLabel>
                                <InputBase
                                    inputProps={{ maxLength: 10, minLength: 10 }}
                                    onChange={(e: e) => {
                                        const value = e.target.value;
                                        if (value.length <= 10) {
                                            setData((pre: data) => ({ ...pre, phone: value }));
                                        }
                                    }}
                                    value={data?.phone}
                                    placeholder='Phone no'
                                    type='number'
                                    className={`${styles.inputBox}`}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Pincode / Zip-code</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, pincode: e.target.value })) }} value={data?.pincode} placeholder='Pincode / zip-code' type='number' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Date of Birth</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} sx={{ mt: '-6px', pl: 0 }}>
                                        <DatePicker className={`${styles.inputBoxDate}`} sx={{ width: '100%', p: 0 }}
                                            value={data.date_of_birth ? dayjs(data.date_of_birth) : null} // Convert date_of_birth to Dayjs object
                                            onChange={(newValue: Dayjs | null) => {
                                                setData((pre: data) => ({
                                                    ...pre,
                                                    date_of_birth: newValue ? newValue.toISOString() : '',
                                                }));
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormGroup>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Country</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, country: e.target.value })) }} value={data?.country} placeholder='Country' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>State</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, state: e.target.value })) }} value={data?.state} placeholder='State' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>City</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, city: e.target.value })) }} value={data?.city} placeholder='City' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Street</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, street: e.target.value })) }} value={data?.street} placeholder='Street' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PersonalInfo;

