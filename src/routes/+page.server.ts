import { getEntryOfTheDay, getSearchNames } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const searchNames = getSearchNames();
  const entry = getEntryOfTheDay();

  return {
    searchNames,
    entry,
  };
};
