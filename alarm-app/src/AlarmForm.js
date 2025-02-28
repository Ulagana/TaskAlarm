// import React, { useState } from 'react';

// function AlarmForm({ addAlarm }) {
//   const [time, setTime] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (time) {
//       addAlarm(time);
//       setTime(''); // Reset input
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         required
//       />
//       <button type="submit">Set Alarm</button>
//     </form>
//   );
// }

// export default AlarmForm;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

function AlarmForm({ addAlarm }) {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time) {
      setError('Please select a time');
      return;
    }

    const alarmData = {
      time,
      label: label || `Alarm at ${time}`,
      id: Date.now(),
    };

    addAlarm(alarmData);
    setTime('');
    setLabel('');
    setError('');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="time" className="form-label fw-bold">
                Alarm Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="label" className="form-label fw-bold">
                Label (optional)
              </label>
              <input
                type="text"
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Wake Up"
                className="form-control"
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={!time}
            >
              <span>⏰</span>
              Set Alarm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AlarmForm;