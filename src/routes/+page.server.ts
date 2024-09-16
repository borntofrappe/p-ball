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
    const formData = await request.formData();
    return {
      caught:
        formData.get("catch-of-the-day")?.toString().toLowerCase() ===
        formData.get("catch")?.toString().toLowerCase(),
    };
  },
  see: () => {
    return {
      seen: true,
    };
  },
} satisfies Actions;
