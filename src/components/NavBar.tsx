import React from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

// type Props = {};

export default function NavBar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <div className="text-gray-500 text-3xl">Weather</div>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300 " />
        </div>
        <section className="flex items-center gap-2">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <div className="text-slate-900/80 text-sm">Vietnam</div>
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
