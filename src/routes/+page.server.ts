import { getEntryOfTheDay, getSearchNames } from "$lib/server/database";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = () => {
  const searchNames = getSearchNames();
  const entry = getEntryOfTheDay();

  return {
    searchNames,
    entry,
  };
};

export const actions = {
  guess: async ({ request }) => {
    const formData = await request.formData();
    return {
      guessed:
        formData.get("entry")?.toString().toLowerCase() ===
        formData.get("guess")?.toString().toLowerCase(),
    };
  },
  reveal: () => {
    return {
      seen: true,
    };
  },
} satisfies Actions;
