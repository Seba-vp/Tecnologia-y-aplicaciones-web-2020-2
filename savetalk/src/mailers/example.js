module.exports = function sendExampleEmail(ctx, data) {
  // you can get all the additional data needed by using the provided one plus ctx
  const {patientEmail} = data;
  const {dentistEmail} = data;
  if (data.to === 'patient') {
    return ctx.sendMail('patient-email', { to: patientEmail, subject: 'Cita en Dentilist' }, { data });    
  } else {
    return ctx.sendMail('dentist-email', { to: dentistEmail, subject: 'Cita en Dentilist' }, { data });
  }
};

