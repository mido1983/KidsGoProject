export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  price: {
    amount: number;
    currency: string;
    isFree: boolean;
  };
  ageRange: {
    min: number;
    max: number;
  };
  category: string;
  imageUrl?: string;
  organizerName: string;
  languages: string[];
  source: 'GoKids' | 'Kinderland' | 'TimeOut' | 'Meetup' | 'Eventbrite';
}
