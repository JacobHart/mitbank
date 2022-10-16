import React from 'react'
import { useSelector } from 'react-redux'

export const Alert = () => {
  const alerts = useSelector(state => state.alert)

  const renderedAlerts = alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
  ))

  return (
    <section className="posts-list">

      {renderedAlerts}
    </section>
  )
}