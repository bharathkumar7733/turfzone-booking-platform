export interface SportData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  availableCount: number;
}

export const SPORTS_DATA: SportData[] = [
  {
    id: 'cricket',
    name: 'Cricket',
    emoji: '🏏',
    description: 'Professional cricket grounds with premium facilities',
    availableCount: 15
  },
  {
    id: 'football',
    name: 'Football',
    emoji: '⚽',
    description: 'FIFA standard football pitches for the perfect game',
    availableCount: 12
  },
  {
    id: 'badminton',
    name: 'Badminton',
    emoji: '🏸',
    description: 'Air-conditioned courts with professional lighting',
    availableCount: 20
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    emoji: '🎾',
    description: 'Modern pickleball courts with quality equipment',
    availableCount: 8
  },
  {
    id: 'snooker',
    name: 'Snooker',
    emoji: '🎱',
    description: 'Professional snooker tables in premium lounges',
    availableCount: 10
  }
];

export const TIME_SLOTS = [
  { id: '6-8', label: '6:00 - 8:00 AM', available: true },
  { id: '8-10', label: '8:00 - 10:00 AM', available: true },
  { id: '10-12', label: '10:00 - 12:00 PM', available: false },
  { id: '12-14', label: '12:00 - 2:00 PM', available: true },
  { id: '14-16', label: '2:00 - 4:00 PM', available: true },
  { id: '16-18', label: '4:00 - 6:00 PM', available: true },
  { id: '18-20', label: '6:00 - 8:00 PM', available: true },
  { id: '20-22', label: '8:00 - 10:00 PM', available: true }
];
