import React, { useState } from 'react';

function AlarmForm({ addAlarm }) {
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time) {
      addAlarm(time);
      setTime(''); // Reset input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Set Alarm</button>
    </form>
  );
}

export default AlarmForm;