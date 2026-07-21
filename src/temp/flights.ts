/* /flights — flight results and the page hero image. */

import { img } from "./image";

export const flightList: {
  id: string;
  airline: string;
  logo: string; // emoji
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: number;
}[] = [
  {
    id: "f1",
    airline: "SkyJet Airways",
    logo: "✈️",
    from: "NYC",
    fromCity: "New York",
    to: "PAR",
    toCity: "Paris",
    depart: "08:30",
    arrive: "21:45",
    duration: "7h 15m",
    stops: "Non-stop",
    price: 540,
  },
  {
    id: "f2",
    airline: "AeroGlobe",
    logo: "🛩️",
    from: "NYC",
    fromCity: "New York",
    to: "PAR",
    toCity: "Paris",
    depart: "13:10",
    arrive: "05:30",
    duration: "9h 20m",
    stops: "1 Stop",
    price: 420,
  },
  {
    id: "f3",
    airline: "Blue Horizon",
    logo: "🛫",
    from: "NYC",
    fromCity: "New York",
    to: "PAR",
    toCity: "Paris",
    depart: "18:45",
    arrive: "08:05",
    duration: "7h 20m",
    stops: "Non-stop",
    price: 610,
  },
  {
    id: "f4",
    airline: "Nomad Air",
    logo: "✈️",
    from: "NYC",
    fromCity: "New York",
    to: "PAR",
    toCity: "Paris",
    depart: "22:00",
    arrive: "13:40",
    duration: "10h 40m",
    stops: "1 Stop",
    price: 385,
  },
  {
    id: "f5",
    airline: "Emerald Fly",
    logo: "🛬",
    from: "NYC",
    fromCity: "New York",
    to: "PAR",
    toCity: "Paris",
    depart: "06:15",
    arrive: "19:00",
    duration: "6h 45m",
    stops: "Non-stop",
    price: 720,
  },
];

export const airplaneImage = img("1436491865332-7a61a109cc05", 900, 500);
