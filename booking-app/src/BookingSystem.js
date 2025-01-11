/*import React, { useState, useEffect } from 'react';

const timeSlots = [
  '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM', 
  '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', 
  '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', 
  '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', 
  '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM', 
  '10:00 PM'
];

function BookingSystem() {
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch bookings from the database on component mount
  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then(response => response.json())
      .then(data => {
        const initialBookings = timeSlots.reduce((acc, time) => {
          acc[time] = data.filter(booking => booking.time === time);
          return acc;
        }, {});
        setBookings(initialBookings);
        setLoading(false);
      })
      .catch(err => console.error('Failed to fetch bookings:', err));
  }, []);

  const handleAddBooking = async (time) => {
    const name = prompt('Enter customer name:');
    const roomNumber = prompt('Enter room number:');
    const numberOfPeople = parseInt(prompt('Enter number of people:'));

    if (name && roomNumber && numberOfPeople) {
      const newBooking = { time, name, roomNumber, numberOfPeople };
      try {
        const response = await fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBooking),
        });

        const savedBooking = await response.json();
        setBookings(prevBookings => ({
          ...prevBookings,
          [time]: [...prevBookings[time], savedBooking],
        }));
      } catch (err) {
        console.error('Failed to add booking:', err);
      }
    }
  };

  const handleEditBooking = async (time, index) => {
    const booking = bookings[time][index];
    const newName = prompt('Edit customer name:', booking.name);
    const newRoomNumber = prompt('Edit room number:', booking.roomNumber);
    const newNumberOfPeople = parseInt(prompt('Edit number of people:', booking.numberOfPeople));

    if (newName && newRoomNumber && newNumberOfPeople) {
      const updatedBooking = { ...booking, name: newName, roomNumber: newRoomNumber, numberOfPeople: newNumberOfPeople };
      try {
        await fetch(`/bookings/${booking.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBooking),
        });

        setBookings(prevBookings => {
          const updatedTimeSlot = [...prevBookings[time]];
          updatedTimeSlot[index] = updatedBooking;
          return { ...prevBookings, [time]: updatedTimeSlot };
        });
      } catch (err) {
        console.error('Failed to edit booking:', err);
      }
    }
  };

  const handleClearBookings = async () => {
    if (window.confirm('Are you sure you want to clear all bookings?')) {
      try {
        await Promise.all(
          Object.values(bookings)
            .flat()
            .map(booking => fetch(`http://localhost:5000/bookings/${booking.id}`, { method: 'DELETE' }))
        );

        setBookings(
          timeSlots.reduce((acc, time) => {
            acc[time] = [];
            return acc;
          }, {})
        );
      } catch (err) {
        console.error('Failed to clear bookings:', err);
      }
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Hotel Restaurant Booking System</h1>

      <div className="mb-4 text-center">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleClearBookings}
        >
          Clear All Bookings
        </button>
      </div>

      <div className="space-y-6">
        {timeSlots.map((time) => (
          <div key={time} className="border p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{time}</h2>
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                onClick={() => handleAddBooking(time)}
                disabled={bookings[time]?.length >= 4}
              >
                Add Booking
              </button>
            </div>

            {bookings[time]?.length === 0 ? (
              <p className="text-gray-500">No bookings yet for this time slot.</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Room</th>
                    <th className="border px-4 py-2">People</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings[time]?.map((booking, index) => (
                    <tr key={booking.id} className="border-t">
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">{booking.roomNumber}</td>
                      <td className="border px-4 py-2">{booking.numberOfPeople}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                          onClick={() => handleEditBooking(time, index)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bookings[time]?.length >= 4 && (
              <p className="text-red-500 mt-2">Maximum bookings reached for this time slot.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingSystem;*/

import React, { useState, useEffect } from 'react';

const timeSlots = [
  '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
  '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM',
  '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
  '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM',
  '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM',
  '10:00 PM'
];

function BookingSystem() {
  const [bookings, setBookings] = useState(
    timeSlots.reduce((acc, time) => {
      acc[time] = [];
      return acc;
    }, {})
  );

  // Fetch bookings from the backend on load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/bookings');
        const data = await response.json();

        // Transform backend data to camelCase and group by time slot
        const formattedData = data.map(booking => ({
          id: booking.id,
          time: booking.time,
          name: booking.name,
          roomNumber: booking.room_number, // Map room_number to roomNumber
          numberOfPeople: booking.number_of_people, // Map number_of_people to numberOfPeople
        }));

        const groupedBookings = timeSlots.reduce((acc, time) => {
          acc[time] = formattedData.filter((booking) => booking.time === time);
          return acc;
        }, {});

        setBookings(groupedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleAddBooking = async (time) => {
    const name = prompt('Enter customer name:');
    const roomNumber = prompt('Enter room number:');
    const numberOfPeople = parseInt(prompt('Enter number of people:'));

    if (name && roomNumber && numberOfPeople) {
      try {
        const response = await fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ time, name, roomNumber, numberOfPeople }),
        });

        if (response.ok) {
          const newBooking = await response.json();
          setBookings((prevBookings) => ({
            ...prevBookings,
            [time]: [...prevBookings[time], newBooking],
          }));
        }
      } catch (error) {
        console.error('Failed to add booking:', error);
      }
    }
  };

  const handleEditBooking = async (time, index) => {
    const existingBooking = bookings[time][index];
    const newName = prompt('Edit customer name:', existingBooking.name);
    const newRoomNumber = prompt('Edit room number:', existingBooking.roomNumber);
    const newNumberOfPeople = parseInt(prompt('Edit number of people:', existingBooking.numberOfPeople));

    if (newName && newRoomNumber && newNumberOfPeople) {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${existingBooking.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newName,
            roomNumber: newRoomNumber,
            numberOfPeople: newNumberOfPeople,
          }),
        });

        if (response.ok) {
          setBookings((prevBookings) => {
            const updatedBookings = [...prevBookings[time]];
            updatedBookings[index] = {
              ...existingBooking,
              name: newName,
              roomNumber: newRoomNumber,
              numberOfPeople: newNumberOfPeople,
            };

            return {
              ...prevBookings,
              [time]: updatedBookings,
            };
          });
        }
      } catch (error) {
        console.error('Failed to update booking:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Hotel Restaurant Booking System</h1>

      <div className="mb-4 text-center">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() =>
            setBookings(
              timeSlots.reduce((acc, time) => {
                acc[time] = [];
                return acc;
              }, {})
            )
          }
        >
          Clear All Bookings
        </button>
      </div>

      <div className="space-y-6">
        {timeSlots.map((time) => (
          <div key={time} className="border p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{time}</h2>
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                onClick={() => handleAddBooking(time)}
                disabled={bookings[time].length >= 4}
              >
                Add Booking
              </button>
            </div>

            {bookings[time].length === 0 ? (
              <p className="text-gray-500">No bookings yet for this time slot.</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Room</th>
                    <th className="border px-4 py-2">People</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings[time].map((booking, index) => (
                    <tr key={index} className="border-t">
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">{booking.roomNumber}</td>
                      <td className="border px-4 py-2">{booking.numberOfPeople}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                          onClick={() => handleEditBooking(time, index)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bookings[time].length >= 4 && (
              <p className="text-red-500 mt-2">Maximum bookings reached for this time slot.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingSystem;