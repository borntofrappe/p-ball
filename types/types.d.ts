type SearchItem = {
  name: string;
  uri: string;
};

type SearchState = undefined | "search" | "find";

type Entry = {
  no: string;
  name: string;
  category: string;
  height: number;
  weight: number;
  description: string;
  uri: string;
};

type EntryDB = {
  id: string;
  no: string;
  name: string;
  category: string;
  height: number;
  weight: number;
  description: string;
  img: number[];
};

type Area = {
  name: string;
  uri: string;
};

type AreaDB = {
  id: string;
  name: string;
  img: number[];
};

type Version = "Red" | "Blue";

type VersionDB = {
  id: string;
  name: Version;
};

type Catch = {
  name: string;
  uri: string;
};
