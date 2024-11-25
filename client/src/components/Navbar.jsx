import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav>
      {/* Logo */}
      <header className="flex justify-between ">
        <Link to={"/"} className="flex gap-x-1 items-center top-0">
          <IoWaterOutline className="w-10 h-8 text-cyan-600" />
          <span className="text-cyan-600 font-semibold font-montserrat text-3xl">
            Jade Manor
          </span>
        </Link>
        {/* Search */}
        <div className="flex gap-2 border border-slate-300 rounded-full py-2 px-4 shadow-md shadow-slate-300">
          <div>Anywhere</div>
          <div className="border-l border-slate-300"></div>
          <div>Any week</div>
          <div className="border-l border-slate-300"></div>
          <div>Add guests</div>
          <button className="bg-cyan-600 hover:bg-cyan-700 duration-300 text-white p-1 rounded-full">
            <BiSearch className="w-4 h-4" />
          </button>
        </div>
        {/* Login button */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex gap-2 border border-slate-300 rounded-full py-2 px-4 hover:shadow-md duration-300 text-slate-700"
        >
          <FaBars className="w-5 h-5 relative top-[0.10rem] " />
          <FaUserCircle className="w-6 h-6 " />
          {!!user && <div className="capitalize ">{user.name}</div>}
        </Link>
      </header>
    </nav>
  );
};

export default Navbar;
