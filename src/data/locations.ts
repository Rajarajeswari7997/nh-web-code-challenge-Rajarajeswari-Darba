import { GeoLocation } from '../types';

export const CLINICIANS: readonly GeoLocation[] = [
  {
    name: 'Barb',
    address: '4120 Garfield Ave, Minneapolis, MN 55409',
    lat: 44.928,
    lng: -93.289,
  },
  {
    name: 'Isaac',
    address: '140 104th Ln NW, Blaine, MN 55448',
    lat: 45.161,
    lng: -93.234,
  },
  {
    name: 'Marisol',
    address: '2393 Kalmia Ave, Boulder, CO 80304',
    lat: 40.039,
    lng: -105.265,
  },
  {
    name: 'Mary',
    address: '608 Spruce Dr, Hudson, WI 54016',
    lat: 44.968,
    lng: -92.756,
  },
  {
    name: 'Shawna',
    address: '1727 W Highland Pkwy, St Paul, MN 55116',
    lat: 44.917,
    lng: -93.177,
  },
  {
    name: 'Shelly',
    address: '1232 3rd St, Hudson, WI 54016',
    lat: 44.973,
    lng: -92.756,
  },
  {
    name: 'Tom',
    address: '14173 Flagstone Trail, Apple Valley, MN 55124',
    lat: 44.743,
    lng: -93.198,
  },
] as const;

export const LABS: readonly GeoLocation[] = [
  {
    name: 'Edina Lab',
    address: '6525 France Ave, Edina, MN 55435',
    lat: 44.885,
    lng: -93.328,
  },
  {
    name: 'Medical Arts Lab',
    address: '835 Nicollet Mall, Minneapolis, MN 55402',
    lat: 44.974,
    lng: -93.272,
  },
  {
    name: 'Bloomington Lab',
    address: '2716 E 82nd St, Bloomington, MN 55425',
    lat: 44.855,
    lng: -93.231,
  },
] as const;