import { ChangeEvent, useEffect, useState } from 'react';
// import './SettingsMenu.css';
import { Box, Button, Divider, FormControlLabel, FormGroup, Slider, Switch, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SettingsMenu() {

  const navigate = useNavigate();
  const [sliderH, setSliderH] = useState([40,60]);
  const [sliderV, setSliderV] = useState(50);
  const [settings, setSettings] = useState({
    showTooltips: false,
    darkMode: false,
    gender: sliderH,
    human: sliderV
  });

  // initialize values at mount
  useEffect(() => {
    axios.get("/api/user_settings").then(response => {
      const data = response.data;
      setSettings(data);
    });
  }, []); // <- This empty array is SUPER important

  const handleSwitchChange = (setting: "showTooltips"|"darkMode", event:ChangeEvent<HTMLInputElement>): void => {
    setSettings({...settings, [setting]: event.target.checked});
    handleSubmit();
  };

  const handleSliderChange = (setting: "gender"|"human", value: number|number[]): void => {
    setSettings({...settings, [setting]: value});
    handleSubmit();
  };

  const handleSubmit = (): boolean => {
    let isSuccess: boolean = false;
    axios.post('/api/user_settings', settings)
     .then(response => {
        if (response.request.response as boolean) {
          console.log('Settings updated successfully!');
          isSuccess = true;
        } else {
          console.log("Something went wrong");
        }
      })
     .catch(error => {
        console.error(error);
      });
    return isSuccess;
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
      <Typography>Gender</Typography>
      <Slider
        value={sliderH}
        min={0}
        max={300}
        step={0.01}
        onChange={(_, newValues: number[]) => setSliderH(newValues)}
        onChangeCommitted={(_, newValues: number) => handleSliderChange("gender", newValues)}
        marks={[
          { value: 100, label: "Female" },
          { value: 200, label: "Male"}
        ]}
        color='secondary'
      />
      <Box sx={{ height: 200 }}>
        <Slider
          value={sliderV}
          min={0}
          max={100}
          step={0.001}
          onChange={(_, newValue: number) => setSliderV(newValue)}
          onChangeCommitted={(_, newValue: number) => handleSliderChange("human", newValue)}
          color='secondary'
          orientation='vertical'
          valueLabelDisplay='auto'
        />
        <Typography>Human %</Typography>
      </Box>
    </div>
  );
}

export default SettingsMenu;
