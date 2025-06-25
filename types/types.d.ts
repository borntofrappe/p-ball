type SearchItem = {
  name: string;
  uri: string;
};

type SearchState = undefined | "search" | "find";

type Entry = {
  name: string;
  no: string;
  description: string;
  weight: number;
  height: number;
  uri: string;
};

type EntryDB = {
  id: string;
  name: string;
  no: string;
  description: string;
  weight: number;
  height: number;
  img: number[];
};
