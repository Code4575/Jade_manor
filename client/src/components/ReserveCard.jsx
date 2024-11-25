import { useState } from "react";
import { customFetch } from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReserveCard = ({ price, maxGuests, _id }) => {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const [checkIn, setCheckIn] = useState(`${year}-${month}-${day}`);
  const [checkOut, setCheckOut] = useState(`${year}-${month}-${day + 5}`);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [cleaningFee, setCleaningFee] = useState(15);
  const [serviceFee, setServiceFee] = useState(39);
  const navigate = useNavigate();

  const getTotalDays = (checkIn, checkOut) => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const totalDays = (date2 - date1) / (1000 * 3600 * 24);
    return totalDays;
  };

  const handleBooking = async () => {
    try {
      await customFetch.post(`/api/v1/booking/bookAccommodation`, {
        _id,
        checkIn,
        checkOut,
        numberOfGuests,
        price:
          price * getTotalDays(checkIn, checkOut) + cleaningFee + serviceFee,
      });
      toast.success("Reservation successful!")
      navigate(`/account/bookings`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border bg-slate-100 shadow-lg p-4 rounded-2xl mt-6 grid sticky">
      <h2 className="text-2xl tracking-tighter text-center">
        ${price} USD
        <span className="text-sm tracking-normal"> night</span>
      </h2>
      <div>
        <label>Check-in</label>
        <input
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          type="date"
        />
      </div>
      <div>
        <label>Checkout</label>
        <input
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          type="date"
        />
      </div>
      <div>
        <label>Number of guests</label>
        <input
          value={numberOfGuests}
          onChange={(event) => setNumberOfGuests(event.target.value)}
          type="number"
          min={1}
          max={maxGuests}
        />
      </div>
      <div className="flex justify-between">
        <p>{`$${price} USD x ${getTotalDays(checkIn, checkOut)} night(s)`}</p>
        <span>{`$${price * getTotalDays(checkIn, checkOut)} USD`}</span>
      </div>
      <div className="flex justify-between">
        <p>Cleaning fee</p>
        <span>{`$${cleaningFee} USD`}</span>
      </div>
      <div className="flex justify-between">
        <p>Jade Manor service fee</p>
        <span>{`$${serviceFee} USD`}</span>
      </div>
      <div className="flex justify-between pt-3 mt-2 border-t border-black font-semibold">
        <p>Total</p>
        <span>
          ${price * getTotalDays(checkIn, checkOut) + cleaningFee + serviceFee}{" "}
          USD
        </span>
      </div>
      <button onClick={handleBooking} className="primary text-xl">
        Reserve
      </button>
    </div>
  );
};

export default ReserveCard;
