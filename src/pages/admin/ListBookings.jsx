import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import DateTimeFormat from '../../components/DateTimeFormat';
import { dummyBookingData } from '../../assets/assets';
// import { dummyBookingData } from '../../assets/assets';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  // Dummy data for demonstration; replace with real API call
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    setLoading(true);
    // Always use demo data for now to guarantee display
    
    setBookings(dummyBookingData);
    setLoading(false);
  }
  useEffect(() => {
    getAllBookings();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-6 overflow-x-auto md:overflow-x-visible'>
        <table className='min-w-full table-auto border-collapse rounded-md overflow-hidden'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
              <th className='p-2 font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {bookings.map((booking) => (
              <tr key={booking._id} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 pl-5'>{booking.user?.name}</td>
                <td className='p-2'>{booking.show?.movie?.title}</td>
                <td className='p-2'><DateTimeFormat dateString={booking.show?.showDateTime} /></td>
                <td className='p-2'>{Array.isArray(booking.bookedSeats) ? booking.bookedSeats.join(', ') : ''}</td>
                <td className='p-2'>{currency} {booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListBookings;