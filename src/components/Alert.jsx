import React, { useEffect } from 'react'

// Alert
export const Alert = ({msg, type, removeAlert}) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 3000);
    return () => clearTimeout(timeOut);
  })
  return (
    <div className='wa_alert'>
      <p className={`wa_alert wa_alert-${type}`}>{msg}</p>
    </div>
  )
}
