import { getArea, getCatches } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const area = getArea(params.name);

  if (area === null) {
    throw error(404, "Area not found");
  }

  const catches = getCatches(area.name);

  return {
    area,
    catches,
  };
};
