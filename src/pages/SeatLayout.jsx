import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { ArrowRight, ClockIcon } from 'lucide-react';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];

  const getShow = async () => {
    const showData = dummyShowsData.find(show => show.id === parseInt(id));
    if (showData) {
      setShow({
        movie: showData,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  if (!show) return <Loading />;

  return (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-gray-300 text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time
                ? 'bg-primary text-white'
                : 'hover:bg-primary/20'
                }`}
              onClick={() => setSelectedTime(item)}
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-gray-400 text-sm'>{new Date(item.time).toLocaleTimeString()}</p>
            </div>
          )) || <p className="text-sm text-gray-400 px-6">No timings available</p>}
        </div>
      </div>

      {/* Seat Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' right='-100px' />
        <BlurCircle bottom='-100px' right='0' />

        <h1 className='text-2xl font-semibold text-white mb-4'>Select Your Seats</h1>
        <img src={assets.screenImage} alt='Screen' />
        <p className='mb-13 text-sm text-gray-400'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>

          <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          className='mt-20 flex gap-1 transition items-center text-sm font-semibold px-10 py-3 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer active:scale-95'
          onClick={() =>
            navigate(`/my-bookings`, {
              state: { seats: selectedSeats, time: selectedTime },
            })
          }
          disabled={selectedSeats.length === 0 || !selectedTime}
        >
          Proceed to Checkout    <ArrowRight strokeWidth={3} className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
