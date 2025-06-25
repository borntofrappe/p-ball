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
