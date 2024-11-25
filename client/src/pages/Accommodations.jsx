import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import AccountNavbar from "../components/AccountNavbar";
import defaultImage from "../assets/default-accommodation.png";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    customFetch("api/v1/booking/userAccommodations").then(({ data }) => {
      setAccommodations(data);
    });
  }, []);

  return (
    <div>
      <AccountNavbar />
      <div className="text-center">
        <Link
          className="capitalize inline-flex items-center gap-1 bg-cyan-600 py-2 px-4 text-white rounded-full hover:shadow-md duration-300"
          to={"/account/accommodations/new"}
        >
          <FaPlus className="h-5 w-5" />
          Add new place
        </Link>
      </div>
      <div className="mt-4 ">
        {accommodations.length > 0 &&
          accommodations.map((accommodation) => {
            return (
              <Link
                key={accommodation._id}
                to={`/account/accommodations/${accommodation._id}`}
                className="mt-4 flex cursor-pointer gap-4 bg-slate-200 p-4 rounded-2xl hover:shadow-md duration-300"
              >
                <div className=" bg-slate-200 shrink-0">
                  {accommodation.images?.length > 0 ? (
                    <img
                      className="w-40 h-40 object-cover rounded-xl"
                      src={`http://localhost:4000/uploads/${accommodation.images[0]}`}
                      alt={`${accommodation.title}'s photo`}
                    />
                  ) : (
                    <img
                      className="w-40 h-40 object-cover rounded-xl"
                      src={defaultImage}
                      alt="Default accommodation photo"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-xl">{accommodation.title}</h2>
                  <p className="text-sm mt-2">{accommodation.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Accommodations;
