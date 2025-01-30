const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Configuration
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION_URL
});

// Routes

// 1. GET /bookings - Retrieve all bookings
app.get('/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY time');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve bookings' });
  }
});

// 2. POST /bookings - Add a new booking
app.post('/bookings', async (req, res) => {
  const { time, name, roomNumber, numberOfPeople } = req.body;

  // Validate input
  if (!time || !name || !roomNumber || !Number.isInteger(numberOfPeople)) {
    return res.status(400).json({ message: 'Invalid booking data' });
  }

  const id = uuidv4(); // Generate a unique ID

  try {
    await pool.query(
      'INSERT INTO bookings (id, time, name, room_number, number_of_people) VALUES ($1, $2, $3, $4, $5)',
      [id, time, name, roomNumber, numberOfPeople]
    );
    res.status(201).json({ id, time, name, roomNumber, numberOfPeople });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add booking' });
  }
});

// 3. PUT /bookings/:id - Update an existing booking
app.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { time, name, roomNumber, numberOfPeople } = req.body;

  // Convert camelCase to snake_case
  // const room_number = roomNumber;
  // const number_of_people = numberOfPeople;

  // Validate input
  if (!time || !name || !roomNumber || !Number.isInteger(numberOfPeople)) {
    return res.status(400).json({ message: 'Invalid booking data' });
  }

  try {
    const result = await pool.query(
      'UPDATE bookings SET time = $1, name = $2, room_number = $3, number_of_people = $4 WHERE id = $5',
      [time, name, roomNumber, numberOfPeople, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ id, time, name, roomNumber, numberOfPeople });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update booking' });
  }
});

// 4. DELETE /bookings/:id - Delete a booking
app.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
});

// 5. DELETE /bookings - Clear all bookings
app.delete('/bookings', async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings');
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear bookings' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});