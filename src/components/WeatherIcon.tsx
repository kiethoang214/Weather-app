import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function WeatherIcon({
  iconName,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement> & { iconName: string }) {
  return (
    <div
      title={iconName}
      {...rest}
      className={cn("relative h-20 w-20", className)}
    >
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
}
