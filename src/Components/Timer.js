import React from 'react';

const Timer = ( { hours, minutes, handleChange } ) => {
  return (
    <div>
      <span>
        <input type="number" id="hours" min="0" max="6" value={hours} onChange={handleChange} />
        Hours
      </span>
      <span>
        <input type="number" id="minutes" min="0" max="59" value={minutes} onChange={handleChange} />
        Mins
      </span>
    </div>
  )
};

export default Timer;