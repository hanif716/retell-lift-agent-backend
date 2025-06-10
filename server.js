const express = require('express');
const app = express();
app.use(express.json());

app.post('/lift-appointments', (req, res) => {
  const { make, model, last_visit_date, caller_phone } = req.body;

  const appointmentDate = getNextMonday();
  const appointmentTime = "10:00 AM";
  const visitLength = "45 minutes";

  const message = `Your lift inspection is booked for ${appointmentDate.toLocaleDateString('en-UK', { weekday: 'long', month: 'long', day: 'numeric' })} at ${appointmentTime}. Estimated duration: ${visitLength}.`;

  return res.json({
    event: "new_lift_inspection_appointment",
    data: {
      make,
      model,
      last_visit_date,
      appointment_date: appointmentDate.toISOString().split('T')[0],
      appointment_time: appointmentTime,
      visit_length: visitLength,
      contact_number: caller_phone,
      message_to_customer: message
    }
  });
});

function getNextMonday() {
  const today = new Date();
  const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilMonday);
}

app.get("/", (req, res) => res.send("Retell Lift Appointment Webhook Running!"));
app.listen(3000, () => console.log("Server running on port 3000"));
