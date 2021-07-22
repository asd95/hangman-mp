import React from 'react';
import './Notification.scss';

const Notification = ({showNotification}) => {
  const show = showNotification ? 'show': '';
    return (
      <div className={`notification ${show}`}>
        <p>You have already entered this letter</p>
      </div>
    );
}

export default Notification;
