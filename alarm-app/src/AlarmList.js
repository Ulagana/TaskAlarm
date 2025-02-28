// import React from 'react';

// function AlarmList({ alarms, deleteAlarm }) {
//   return (
//     <div>
//       <h2>Scheduled Alarms</h2>
//       {alarms.length === 0 ? (
//         <p>No alarms set.</p>
//       ) : (
//         <ul>
//           {alarms.map((alarm) => (
//             <li key={alarm.id}>
//               {alarm.time}{' '}
//               <button onClick={() => deleteAlarm(alarm.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AlarmList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AlarmList({ alarms, deleteAlarm }) {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Scheduled Alarms</h2>
        </div>
        <div className="card-body p-0">
          {alarms.length === 0 ? (
            <div className="alert alert-info m-3" role="alert">
              No alarms set yet.
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {alarms.map((alarm) => (
                <li 
                  key={alarm.id} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="badge bg-secondary me-2">
                      ⏰
                    </span>
                    <strong>{alarm.time}</strong>
                    {alarm.label && (
                      <span className="text-muted ms-2">
                        - {alarm.label}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete alarm"
                  >
                    <i className="bi bi-trash"></i>
                    <span className="ms-1 d-none d-md-inline">Delete</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlarmList;