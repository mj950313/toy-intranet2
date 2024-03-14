import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomToolbar = ({ label, onView, onNavigate }: any) => (
  <div className="flex justify-between">
    <div className="w-[141px]"></div>
    <div className="flex items-center justify-content: center text-3xl mb-4">
      <IoIosArrowBack
        className="hover:cursor-pointer"
        onClick={() => onNavigate("PREV")}
      />
      <div className="text-4xl text-center w-[500px]">
        <span>{label}</span>
      </div>
      <IoIosArrowForward
        className="hover:cursor-pointer"
        onClick={() => onNavigate("NEXT")}
      />
    </div>
    <div className="flex items-end font-bold mb-2">
      <button
        className="bg-gray-800 hover:bg-mydarkorange focus:bg-myorange text-white font-bold py-1 px-2 mr-4 rounded"
        onClick={() => onView("month")}
      >
        Month
      </button>
      <button
        className="bg-gray-800 hover:bg-mydarkorange focus:bg-myorange text-white font-bold py-1 px-2 rounded"
        onClick={() => onView("week")}
      >
        Week
      </button>
    </div>
  </div>
);

export default CustomToolbar;
