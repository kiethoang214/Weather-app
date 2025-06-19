import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface WeatherDetailListProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetailList(props: WeatherDetailListProps) {
  const { visibility, humidity, windSpeed, airPressure, sunrise, sunset } =
    props;
  return (
    <>
      <WeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={visibility}
      />
      <WeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <WeatherDetail
        icon={<MdAir />}
        information="Wind speed"
        value={windSpeed}
      />
      <WeatherDetail
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
      />
      <WeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <WeatherDetail icon={<LuSunset />} information="Sunset" value={sunset} />
    </>
  );
}

export interface WeatherDetailProps {
  information: string;
  value: string;
  icon: React.ReactNode;
}

export function WeatherDetail(props: WeatherDetailProps) {
  return (
    <div className="flex flex-col justify-around gap-2 items-center text-xs font-semibold text-black/80">
      <div className="whitespace-nowrap">{props.information}</div>
      <div className="text-3xl">{props.icon}</div>
      <div>{props.value}</div>
    </div>
  );
}
