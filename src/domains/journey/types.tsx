export interface ReduxStateJourney {
  network: string;
  line: string;
  departure: string;
  missions: string;
  destination: string;
}

export interface Journey {
  network: string;
  line: string;
  departure: string;
  // To check...
  destination?: string;
  missions: string;
}

export interface FullJourney {
  network: string;
  line: string;
  departure: string;
  destination: string;
  missions: string;
}

export interface UserJourney {
  network: string;
  line: string;
  departure: string;
  destination: string;
}

export interface RatpJourney {
  network: string;
  line: string;
  departure: string;
  missions: string;
}
