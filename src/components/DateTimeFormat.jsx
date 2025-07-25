import React from 'react';

const DateTimeFormat = ({ dateString }) => {
  const dateObj = new Date(dateString);
  const weekday = dateObj.toLocaleString('en-US', { weekday: 'short' });
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return <span>{`${weekday}, ${day} ${month}, ${time}`}</span>;
};

export default DateTimeFormat;