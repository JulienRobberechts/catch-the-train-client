export interface ReduxStateJourney {
  network: string;
  line: string;
  departure: string;
  missions: string;
  destination?: string;
}

export interface Journey {
  network: string;
  line: string;
  departure: string;
  // To check...
  destination?: string;
  missions?: string;
}
