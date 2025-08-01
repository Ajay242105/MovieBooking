import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import DateTimeFormat from '../../components/DateTimeFormat';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [flattenedShows, setFlattenedShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('shows')) || [];

      const result = [];

      stored.forEach((show) => {
        const movie = show.movie;
        const price = parseFloat(show.showPrice); // ✅ ensure it's a number
        const seats = show.occupiedSeats || {};

        if (show.showTimes) {
          Object.entries(show.showTimes).forEach(([date, times]) => {
            times.forEach((time) => {
              const fullDateTime = `${date}T${time}`;
              result.push({
                movie,
                showPrice: price,
                showDateTime: fullDateTime,
                occupiedSeats: seats
              });
            });
          });
        }
      });

      setFlattenedShows(result);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load shows:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      {flattenedShows.length === 0 ? (
        <p className="text-gray-400 mt-6 text-center">No shows available. Please add from AddShows page.</p>
      ) : (
        <div className="max-w-4xl mt-6 overflow-x-auto">
          <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-2 font-medium pl-5">Movie Name</th>
                <th className="p-2 font-medium">Show Time</th>
                <th className="p-2 font-medium">Total Bookings</th>
                <th className="p-2 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {flattenedShows.map((item, idx) => {
                const bookingCount = Object.keys(item.occupiedSeats || {}).length;
                const earnings = item.showPrice * bookingCount;
                return (
                  <tr key={idx} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                    <td className="p-2 pl-5">{item.movie?.title || 'Untitled Movie'}</td>
                    <td className="p-2">
                      <DateTimeFormat dateString={item.showDateTime} />
                    </td>
                    <td className="p-2">{bookingCount}</td>
                    <td className="p-2">
                      {currency} {earnings.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
