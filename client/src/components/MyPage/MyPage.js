import * as React from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const serverURL = "";

const Account = () => {
    const [onEdit, setOnEdit] = useState(false);
    const [userID, setUserID] = useState('1');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [DOB, setDOB] = useState();

    const onFirstNameChange = (e) => {
      setFirstName(e.target.value)
    }
    const onLastNameChange = (e) => {
      setLastName(e.target.value)
    }
    const onEmailChange = (e) => {
      setEmail(e.target.value)
    }
    const onPhoneChange = (e) => {
      setPhone(e.target.value)
    }

    const onEditClick = () => {
      setOnEdit(!onEdit)
    }
    const onSaveClick = () => {
      const userInfo = {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      }
      callUpdateUserSettings(userInfo);
      setOnEdit(!onEdit)
    }

    React.useEffect(() => {
      callLoadUserSettings(userID)
    }, []);

    const callLoadUserSettings = async (userID) => {
      const user = {
        userID: userID
      }
      const url = serverURL + "/api/loadUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("User info: ", body);
      let { firstName, lastName, email, phone, DOB } = body[0];
      setFirstName(firstName)
      setLastName(lastName)
      setEmail(email)
      setPhone(phone)
      const slicedDOB = DOB.slice(0, DOB.indexOf("T"))
      console.log(slicedDOB)
      setDOB(slicedDOB)
      return body;
    }

    const callUpdateUserSettings = async (userInfo) => {
      const url = serverURL + "/api/updateUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }

  return (
    <Grid container spacing="5">
      <br/>
    <Typography variant="h3">My Account</Typography>
    <Divider/>
      <Grid alignItems="center" justifyContent="center" direction="row" item xs={12}>
        <Typography variant="h5">UserID:</Typography> {userID}
        <br/>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5">First name:</Typography>
        {onEdit ? <TextField value={firstName} onChange={onFirstNameChange} fullWidth/> : firstName} 
        <br/>
      </Grid>
    <Grid item xs={8}>
      <Typography variant="h5">Last name:</Typography>
      {onEdit ? <TextField value={lastName} onChange={onLastNameChange} fullWidth/> : lastName} 
      <br/>
    </Grid>
    <Grid item xs={8}>
      <Typography variant="h5">Email:</Typography>
      {onEdit ? <TextField value={email} onChange={onEmailChange} fullWidth/> : email} 
      <br/>
    </Grid>
    <Grid item xs={8}>
      <Typography variant="h5">Phone:</Typography>
      {onEdit ? <TextField value={phone} onChange={onPhoneChange} fullWidth/> : phone}
      <br/>
    </Grid>
    <Grid item xs={8}>
      <Typography variant="h5">DOB:</Typography> { DOB }
      <br/>
    </Grid>
    <br/>
    <Grid item xs={8}>
      {onEdit ? <Button variant="contained" onClick={onSaveClick}>Save</Button> : <Button variant="contained" onClick={onEditClick}>Edit</Button>}
    </Grid>
    </Grid>
  );
}

export default Account;
