import { Box, Button, FormGroup, FormLabel, InputBase, Typography, FormHelperText, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './Signup.module.css'
import signup from '../../assets/Images/signup.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



const Signup = () => {
  const [roles, setRoles] = useState()
  const [preview, setPreview] = useState(1)
  // useSelector<object | null>((state) => state.signup_reducer);
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: false,
    password: false,
    show_password: false,
    confirmPassword: false,
    name: false,
    phone: false,
    role: false,
    conflict: false
  });
  // console.log('error: ', error);
  const initStage = {
    name: '',
    username: '',
    role_id: '',
    email: "",
    confirmPassword: '',
    password: "",
    tnc: false
  }
  const [data, setData] = useState(initStage)
  console.log('data: ', data);
  const handleChange = () => {
    var element = document.getElementById("checkbox")
    var isChecked = element.checked;
    // console.log(isChecked)
    setData((pre) => ({ ...pre, tnc: isChecked }))
  }
  const handleNext = () => {
    if (error.confirmPassword || error.password || error.email
      || data.email.length === 0 || data.password.length === 0 || data.confirmPassword.length === 0) {
      return
    }
    else
      setPreview(2)
  }

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

  const HandleSignup = async () => {
    try {
      if (error.email || error.password) {
        return;
      }
      // await dispatch(signup(data));
      const role = roles?.find((item) => item._id === data.role_id)?.title
      var response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/signup`, {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        role_id: data.role_id,
        role
      })
      console.log('response: ', response);
      if (response?.data === true) {
        setData(initStage);
        navigate('/auth/login');
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setError(pre => ({ ...pre, conflict: true }))
      }
    }
  };

  useEffect(() => {
    (async () => {
      const role = await axios.get(`${process.env.REACT_APP_ACL_URL}`)
      console.log('role: ', role);
      setRoles(role.data)
    })()
    // console.log("status: ", status);
    return () => { }
  }, []);
  const numberInputOnWheelPreventChange = (e) => {
    e.target?.blur()
    e.stopPropagation()
    setTimeout(() => {
      e.target?.focus()
    }, 0)
  }

  return (
    <Box className={styles.root}>
      <Box className={styles.partition1}>
        <img src={signup} alt='' className={styles.loginImg} />
      </Box>
      {preview === 1 && <Box className={styles.partition2}>
        <Typography className={styles.title}> Create your Free Account</Typography>
        <FormGroup className={styles.inputWraper} >
          <FormLabel className={styles.inputlabel}>Your email</FormLabel>
          <InputBase type='email' className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`} value={data?.email} onChange={(e) => { check_email(e.target.value); setData((pre) => ({ ...pre, email: e.target.value })) }}></InputBase>
          {error.email && <FormHelperText className={styles.FormHelperText}> Invalid Email  </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Passowrd</FormLabel>
          <InputBase type='password' className={`${styles.inputBox} ${error.password ? styles.errorInput : ''}`} error={error.password} value={data?.password} onChange={(e) => { check_password(e.target.value); setData((pre) => ({ ...pre, password: e.target.value })) }}></InputBase>
          {error.password && <FormHelperText className={styles.FormHelperText}> Invalid Password (Minimum Length is 6, Alpha-Numeric is Required) </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Confirm Passowrd</FormLabel>
          <InputBase type='password' className={`${styles.inputBox} ${error.confirmPassword ? styles.errorInput : ''}`} value={data?.confirmPassword} onChange={(e) => {
            setData((pre) => ({ ...pre, confirmPassword: e.target.value }));
            if (e.target.value === data.password)
              setError(pre => ({ ...pre, confirmPassword: false }))
            else
              setError(pre => ({ ...pre, confirmPassword: true }))
          }}></InputBase>
          {error.confirmPassword && <FormHelperText className={styles.FormHelperText}> Password and Confirm Password did't match  </FormHelperText>}
        </FormGroup>
        <Box className={styles.tncWrap}>
          <InputBase type='checkbox' title='ckb' defaultChecked={data.tnc} className={styles.tncCheckBox} id='checkbox' onChange={handleChange} />
          <Typography className={styles.tncText} >I accept the <Link to={"#"}>Terms and Conditions</Link></Typography>
          <Typography className={`${styles.tncText} ${styles.loginRedirect}`}>Already user? <Link to='/auth/login'> Login here</Link></Typography>
        </Box>
        <Button disabled={(data.email.length === 0 || !data.tnc || data.password.length === 0 || data.confirmPassword.length === 0)} className={styles.signInBtn} onClick={handleNext}>{`Next`}</Button>
      </Box>}
      {preview === 2 && <Box className={styles.partition2}>
        <Typography className={styles.title}>Just Few More Details...</Typography>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Your Username</FormLabel>
          <InputBase onWheel={(e) => { numberInputOnWheelPreventChange(e) }} type='text' className={`${styles.inputBox} ${error.phone ? styles.errorInput : ''}`} value={data?.username} onChange={(e) => { setData((pre) => ({ ...pre, username: e.target.value })) }}></InputBase>
          {error.phone && <FormHelperText className={styles.FormHelperText}> Enter Username </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper} >
          <FormLabel className={styles.inputlabel}>Your Full Name</FormLabel>
          <InputBase className={`${styles.inputBox} ${error.name ? styles.errorInput : ''}`} value={data?.name} onChange={(e) => { setData((pre) => ({ ...pre, name: e.target.value })) }}></InputBase>
          {error.name && <FormHelperText className={styles.FormHelperText}> Enter Name </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Your Roll</FormLabel>
          <Select value={data.role_id || (roles !== undefined && roles[0]._id)} type='option' className={`${styles.inputBox} ${error.role ? styles.errorInput : ''}`} onChange={(e) => { setData((pre) => ({ ...pre, role_id: e.target.value })) }}>
            {
              roles?.map((item, index) => {
                return <MenuItem key={index} value={item._id} >{item.title}</MenuItem>
              })
            }
          </Select>
          {error.role && <FormHelperText className={styles.FormHelperText}> Enter Roll </FormHelperText>}
        </FormGroup>

        {error.conflict && <FormHelperText sx={{ textAlign: 'center', width: '80%', color: "red", fontSize: "13px" }}>User Already Exists with This Email Try <Link className={styles.loginLinkBtn} to={'/auth/login'}>login</Link></FormHelperText>}
        <Box className={styles.btnsWrap}>
          <Button className={`${styles.signInBtn} ${styles.prevBtn}`} onClick={() => { setPreview(1) }}> Previous</Button>
          <Button className={styles.signInBtn} onClick={HandleSignup} disabled={(data.username.length === 0 || data.name.length === 0 || data.role_id.length === 0)} > Sign up</Button>
        </Box>
      </Box>}
    </Box>
  )
}

export default Signup
