export type SearchParam = "pokemon" | "area";

export type Version = "Red" | "Blue";

export type Entry = {
  no: string;
  name: string;
  category: string;
  height: number;
  weight: number;
  description: string;
  src: string;
};

export type Pokemon = {
  name: string;
  src: string;
};

export type Area = {
  name: string;
  src: string;
};

export type Catch = {
  name: string;
  version: Version;
  src: string;
};

export type Location = {
  name: string;
  version: Version;
  src: string;
};
