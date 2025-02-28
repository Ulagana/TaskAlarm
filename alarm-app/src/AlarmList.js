import React from 'react';

function AlarmList({ alarms, deleteAlarm }) {
  return (
    <div>
      <h2>Scheduled Alarms</h2>
      {alarms.length === 0 ? (
        <p>No alarms set.</p>
      ) : (
        <ul>
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              {alarm.time}{' '}
              <button onClick={() => deleteAlarm(alarm.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlarmList;