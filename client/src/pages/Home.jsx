import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default-accommodation.png";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    customFetch("api/v1/booking/accommodations").then(({ data }) => {
      setAccommodations(data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {accommodations.length > 0 &&
        accommodations.map((accommodation) => (
          <Link
            key={accommodation._id}
            to={`/accommodation/${accommodation._id}`}
          >
            <div className="bg-slate-500 mb-2 rounded-xl flex">
              {accommodation.images?.length > 0 ? (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:4000/uploads/${accommodation.images[0]}`}
                  alt={`${accommodation.title}'s photo`}
                />
              ) : (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={defaultImage}
                  alt="Default accommodation photo"
                />
              )}
            </div>
            <div className="grid gap-y-1">
              <h2 className="font-semibold">{accommodation.address}</h2>
              <h3 className="text-sm leading-4 text-slate-500">
                {accommodation.title}
              </h3>
              <div>
                <span className="font-semibold">${accommodation.price}</span>{" "}
                per night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
