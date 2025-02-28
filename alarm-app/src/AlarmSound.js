// import React from 'react';

// function AlarmSound() {
//   return (
//     // <audio id="alarm-sound" src="/alarm.mp3" preload="auto" />
//     <audio id="alarm-sound" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />
//   );
// }

// export default AlarmSound;

import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AlarmSound.css'; // Custom CSS for star animation

function AlarmSound({ trigger }) {
  const audioRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowAlert(true);
      const audio = audioRef.current;
      
      // Play audio
      audio.play();
      
      // Stop after 20 seconds
      const timeout = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setShowAlert(false);
      }, 20000); // 20 seconds

      // Cleanup timeout on unmount or new trigger
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <div className="alarm-sound-container position-relative">
      <audio
        ref={audioRef}
        id="alarm-sound"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
      />

      {showAlert && (
        <>
          {/* Success Alert */}
          <div className="alert alert-success alert-dismissible fade show text-center" role="alert">
            <strong>Alarm Triggered!</strong> re!
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setShowAlert(false);
              }}
            ></button>
          </div>

          {/* Star Celebration Effect */}
          <div className="celebration-overlay">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ⭐
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AlarmSound;