import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/AlertState';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts !== null && (
      <div className={`alert alert-${alerts.type} col-md-6 mx-auto mt-3`}>
        {alerts.msg}
      </div>
    )
  );
};

export default Alerts;
