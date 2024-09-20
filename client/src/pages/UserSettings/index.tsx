import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import SideNavBtn from "./SideNavBtn";
import PIpng from "../../assets/Images/settingpi.png";
import Spng from "../../assets/Images/settingS.png";
// import Bntpng from '../../assets/Images/settingB&t.png'
// import Ppng from '../../assets/Images/settingP.png'
// import Lpng from '../../assets/Images/settingL.png'
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { useAppDispatch } from "../../hooks";
import { updateUserAction } from "../../features/user/user.action";
import { useNotification } from "../../hooks/useNotification";
import SecutitySetting from "./Security";
import axiosInstance from "../../config/axios";

const UserSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState<number>(1);
  const [reqData, setReqData] = useState<any>();
  const [dataPassword, setDataPassword] = useState<{
    old_password: string;
    new_password: string;
  }>();
  const showNotification = useNotification();

  const handleSave = async () => {
    if (tab === 1) {
      const data = {
        city: reqData.city,
        country: reqData.country,
        state: reqData.state,
        phone_no: reqData.phone,
        pincode: reqData.pincode,
      };
      const resp: any = await dispatch(updateUserAction({ data: data }));
      if (resp.meta.requestStatus === "") {
        showNotification(" Profile Updated", "success");
        navigate("/setting");
        window.location.reload();
      }
      if (resp.meta.requestStatus === "rejected") {
        console.log("resp: ", resp);
        showNotification(resp?.payload?.response?.data || "Error", "error");
      }
    }
    if (tab === 2) {
      try {
        const resp: any = await axiosInstance.post("/auth/change-password", dataPassword);
        if (resp.data.token) {
          showNotification("Password Updated Successfully", "success");
          navigate("/setting");
          window.location.reload();
        } else {
          console.log("resp: ", resp);
          showNotification(resp?.data.message || "Error", "error");
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };
  return (
    <Box className={styles.root}>
      <Box className={styles.heading}>
        <Box className={styles.headings}>
          <Typography className={styles.heading1}>Settings</Typography>
          <Typography className={styles.heading2}>Manage your account settings</Typography>
        </Box>
        <Box className={styles.headingBtns}>
          <Button
            onClick={() => {
              handleSave();
            }}
            className={`${styles.saveBtn} ${styles.headingBtn}`}
          >
            Save Changes
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className={`${styles.cancleBtn} ${styles.headingBtn}`}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box className={styles.main}>
        <Box className={styles.mainWrapper}>
          <Box className={styles.sideBar}>
            <SideNavBtn
              title="Personal Information"
              active={tab === 1}
              img={PIpng}
              onClick={() => {
                setTab(1);
              }}
            />
            <SideNavBtn
              title="Security"
              active={tab === 2}
              img={Spng}
              onClick={() => {
                setTab(2);
              }}
            />
          </Box>
          <Divider className={styles.divider} orientation="vertical" />
          <Box className={styles.children}>
            {tab === 2 && (
              <Box>
                <SecutitySetting setReqData={setDataPassword} />
              </Box>
            )}
            {tab === 1 && <PersonalInfo setReqData={setReqData} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserSettings;
