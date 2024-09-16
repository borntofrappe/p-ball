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
    const name = formData.get("catch-of-the-day")?.toString().toLowerCase();

    if (name && name === formData.get("catch")?.toString().toLowerCase()) {
      return {
        caught: true,
        message: `You caught ${name[0].toUpperCase()}${name.slice(1)}!`,
      };
    } else {
      return {
        caught: false,
        message: "Ball saved - Try again",
      };
    }
  },
  see: () => {
    return {
      seen: true,
    };
  },
} satisfies Actions;
