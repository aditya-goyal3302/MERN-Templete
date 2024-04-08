import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import loginPng from '../../assets/Images/login.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../../store/User/User.Api'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/User/User.Slice'

const Login = () => {
  // console.log(process.env.REACT_APP_AUTH_URL);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initStage = {
    email: "",
    password: '',
    rememberMe: false
  }
  const state = useSelector((state) => state.persistedReducer)
  const [data, setData] = useState(initStage)
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    (async () => {
      if (state.error)
        await dispatch(reset());
    })()
    if (state.error)
      setError({
        email: true,
        password: true,
      })
  }, [state.error])


  const handleChange = () => {
    var element = document.getElementById("checkbox") 
    var isChecked = element?.checked;
    // console.log(isChecked)
    setData((pre) => ({ ...pre, rememberMe: isChecked }))
  }

  const HandleLogin = async () => {
    if (error.email || error.password) {
      return;
    }
    dispatch(LoginApi({
      email: data.email,
      password: data.password
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

  };

  function check_email(data) {
    if (data === "" || !validateEmail(data))
      setError((pre) => ({ ...pre, email: true }));
    else setError((pre) => ({ ...pre, email: false }));
  }

  function check_password(data) {
    if (data === "" || !validatePassword(data) || data.length < 6)
      setError((pre) => ({ ...pre, password: true }));
    else setError((pre) => ({ ...pre, password: false }));
  }


  return (
    <Box className={styles.root}>
      <Box className={styles.partition1}>
        <img src={loginPng} alt='' className={styles.loginImg} />
      </Box>
      <Box className={styles.partition2}>
        <Typography className={styles.title}> Sign In</Typography>
        <FormGroup className={styles.inputWraper} >
          <FormLabel className={styles.inputlabel}>Your email</FormLabel>
          <InputBase type='email' className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`} value={data?.email} onChange={(e) => { check_email(e.target.value); setData((pre) => ({ ...pre, email: e.target.value })) }}></InputBase>
          {error.email && <FormHelperText className={styles.FormHelperText}> Invalid Email  </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Passowrd</FormLabel>
          <InputBase type='password' className={`${styles.inputBox} ${error.password ? styles.errorInput : ''}`} error={error.password} value={data?.password} onChange={(e) => { check_password(e.target.value); setData((pre) => ({ ...pre, password: e.target.value })) }}></InputBase>
          {error.password && <FormHelperText className={styles.FormHelperText}> Invalid Password</FormHelperText>}
        </FormGroup>
        <Box className={styles.rememberMeWrap}>
          {/* <label htmlFor="ckb" ></label> */}
          <input title='ckb' type='checkbox' defaultChecked={data.rememberMe} className={styles.rememberMeCheckBox} id='checkbox' onChange={handleChange} />
          <Typography className={styles.rememberMeText}> Remember Me</Typography>
          <Typography className={`${styles.rememberMeText} ${styles.loginRedirect}`}>New User? <Link to='/auth/signup'> Signup here</Link></Typography>
        </Box>

        <Button className={styles.signInBtn} onClick={HandleLogin} disabled={(data.email.length === 0 || data.password.length === 0 || state.isLoading === true || (state.token !== ''))}> Sign In</Button>
      </Box>
    </Box>
  )
}

export default Login
