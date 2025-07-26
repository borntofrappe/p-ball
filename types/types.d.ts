type Version = "Red" | "Blue";

type Entry = {
  no: string;
  name: string;
  category: string;
  height: number;
  weight: number;
  description: string;
  uri: string;
};

type Area = {
  name: string;
  uri: string;
};

type EntryLookup = Pick<Entry, "name" | "uri">;
