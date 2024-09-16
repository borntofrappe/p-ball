import { getEntryOfTheDay, getSearchNames } from "$lib/server/database";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = () => {
  const searchNames = getSearchNames();
  const entryOfTheDay = getEntryOfTheDay();

  return {
    searchNames,
    entryOfTheDay,
  };
};

export const actions = {
  catch: async ({ request }) => {
    return {
      name: (await request.formData()).get("name")?.toString(),
    };
  },
  see: () => {
    return {
      seen: true,
    };
  },
} satisfies Actions;
