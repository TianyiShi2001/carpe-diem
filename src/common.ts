export interface LogEntry {
  task: string;
  datetime: string;
  tz: string;
  duration: number;
  notes?: string;
}

export interface TaskEntry {
  name: string;
  tags?: string[];
  category?: string;
}

export interface LocationEntry {
  name: string;
  coordinates: {
    long: number;
    lat: number;
  };
  address: string;
}
