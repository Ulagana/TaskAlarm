// import React, { useState, useEffect, useCallback } from 'react';
// import AlarmForm from './AlarmForm';
// import AlarmList from './AlarmList';
// import AlarmSound from './AlarmSound';

// function App() {
//   const [alarms, setAlarms] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
//     setAlarms(storedAlarms);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('alarms', JSON.stringify(alarms));
//   }, [alarms]);

//   const checkAlarms = useCallback(() => {
//     const now = currentTime.toLocaleTimeString('en-US', { hour12: false });
//     alarms.forEach((alarm) => {
//       if (alarm.time === now.slice(0, 5)) {
//         console.log('Alarm triggered for:', alarm.time); // Debug log
//         const audio = document.getElementById('alarm-sound');
//         if (audio) {
//           audio.play().catch((error) => console.error('Audio play failed:', error));
//         } else {
//           console.error('Audio element not found');
//         }
//       }
//     });
//   }, [alarms, currentTime]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//       checkAlarms();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [checkAlarms]);

//   const addAlarm = (time) => {
//     const newAlarm = { id: Date.now(), time };
//     setAlarms([...alarms, newAlarm]);
//   };

//   const deleteAlarm = (id) => {
//     setAlarms(alarms.filter((alarm) => alarm.id !== id));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Task Time Alarm</h1>
//       <AlarmForm addAlarm={addAlarm} />
//       <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
//       <AlarmSound />
//       <p>Current Time: {currentTime.toLocaleTimeString()}</p>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from 'react';
import AlarmForm from './AlarmForm';
import AlarmList from './AlarmList';
import AlarmSound from './AlarmSound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [triggerAlarm, setTriggerAlarm] = useState(false);

  // Load alarms from localStorage on mount
  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    setAlarms(storedAlarms);
  }, []);

  // Save alarms to localStorage when they change
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Check alarms against current time
  const checkAlarms = useCallback(() => {
    const now = currentTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
    const triggeredAlarm = alarms.find((alarm) => alarm.time === now);
    if (triggeredAlarm) {
      console.log('Alarm triggered for:', triggeredAlarm.time);
      setTriggerAlarm(true);
    }
  }, [alarms, currentTime]);

  // Update time and check alarms every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      checkAlarms();
    }, 1000);
    return () => clearInterval(interval);
  }, [checkAlarms]);

  // Add new alarm with full object structure
  const addAlarm = (alarmData) => {
    setAlarms((prev) => [...prev, alarmData]);
  };

  // Delete alarm by ID
  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Task Time Alarm</h1>
      <AlarmForm addAlarm={addAlarm} />
      <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
      <AlarmSound trigger={triggerAlarm} />
      <p className="text-center mt-3">
        Current Time: {currentTime.toLocaleTimeString('en-US', { hour12: true })}
      </p>
    </div>
  );
}

export default App;