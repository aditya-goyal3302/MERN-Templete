import { Box, Button, FormGroup, FormLabel, InputBase, Typography, FormHelperText, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './Signup.module.css'
import signup from '../../assets/Images/signup.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { signupUserData } from '../../features/user/user.action'
import { detectBrowser } from '../../libs/commonFxn';
import { useNotification } from '../../hooks/useNotification';


type Data = {
  name: string
  last_name: string
  email: string
  password: string
  confirmPassword: string,
  tnc: true | false
  username: string
}

const Signup: React.FC = () => {
  const dispatch = useAppDispatch()
  const showNotification = useNotification();
  const [preview, setPreview] = useState<Number>(1)
  const navigate = useNavigate();
  const initError = {
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    last_name: false,
    username: false,
    tnc: false,
    conflict: false,
    badRequest: "",
    required: {
      email: false,
      password: false,
      confirmPassword: false,
      name: false,
      last_name: false,
      username: false,
    }
  };

  // const initError = { email: false, password: false, show_password: false, confirmPassword: false, name: false, role: false, conflict: false, username: false, last_name: false, badRequest: "" }
  const [error, setError] = useState(initError);
  const initStage = { name: '', last_name: '', email: "", confirmPassword: '', password: "", username: "", tnc: false }
  const [data, setData] = useState<Data>(initStage)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const browser = detectBrowser();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = () => {
    var element = document.getElementById("checkbox") as HTMLInputElement;
    var isChecked = element.checked;
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

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password: string) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);

  };
  const validateName = (name: string) => {
    return /^[A-Za-z]{1,50}$/.test(name);
  };

  // function check_name(data: string) {
  //   if (data === "" || !validateName(data))
  //     setError((pre) => ({ ...pre, name: true }));
  //   else setError((pre) => ({ ...pre, name: false }));
  // }

  // function check_lastName(data: string) {
  //   if (data === "" || !validateName(data))
  //     setError((pre) => ({ ...pre, last_name: true }));
  //   else setError((pre) => ({ ...pre, last_name: false }));
  // }

  // function check_email(data: string) {
  //   if (data === "" || !validateEmail(data))
  //     setError((pre) => ({ ...pre, email: true }));
  //   else setError((pre) => ({ ...pre, email: false }));
  // }

  // function check_password(data: string) {
  //   if (data === "" || !validatePassword(data) || data.length < 6)
  //     setError((pre) => ({ ...pre, password: true }));
  //   else setError((pre) => ({ ...pre, password: false }));
  // }

  function check_name(data: string) {
    if (data === "" || !validateName(data)) {
      setError(pre => ({ ...pre, name: true, required: { ...pre.required, name: true } }));
    } else {
      setError(pre => ({ ...pre, name: false, required: { ...pre.required, name: false } }));
    }
  }

  function check_lastName(data: string) {
    if (data === "" || !validateName(data)) {
      setError(pre => ({ ...pre, last_name: true, required: { ...pre.required, last_name: true } }));
    } else {
      setError(pre => ({ ...pre, last_name: false, required: { ...pre.required, last_name: false } }));
    }
  }

  function check_email(data: string) {
    if (data === "" || !validateEmail(data)) {
      setError(pre => ({ ...pre, email: true, required: { ...pre.required, email: true } }));
    } else {
      setError(pre => ({ ...pre, email: false, required: { ...pre.required, email: false } }));
    }
  }

  function check_password(data: string) {
    if (data === "" || !validatePassword(data) || data.length < 6) {
      setError(pre => ({ ...pre, password: true, required: { ...pre.required, password: true } }));
    } else {
      setError(pre => ({ ...pre, password: false, required: { ...pre.required, password: false } }));
    }
  }
  function check_username(data: string) {
    if (data === "" || data.length < 6) {
      setError(pre => ({
        ...pre,
        username: true,
        required: { ...pre.required, username: true }
      }));
    } else {
      setError(pre => ({
        ...pre,
        username: false,
        required: { ...pre.required, username: false }
      }));
    }
  }


  const HandleSignup = async () => {
    try {
      if (error.email || error.password) {
        return;
      }
      setError(initError);

      var response = await dispatch(signupUserData({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        department: "IT",
        username: data.username
      }));
      if (response.type === 'signup user/rejected')
        throw response
      if (response.payload) {
        showNotification("Registered successfully", "success");
        setData(initStage);
        navigate('/auth/login');
      }
    } catch (error: any) {
      console.log('error: ', error);
      if (error.payload?.response?.status === 409) {
        showNotification(error.payload?.response?.data, "error");
        console.log('error.payload?.response?.data: ', error.payload?.response?.data);
        setError(pre => ({ ...pre, conflict: true }))
      }
      if (error.payload?.response?.status === 400) {
        showNotification(error.payload?.response?.data, "error");
        setError(pre => ({ ...pre, badRequest: error.payload?.response?.data }))
      }
    }
  };


  return (
    <Box className={styles.root}>
      <Box className={styles.partition1}>
        <img src={signup} alt='' className={styles.loginImg} />
      </Box>
      {preview === 1 && <Box className={styles.partition2}>
        <Typography className={styles.title}> Sign Up</Typography>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Email*</FormLabel>
          <InputBase
            type='email'
            className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`}
            value={data?.email}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault(); // Prevent the space key from being entered
              }
            }}
            onChange={(e) => {
              const value = e.target.value.replace(/\s+/g, ''); // This will still ensure no spaces are present if entered through other means
              check_email(value);
              setData((pre) => ({ ...pre, email: value }));
            }}
            inputProps={{
              maxLength: 50, // Limit the maximum length of the input
              title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.', // Tooltip for input rules
            }}
          />
          {/* {error.email && <FormHelperText className={styles.FormHelperText}>Invalid Email</FormHelperText>} */}
          {error.email && !data.email && <FormHelperText className={styles.FormHelperText}>Email is required</FormHelperText>}
          {error.email && data.email && <FormHelperText className={styles.FormHelperText}>Invalid Email</FormHelperText>}
        </FormGroup>

        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Password*</FormLabel>
          <InputBase
            type={showPassword ? 'text' : 'password'}
            className={`${styles.inputBox} ${error.password ? styles.errorInput : ''}`}
            error={error.password}
            value={data?.password}
            // onChange={(e) => { check_password(e.target.value); setData((pre) => ({ ...pre, password: e.target.value })) }}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, '');
              check_password(value);
              setData((pre) => ({ ...pre, password: value }));
            }}
            inputProps={{
              maxLength: 50, // Limit the maximum length of the input
              title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.', // Tooltip for input rules
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {browser === 'Microsoft Edge' ? <Visibility sx={{ display: 'none', cursor: 'none', }} /> : showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error.password && !data.password && <FormHelperText className={styles.FormHelperText}>Password is required</FormHelperText>}
          {error.password && data.password && <FormHelperText className={styles.FormHelperText}>Password must be 6+ characters with letters, numbers, and symbols. </FormHelperText>}
        </FormGroup>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Confirm Password*</FormLabel>
          <InputBase
            type={showConfirmPassword ? 'text' : 'password'}
            className={`${styles.inputBox} ${error.confirmPassword ? styles.errorInput : ''}`}
            value={data?.confirmPassword}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, '');
              check_password(value);
              setData((pre) => ({ ...pre, confirmPassword: value }));
              if (e.target.value === data.password)
                setError(pre => ({ ...pre, confirmPassword: false }))
              else
                setError(pre => ({ ...pre, confirmPassword: true }))
            }}
            inputProps={{
              maxLength: 50, // Limit the maximum length of the input
              title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.', // Tooltip for input rules
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPasswordVisibility} edge="end">
                  {browser === 'Microsoft Edge' ? "" : showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error.confirmPassword && !data.confirmPassword && <FormHelperText className={styles.FormHelperText}>Confirm Password is required</FormHelperText>}
          {error.confirmPassword && data.confirmPassword && <FormHelperText className={styles.FormHelperText}>Passwords do not match</FormHelperText>}        </FormGroup>

        <Box className={styles.tncWrap}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.tnc} // Bind the checkbox to the state
                onChange={handleChange}
                // className={styles.tncCheckBox}
                id="checkbox"
                sx={{ padding: "0", paddingLeft: "9px" }}

              />
            }
            label={<Typography className={styles.tncText}>I accept the <Link to={"#"}>Terms and Conditions</Link></Typography>}
          />
          <Typography className={`${styles.tncText} ${styles.loginRedirect}`}>
            Already user? <Link to='/auth/login'> Sign in here</Link>
          </Typography>
        </Box>

        <Button disabled={(data.email.length === 0 || !data.tnc || data.password.length === 0 || data.confirmPassword.length === 0)} className={styles.signInBtn} onClick={handleNext}>{`Next`}</Button>
      </Box>}
      {preview === 2 && <Box className={styles.partition2}>
        <Typography className={styles.title}>Just Few More Details...</Typography>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>First Name*</FormLabel>
          <InputBase
            className={`${styles.inputBox} ${error.name ? styles.errorInput : ''}`}
            value={data?.name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z]*$/.test(value)) {
                check_name(value);
                setData((pre) => ({ ...pre, name: value }));
              }
            }}
            inputProps={{
              maxLength: 50,
              title: 'Only alphabetic characters are allowed',
            }}
          />
          {error.name && !data.name && <FormHelperText className={styles.FormHelperText}>Name is required</FormHelperText>}
          {error.name && data.name && <FormHelperText className={styles.FormHelperText}>Invalid Name</FormHelperText>}
        </FormGroup>

        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Last Name*</FormLabel>
          <InputBase
            className={`${styles.inputBox} ${error.last_name ? styles.errorInput : ''}`}
            value={data?.last_name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z]*$/.test(value)) {
                check_lastName(value);
                setData((pre) => ({ ...pre, last_name: value }));
              }
            }}
            inputProps={{
              maxLength: 50, // Limit the maximum length of the input
              title: 'Only alphabetic characters are allowed', // Tooltip when input is invalid
            }}
          />
          {error.last_name && !data.last_name && <FormHelperText className={styles.FormHelperText}>Last Name is required</FormHelperText>}
          {error.last_name && data.last_name && <FormHelperText className={styles.FormHelperText}>Invalid Last Name</FormHelperText>}        </FormGroup>


        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Username*</FormLabel>
          <InputBase
            className={`${styles.inputBox} ${error.username ? styles.errorInput : ''}`}
            value={data?.username}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, ''); // Allow only alphanumeric and specific special characters
              check_username(value);
              setData((pre) => ({ ...pre, username: value }));
            }}
            inputProps={{
              maxLength: 50,
              title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.',
            }}
          />
          {error.username && !data.username && <FormHelperText className={styles.FormHelperText}>Username is required</FormHelperText>}
          {error.username && data.username && <FormHelperText className={styles.FormHelperText}>Invalid Username</FormHelperText>}
        </FormGroup>
        <Box className={styles.btnsWrap}>
          <Button className={`${styles.signInBtn} ${styles.prevBtn}`} onClick={() => { setPreview(1) }}> Previous</Button>
          <Button className={styles.signInBtn} onClick={HandleSignup} disabled={(data.name.length === 0 || data.last_name.length === 0 || !(data.username.length >= 6))} > Sign up</Button>
        </Box>
      </Box>}
    </Box>
  )
}

export default Signup

