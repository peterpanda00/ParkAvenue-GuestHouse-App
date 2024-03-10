import supabase from "../frontend/src/config/supabaseClient";

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/submitBooking', async (req, res) => {
  try {
    const { guestData, bookingData, selectedRooms } = req.body;

    // Insert guest data
    const { data: insertedGuestData, error: guestError } = await supabase
      .from('guests')
      .insert(guestData)
      .select();

    if (guestError) {
      return res.status(500).json({ error: 'Error inserting guest data' });
    }

    const guestID = insertedGuestData[0].GuestID;

    // Insert booking data
    const { data: insertedBookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert([{ ...bookingData, GuestID: guestID }])
      .select();

    if (bookingError) {
      return res.status(500).json({ error: 'Error inserting booking data' });
    }

    const bookingID = insertedBookingData[0].BookingID;

    // Insert room booking data
    for (const room of selectedRooms) {
      await supabase.from('rooms_bookings').insert([{ RoomNumber: room.RoomNumber, BookingID: bookingID }]);
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(4000,() => {console.log("Server started on port 4000")})