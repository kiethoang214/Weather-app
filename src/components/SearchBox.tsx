import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBox(props: Props) {
  // const [city, setCity] = useState("");
  // const [error, setError] = useState("");
  // //
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        type="text"
        value={props.value || ""}
        placeholder="Search location..."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
        onChange={props.onChange}
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
        <IoSearch />
      </button>
    </form>
  );
}
