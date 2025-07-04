import React from "react";
import Container from "./Container";
import WeatherDetailList, { WeatherDetailListProps } from "./WeatherDetailList";
import WeatherIcon from "./WeatherIcon";

export interface ForecastWeatherDetailProps extends WeatherDetailListProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const { weatherIcon, date, day, temp, feels_like, description } = props;
  console.log("ForecastWeatherDetail props:", props);
  return (
    <Container className="gap-4">
      <section className=" flex gap-4 items-center px-4  ">
        <div className=" flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{day}</p>
          <p className="text-sm">{date} </p>
        </div>

        {/*  */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">{temp ?? 0}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{feels_like ?? 0}°</span>
          </p>
          <p className="capitalize"> {description}</p>
        </div>
      </section>
      <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
        <WeatherDetailList {...props} />
      </section>
    </Container>
  );
}
