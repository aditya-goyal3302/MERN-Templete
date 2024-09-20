import {
  Box,
  Divider,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store/store";
import styles from "./Security.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { detectBrowser } from "../../../libs/commonFxn";

type data = {
  old_password?: string;
  new_password?: string;
};

type props = {
  setReqData?: any;
};

const SecutitySetting = (props: props) => {
  const [data, setData] = useState<data>({});
  const user = useAppSelector((state: RootState) => state.persistedReducer?.user);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
  });
  const [error, setError] = useState({
    old_password: false,
    new_password: false,
  });
  const browser = detectBrowser();
  const handleClickShowPassword = (key: "old" | "new") => {
    setShowPassword(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    props.setReqData(data);
  }, [data]);

  const validatePassword = (password: string) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
  };

  function check_password(data: string, key: "old" | "new") {
    const isValid = data !== "" && validatePassword(data) && data.length >= 6;
    setError(pre => ({ ...pre, [`${key}_password`]: !isValid }));
  }
  return (
    <Box className={styles.root}>
      <Typography className={styles.title}>Security Setting</Typography>
      <Divider />
      <Box className={styles.form}>
        <Grid container columns={6} columnSpacing={4}>
          <Grid item xs={12} className={styles.inputWraper}>
            <FormGroup className={styles.inputWraper}>
              <FormLabel className={styles.inputlabel}>Old Password*</FormLabel>
              <Box className={styles.passwordWrapper}>
                <InputBase
                  type={showPassword.old ? "text" : "password"}
                  className={`${styles.inputBox} ${error.old_password ? styles.errorInput : ""}`}
                  error={error.old_password}
                  value={data?.old_password}
                  onChange={e => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, "");
                    check_password(value, "old");
                    setData(pre => ({ ...pre, old_password: value }));
                  }}
                  inputProps={{
                    maxLength: 50,
                    title: "No spaces allowed. Only letters, numbers, and special characters are allowed.", // Tooltip for input rules
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleClickShowPassword("old")} edge="end">
                        {browser === "Microsoft Edge" ? (
                          <Visibility sx={{ display: "none", cursor: "none" }} />
                        ) : showPassword.new ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                ></InputBase>
              </Box>
              {error.old_password ? (
                <FormHelperText className={styles.FormHelperText}>
                  {data.new_password === "" ? "Password is required" : "Invalid Password"}
                </FormHelperText>
              ) : null}
            </FormGroup>
          </Grid>

          <Grid item xs={12} className={styles.inputWraper}>
            <FormGroup className={styles.inputWraper}>
              <FormLabel className={styles.inputlabel}>New Password*</FormLabel>
              <Box className={styles.passwordWrapper}>
                <InputBase
                  type={showPassword.new ? "text" : "password"}
                  className={`${styles.inputBox} ${error.new_password ? styles.errorInput : ""}`}
                  error={error.new_password}
                  value={data?.new_password}
                  onChange={e => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, "");
                    check_password(value, "new");
                    setData(pre => ({ ...pre, new_password: value }));
                  }}
                  inputProps={{
                    maxLength: 50,
                    title: "No spaces allowed. Only letters, numbers, and special characters are allowed.", // Tooltip for input rules
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleClickShowPassword("new")} edge="end">
                        {browser === "Microsoft Edge" ? (
                          <Visibility sx={{ display: "none", cursor: "none" }} />
                        ) : showPassword.new ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                ></InputBase>
              </Box>
              {error.new_password ? (
                <FormHelperText className={styles.FormHelperText}>
                  {data.new_password === "" ? "Password is required" : "Invalid Password"}
                </FormHelperText>
              ) : null}
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SecutitySetting;
