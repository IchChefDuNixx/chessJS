import React, { ChangeEvent } from 'react';
// import './SettingsMenu.css';
import { Button, Divider, FormControlLabel, FormGroup, Radio, RadioGroup, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SettingsMenu() {

  const [settings, setSettings] = React.useState({
    a: false,
    b: false,
    c: false,
    d: ""
  });

  // initialize values at mount
  React.useEffect(() => {
    axios.get("/user_settings").then(response => {
      const data = response.data;
      setSettings(data);
    });
  }, []); // <- This empty array is SUPER important

  const handleSwitchChange = (setting:string, event:ChangeEvent<HTMLInputElement>): void => {
    setSettings({...settings, [setting]: event.target.checked});
    handleSubmit();
  };
  
  const handleRadioChange = (event:ChangeEvent<HTMLInputElement>): void => {
    setSettings({...settings, ["d"]: event.target.value});
    handleSubmit();
  };

  const handleSubmit = (): void => {
    axios.post('/user_settings', settings)
     .then(response => {
        if (response.request.response as boolean) {
          console.log('Settings updated successfully!');
        } else {
          console.log("Something went wrong");
        }
      })
     .catch(error => {
        console.error(error);
      });
  };
  
  const navigate = useNavigate();

  const handleClickHome = (): void => {
    navigate('/');
  }

  return(
    <div>
      <Button onClick={handleClickHome}>
        WIP SETTINGS MENU (Click to continue)
      </Button>
      <Divider />
      <FormGroup>
        <FormControlLabel control={
          <Switch
            checked={settings.a}
            onChange={e => handleSwitchChange("a", e)}
          />}
          label="A"
        />
        <FormControlLabel control={
          <Switch
            checked={settings.b}
            onChange={e => handleSwitchChange("b", e)}
          />}
          label="B"
        />
        <FormControlLabel control={
          <Switch
            checked={settings.c}
            onChange={e => handleSwitchChange("c", e)}
          />}
          label="C"
        />
      </FormGroup>
      <Divider />
       {settings.d}
      <RadioGroup value={settings.d} onChange={e => handleRadioChange(e)}>
        <FormControlLabel value="female" control={<Radio />} label="Female"/>
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="123" control={<Radio />} label="123" />
        <Divider />
      </RadioGroup>
    </div>
  );
}

export default SettingsMenu;
