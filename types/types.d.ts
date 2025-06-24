type SearchItem = {
  name: string;
  uri: string;
};

type SearchState = undefined | "search" | "find";

type Entry = {
  id: string;
  name: string;
  no: string;
  description: string;
  width: number;
  height: number;
  img: number[];
};
