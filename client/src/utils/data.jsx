import { nanoid } from "nanoid";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaWifi, FaRegSnowflake } from "react-icons/fa";
import { MdPets, MdOutlineOutdoorGrill } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";

export const amenitiesList = [
  { id: nanoid(), icon: <FaWifi className="w-5 h-5" />, title: "Wi-Fi" },
  {
    id: nanoid(),
    icon: <TbToolsKitchen2 className="w-5 h-5" />,
    title: "Kitchen",
  },
  { id: nanoid(), icon: <MdPets className="w-5 h-5" />, title: "Pets Allowed" },
  { id: nanoid(), icon: <PiBathtub className="w-5 h-5" />, title: "Bathtub" },
  {
    id: nanoid(),
    icon: <MdOutlineOutdoorGrill className="w-5 h-5" />,
    title: "BBQ Grill",
  },
  {
    id: nanoid(),
    icon: <FaRegSnowflake className="w-5 h-5" />,
    title: "Air Conditioner",
  },
];
