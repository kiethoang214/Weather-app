export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours(); // Get hours from the given date and time string

  const isDayTime = hours >= 6 && hours < 18; // Consider daytime from 6 AM to 6 PM

  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
export function metersToKilometers(visibilityInMeters: number): string {
  const visibilityInKilometers = visibilityInMeters / 1000;
  return `${visibilityInKilometers.toFixed(0)}km`; // Round to 0 decimal places and add 'km' unit
}
export function convertWindSpeed(speedInMetersPerSecond: number): string {
  const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Conversion from m/s to km/h
  return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}