import React from 'react';

const ErrorNotification = ({ message, notificationStyle }) => {

	const style = { ...notificationStyle, color: 'red'}

	if (message == null)
		return null
	return (
		<div style={style}>
				{message}
		</div>
	)
}

export default ErrorNotification;