import { getArea, getCatches } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  const name = url.searchParams.get("name");
  if (name === null) {
    throw error(400, "Search by name");
  }

  const area = getArea(name);

  if (area === null) {
    throw error(404, "Area not found");
  }

  const catches = getCatches(area.name);

  return {
    area,
    catches,
  };
};
