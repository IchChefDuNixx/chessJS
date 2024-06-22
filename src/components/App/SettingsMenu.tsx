import axios from 'axios';
import { Box, Divider, FormControlLabel, FormGroup, Slider, Switch, Typography } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';

import { Settings, SettingsContext } from './App';

import { UserSettings } from '../../server/prisma/model.types';


function convertSettingsFormat(settings: Settings): UserSettings {
  return { 
    showTooltips: settings.showTooltips,
    darkMode: settings.darkMode,
    gender_min: settings.gender[0],
    gender_max: settings.gender[1],
    human: settings.human
  }
}

function SettingsMenu() {
  const {settings, setSettings} = useContext(SettingsContext);
  
  if (!settings || !setSettings) {  // shut typescript up
    return <></>;
  }

  const [gender, setGender] = useState(settings.gender);
  const [human, setHuman] = useState(settings.human);

  const updateHumanValue = (value: number|number[]) => {
    if (typeof value !== "number") { return; }
    setHuman(value);
  }

  const updateGenderValue = (value: number|number[]) => {
    if (typeof value === "number") { return; }
    setGender(value);
  }

  const handleSwitchChange = (setting: "showTooltips"|"darkMode", event:ChangeEvent<HTMLInputElement>): void => {
    const newSettings = {...settings, [setting]: event.target.checked};
    setSettings(newSettings);
    handleSubmit(newSettings);
  };

  const handleSliderChange = (setting: "gender"|"human", value: number|number[]): void => {
    const newSettings = {...settings, [setting]: value};
    setSettings(newSettings);   // this won't update settings immediately => pass settings to handleSubmit
    handleSubmit(newSettings);
  };

  const handleSubmit = (settings: Settings): void => {
    // Update settings in database if user is logged in
    if (!sessionStorage.accessToken) { return; }

    const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}};  // authentication
    axios.put('/api/user/settings', {data: convertSettingsFormat(settings)}, config)
     .then(() => {
        console.log('Settings updated successfully!');
      })
     .catch(error => {
        if (error.response) {
          console.log(error.response)
        }
        console.log("Something went wrong updating settings");
        // console.error(error);
      });
  };


  return(
    <div>
      <FormGroup>
        <FormControlLabel control={
          <Switch
            checked={settings.showTooltips}
            onChange={e => handleSwitchChange("showTooltips", e)}
          />}
          label="Show tooltips during gameplay"
        />
        <FormControlLabel control={
          <Switch
            checked={settings.darkMode}
            onChange={e => handleSwitchChange("darkMode", e)}
          />}
          label="Dark Mode"
        />
      </FormGroup>
      <Divider />
      <Typography> Gender </Typography>
      <Slider
        value={gender}
        min={0}
        max={300}
        step={0.01}
        onChange={(_, newValues) => updateGenderValue(newValues)}
        onChangeCommitted={(_, newValues) => handleSliderChange("gender", newValues)}
        marks={[
          { value: 100, label: "Female" },
          { value: 200, label: "Male"}
        ]}
        color='secondary'
      />
      <Box sx={{ height: 200 }}>
        <Slider
          value={human}
          min={0}
          max={100}
          step={0.001}
          onChange={(_, newValue) => updateHumanValue(newValue)}
          onChangeCommitted={(_, newValue) => handleSliderChange("human", newValue)}
          color='secondary'
          orientation='vertical'
          valueLabelDisplay='auto'
        />
        <Typography> Human % </Typography>
      </Box>
    </div>
  );
}

export default SettingsMenu;
