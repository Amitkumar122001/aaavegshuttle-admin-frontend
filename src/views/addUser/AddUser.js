import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BackendUrl } from 'utils/config';
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
export const AddUser = () => {
  const [userForm, setUserForm] = useState({
    userName: '',
    gender: '',
    mobile: '',
    email: '',
    homePostalCode: '',
    homeCity: '',
    homeState: '',
    homeAddress: '',
    officePostalCode: '',
    officeCity: '',
    officeState: '',
    officeAddress: ''
  });
  const [userFormErr, setUserFormErr] = useState({
    userNameErr: false,
    genderErr: false,
    mobileErr: false,
    emailErr: false,
    homePostalCodeErr: false,
    homeCityErr: false,
    homeStateErr: false,
    homeAddressErr: false,
    officePostalCodeErr: false,
    officeCityErr: false,
    officeStateErr: false,
    officeAddressErr: false
  });
  const handleAddUser = () => {
    setUserFormErr({
      ...userFormErr,
      userNameErr: false,
      genderErr: false,
      mobileErr: false,
      emailErr: false,
      homePostalCodeErr: false,
      homeCityErr: false,
      homeStateErr: false,
      homeAddressErr: false,
      officePostalCodeErr: false,
      officeCityErr: false,
      officeStateErr: false,
      officeAddressErr: false
    });
    if (
      validateEmail(userForm.email) &&
      userForm.userName &&
      userForm.gender &&
      userForm.homeAddress &&
      userForm.homeCity &&
      userForm.homePostalCode &&
      userForm.homeState &&
      userForm.mobile.length == 10 &&
      userForm.officeState &&
      userForm.officePostalCode &&
      userForm.officeCity &&
      userForm.officeAddress
    ) {
      const body = {
        username: userForm.userName,
        gender: userForm.gender,
        mobile: userForm.mobile,
        email: userForm.email,
        homelocationpostalcode: userForm.homePostalCode,
        homelocationcity: userForm.homeCity,
        homelocationstate: userForm.homeState,
        homelocationaddressline1: userForm.homeAddress,
        officelocationpostalcode: userForm.officePostalCode,
        officelocationcity: userForm.officeCity,
        officelocationstate: userForm.officeState,
        officelocationaddressline1: userForm.officeAddress
      };
      console.log(body);
      axios
        .post(`${BackendUrl}/app/v1/user/createUser`, body, { headers: {} })
        .then((res) => {
          console.log(res);
          toast.success('User Added SuccessFully');
        })
        .catch((e) => {
          console.log(e);
          toast.error('error');
        });
    } else if (userForm.userName == '') {
      setUserFormErr({ ...userFormErr, userNameErr: true });
    } else if (userForm.gender == '') {
      setUserFormErr({ ...userFormErr, genderErr: true });
    } else if (userForm.homeAddress == '') {
      setUserFormErr({ ...userFormErr, homeAddressErr: true });
    } else if (userForm.homeCity == '') {
      setUserFormErr({ ...userFormErr, homeCityErr: true });
    } else if (userForm.homePostalCode == '') {
      setsetUserFormErr({ ...userFormErr, homePostalCodeErr: true });
    } else if (userForm.homeState == '') {
      setUserFormErr({ ...userFormErr, homeStateErr: true });
    } else if (userForm.officeAddress == '') {
      setUserFormErr({ ...userFormErr, officeAddressErr: true });
    } else if (userForm.officeCity == '') {
      setUserFormErr({ ...userFormErr, officeCityErr: true });
    } else if (userForm.officePostalCode == '') {
      setsetUserFormErr({ ...userFormErr, officePostalCodeErr: true });
    } else if (userForm.officeState == '') {
      setUserFormErr({ ...userFormErr, officeStateErr: true });
    } else if (userForm.mobile.length != 10) {
      setUserFormErr({ ...userFormErr, mobileErr: true });
    }
  };

  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            // Default options for specific types
            success: {
              duration: 1000,
              theme: {
                primary: 'green',
                secondary: 'black'
              }
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-10 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <p className="text-3xl text-gray-600 text-center">User Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        <div>
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10">
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="text"
                  label="User Name"
                  variant="outlined"
                  required
                  value={userForm.userName}
                  onChange={(e) => setUserForm({ ...userForm, userName: e.target.value })}
                />
              </FormControl>
              {userFormErr.userNameErr && userForm.userName == '' && <p className="text-red-400 p-1 ml-2">User name error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Mobile number"
                  required={true}
                  type="tel"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={userForm.mobile}
                  onChange={(e) => setUserForm({ ...userForm, mobile: e.target.value })}
                />
              </FormControl>
              {userFormErr.mobileErr && userForm.mobile.length != 10 && <p className="text-red-400 p-1 ml-2">mobile number error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  required={true}
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                />
              </FormControl>
              {userFormErr.emailErr && <p className="text-red-400 p-1 ml-2">Email error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  required={true}
                  labelId="gender"
                  id="demo-simple-st"
                  value={userForm.gender}
                  label="Gender"
                  onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              {userFormErr.genderErr && <p className="text-red-400 p-1 ml-2">Gender error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Home location postal code"
                  variant="outlined"
                  value={userForm.homePostalCode}
                  onChange={(e) => setUserForm({ ...userForm, homePostalCode: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.homePostalCodeErr && <p className="text-red-400 p-1 ml-2">Home location postal code error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Home location state"
                  variant="outlined"
                  value={userForm.homeState}
                  onChange={(e) => setUserForm({ ...userForm, homeState: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.homeState && <p className="text-red-400 p-1 ml-2">Home location state error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Home location city"
                  variant="outlined"
                  value={userForm.homeCity}
                  onChange={(e) => setUserForm({ ...userForm, homeCity: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.homeCityErr && <p className="text-red-400 p-1 ml-2">Home location city error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Home location address line"
                  variant="outlined"
                  value={userForm.homeAddress}
                  onChange={(e) => setUserForm({ ...userForm, homeAddress: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.homeAddressErr && <p className="text-red-400 p-1 ml-2">Home location address line error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Office location postal code"
                  variant="outlined"
                  value={userForm.officePostalCode}
                  onChange={(e) => setUserForm({ ...userForm, officePostalCode: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.officePostalCode && <p className="text-red-400 p-1 ml-2">Office location postal code error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Office location state"
                  variant="outlined"
                  value={userForm.officeState}
                  onChange={(e) => setUserForm({ ...userForm, officeState: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.officeState && <p className="text-red-400 p-1 ml-2">Office location state error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Office location city"
                  variant="outlined"
                  value={userForm.officeCity}
                  onChange={(e) => setUserForm({ ...userForm, officeCity: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.officeCityErr && <p className="text-red-400 p-1 ml-2">Office location city error</p>}
            </div>
            <div className="w-full">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Office location address line"
                  variant="outlined"
                  value={userForm.officeAddress}
                  onChange={(e) => setUserForm({ ...userForm, officeAddress: e.target.value })}
                  required={true}
                />
              </FormControl>
              {userFormErr.officeAddressErr && <p className="text-red-400 p-1 ml-2">Office location address line error</p>}
            </div>
          </div>
        </div>

        {/* button */}
        <div>
          <div className="flex justify-between">
            <Button variant="contained" className="bg-blue-700" onClick={handleAddUser}>
              Add User
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
