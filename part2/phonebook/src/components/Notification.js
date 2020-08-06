import React from 'react';

const Notification = ({ data }) => {
  if (data === null) return null;

  const { message, alertClass } = data;

  return (
    <div className={`notification ${alertClass}`}>
      {message}
    </div>
  )
}

export default Notification;