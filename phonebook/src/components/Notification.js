import React from 'react';

const Notification = ({ message, notificationStyle }) => {

  const style = { ...notificationStyle, color: 'green'}

  if (message == null)
    return null
  return (
    <div style={style}>
        {message}
    </div>
  )
}

export default Notification;