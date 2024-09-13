import { getArea, getCatches } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  const name = url.searchParams.get("name");
  if (name === null) {
    throw error(400, "There is no <b>name</b> in the search query.");
  }

  const area = getArea(name);

  if (area === null) {
    throw error(
      404,
      `There is no <b>area</b> matching the input name. If you have an old-timey map try one of the locations found in <b>1999 Kanto</b>.`
    );
  }

  const catches = getCatches(area.name);

  return {
    area,
    catches,
  };
};
