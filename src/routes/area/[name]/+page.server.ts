import { getAreaByName, getCatchesByAreaName } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const area = getAreaByName(params.name);

  if (area === null) {
    throw error(404, "Area not found");
  }

  const catches = getCatchesByAreaName(area.name);

  return {
    area,
    catches,
  };
};
