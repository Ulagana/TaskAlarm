import React, { useState, useEffect, useCallback } from 'react';
import AlarmForm from './AlarmForm';
import AlarmList from './AlarmList';
import AlarmSound from './AlarmSound';

function App() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    setAlarms(storedAlarms);
  }, []);

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  const checkAlarms = useCallback(() => {
    const now = currentTime.toLocaleTimeString('en-US', { hour12: false });
    alarms.forEach((alarm) => {
      if (alarm.time === now.slice(0, 5)) {
        console.log('Alarm triggered for:', alarm.time); // Debug log
        const audio = document.getElementById('alarm-sound');
        if (audio) {
          audio.play().catch((error) => console.error('Audio play failed:', error));
        } else {
          console.error('Audio element not found');
        }
      }
    });
  }, [alarms, currentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      checkAlarms();
    }, 1000);
    return () => clearInterval(interval);
  }, [checkAlarms]);

  const addAlarm = (time) => {
    const newAlarm = { id: Date.now(), time };
    setAlarms([...alarms, newAlarm]);
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Time Alarm</h1>
      <AlarmForm addAlarm={addAlarm} />
      <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
      <AlarmSound />
      <p>Current Time: {currentTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default App;