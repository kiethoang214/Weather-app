"use client";
import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import WeatherIcon from "@/components/WeatherIcon";
import {
  convertWindSpeed,
  getDayOrNightIcon,
  metersToKilometers,
} from "@/utils";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import WeatherDetailList from "@/components/WeatherDetailList";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import SkeletonViewer from "@/components/SkeletonViewer";
import { usePlaceStore } from "./store";
import { useEffect } from "react";

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  "3h": number;
}

export interface Sys {
  pod: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export default function Home() {
  // https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=858432009900a51c7a94715f396ed2f0&cnt=56
  const isLoading = useIsFetching() > 0;
  const place = usePlaceStore((state) => state.place);

  const { error, data, refetch } = useQuery({
    queryKey: ["weather", place],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=858432009900a51c7a94715f396ed2f0&cnt=56&units=metric`
      );
      return data;
    },
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);
  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: ForecastItem) =>
          new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: ForecastItem) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  if (isLoading) {
    console.log("Loading data...");
    return (
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen p-4">
        <SkeletonViewer height={40} width={200} /> {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <SkeletonViewer height={100} width={100} /> {/* Weather icon */}
            <div className="flex flex-col gap-2">
              <SkeletonViewer height={30} width={120} /> {/* Temp */}
              <SkeletonViewer height={20} width={100} /> {/* Feels like */}
              <SkeletonViewer height={20} width={80} /> {/* Min/Max */}
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonViewer key={i} height={100} width={60} />
            ))}
          </div>
          <SkeletonViewer height={200} /> {/* Forecast section placeholder */}
          <SkeletonViewer height={200} /> {/* Forecast section placeholder */}
        </div>
      </div>
    );
  }
  if (error)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <div className="text-red-400">{error.message}</div>
      </div>
    );
  if (firstData) {
    return (
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <NavBar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
          <section>
            <div className="space-y-2">
              <div className="flex gap-1 text-2xl items-end">
                <div>{moment(firstData?.dt_txt).format("dddd")}</div>
                <div className="text-lg">
                  ({moment(firstData?.dt_txt).format("DD.MM.yyyy")})
                </div>
              </div>
              <Container className="gap-10 px-6 items-center">
                {/* temprature */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl">
                    {firstData?.main.temp.toFixed(0) ?? 0}°C
                  </span>
                  <div className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels like</span>
                    <span>{firstData?.main.feels_like.toFixed(0) ?? 0}°C</span>
                  </div>
                  <div className="text-xs space-x-2">
                    <span>
                      {firstData?.main.temp_min.toFixed(0) ?? 0}
                      °↓{" "}
                    </span>
                    <span>
                      {" "}
                      {firstData?.main.temp_max.toFixed(0) ?? 0}
                      °↑
                    </span>
                  </div>
                </div>
                {/* time  and weather  icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d: ForecastItem, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                    >
                      <div className="whitespace-nowrap">
                        {moment(d?.dt_txt).format("h:mm a")}
                      </div>

                      {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          d.weather[0].icon,
                          d.dt_txt
                        )}
                      />
                      <div> {d?.main.temp.toFixed(0) ?? 0} °C</div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex gap-4">
              <Container className="w-fit justify-center items-center flex-col px-4 ">
                <div className="capitalize text-center">
                  {firstData?.weather[0].description}{" "}
                </div>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    firstData?.weather[0].icon ?? "",
                    firstData?.dt_txt ?? ""
                  )}
                />
              </Container>
              <Container className="bg-yellow-300/80 px-4 gap-4 justify-around overflow-x-auto">
                <WeatherDetailList
                  visibility={metersToKilometers(firstData?.visibility)}
                  airPressure={`${firstData?.main.pressure} hPa`}
                  humidity={`${firstData?.main.humidity}%`}
                  sunrise={moment(data?.city.sunrise).format("H:mm")}
                  sunset={moment(data?.city.sunset).format("H:mm")}
                  windSpeed={convertWindSpeed(firstData?.wind.speed)}
                />
              </Container>
            </div>
          </section>
          {/* 7 day forecast data */}
          <section className="flex w-full flex-col gap-4  ">
            <p className="text-2xl">Forcast (7 days)</p>
            {firstDataForEachDate.map((d: ForecastItem, i: number) => (
              <ForecastWeatherDetail
                key={i}
                description={d?.weather[0].description}
                weatherIcon={d?.weather[0].icon}
                date={moment(d?.dt_txt).format("DD.MM.yyyy")}
                day={moment(d?.dt_txt).format("dddd")}
                feels_like={d?.main.feels_like ?? 0}
                temp={Number(d?.main.temp.toFixed(0)) ?? 0}
                temp_max={Number(d?.main.temp_max.toFixed(0)) ?? 0}
                temp_min={Number(d?.main.temp_min.toFixed(0)) ?? 0}
                airPressure={`${d?.main.pressure} hPa `}
                humidity={`${d?.main.humidity}% `}
                sunrise={moment(data?.city.sunrise).format("H:mm")}
                sunset={moment(data?.city.sunset).format("H:mm")}
                visibility={`${metersToKilometers(d?.visibility)} `}
                windSpeed={`${convertWindSpeed(d?.wind.speed)} `}
              />
            ))}
          </section>
        </main>
      </div>
    );
  }
}
