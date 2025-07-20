import React from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { ClockIcon } from 'lucide-react';
import { dummyBookingData } from '../assets/assets';

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find(show => show.id === id)
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyBookingData
      });
    }
  }

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-gray-300 text-lg font-semibold px-6'>Available Timings</p>
<div className='mt-5 space-y-1'>
  {show.dateTime[date].map((item) => (
    <div className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`} >
      <ClockIcon className='w-4 h-4'/>
      <p className='text-gray-400 text-sm'>{item.time}</p>
    </div>
  ))}
</div>
      </div>
      {/* <div className='grid grid-cols-10 gap-2'>
        {show.seats.map((seat, index) => (
          <button
            key={index}
            className={`p-2 rounded ${selectedSeats.includes(seat) ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => {
              setSelectedSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]);
            }}
          >
            {seat}
          </button>
        ))}
      </div>
      <button
        className='mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded'
        onClick={() => navigate(`/confirm/${id}/${date}`, { state: { seats: selectedSeats } })}
      >
        Confirm Seats
      </button>
    </div> */}
    </div>
  ) : (
    <Loading/>
  )
}

export default SeatLayout

