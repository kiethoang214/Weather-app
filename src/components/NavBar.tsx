import React, { useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { usePlaceStore } from "@/app/store";

// type Props = {};
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

interface WeatherItem {
  name: string;
}

interface WeatherResponse {
  list: WeatherItem[];
}

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function NavBar() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const place = usePlaceStore((state) => state.place);
  const setPlace = usePlaceStore((state) => state.setPlace);

  const searchBoxInputChangeMutation = useMutation({
    mutationFn: async (city: string) => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    },
    onSuccess: (data: WeatherResponse) => {
      const suggestions = data.list.map((item: WeatherItem) => item.name);
      setSuggestions(suggestions);
      setShowSuggestions(true);
      setError("");
    },
    onError: () => {
      setError("Failed to fetch weather data");
      setSuggestions([]);
      setShowSuggestions(false);
    },
  });

  const currentLocationMutation = useMutation({
    mutationFn: async ({ latitude, longitude }: Coordinates) => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      return res.data;
    },
    onSuccess: (response) => {
      setPlace(response.data.name);
    },
    onError: () => {
      setError("Failed to get current location");
    },
  });

  const handleInputChange = (value: string) => {
    setCity(value);
    if (value.length > 3) searchBoxInputChangeMutation.mutate(value);
    else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const processCitySubmission = (cityToSet: string) => {
    if (suggestions.length === 0) {
      setError("Location not found");
    } else {
      setError("");
      setTimeout(() => {
        setPlace(cityToSet);
        setShowSuggestions(false);
      }, 500);
    }
  };

  // const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   // setLoadingCity(true);
  //   e.preventDefault();
  //   if (suggestions.length == 0) {
  //     setError("Location not found");
  //     // setLoadingCity(false);
  //   } else {
  //     setError("");
  //     setTimeout(() => {
  //       // setLoadingCity(false);
  //       setPlace(city);
  //       setShowSuggestions(false);
  //     }, 500);
  //   }
  // };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processCitySubmission(city);
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
    processCitySubmission(value);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        currentLocationMutation.mutate({ latitude, longitude });
      });
    }
  };
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <div className="text-gray-500 text-3xl">Weather</div>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300 " />
        </div>
        <section className="flex items-center gap-2">
          <MdMyLocation
            className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            title="Your Current Location"
            onClick={handleCurrentLocation}
          />
          <MdOutlineLocationOn className="text-3xl" />
          <div className="text-slate-900/80 text-sm">{place}</div>
          <div>
            <SearchBox
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

type SuggestionBoxProps = {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
};

const SuggestionBox = ({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: SuggestionBoxProps) => {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[60px]  border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
