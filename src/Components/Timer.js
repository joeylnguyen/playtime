import React from 'react';
import styled from 'styled-components';

const Timer = ( { hours, minutes, handleChange } ) => {
  return (
    <TimerWrapper>
      <TimeInputWrapper>
        <HourInput type="number" id="hours" min="0" max="6" value={hours} onChange={handleChange} />
        Hours
      </TimeInputWrapper>
      <TimeInputWrapper>
        <MinuteInput type="number" id="minutes" min="0" max="59" value={minutes} onChange={handleChange} />
        Mins
      </TimeInputWrapper>
    </TimerWrapper>
  )
};

export default Timer;

const TimerWrapper = styled.div`
  justify-content: center;
  height: 100px;
`;

const TimeInputWrapper = styled.span`
  font-size: larger;
  color: white;
`;

const HourInput = styled.input`
  border: none;
  height: 75%;
  text-align: right;
  font-size: 40px;
  font-weight: bolder;
  background-color: transparent;
  color: white;
`;

const MinuteInput = styled.input`
  border: none;
  height: 75%;
  text-align: right;
  font-size: 40px;
  font-weight: bolder;
  background-color: transparent;
  color: white;
`;
