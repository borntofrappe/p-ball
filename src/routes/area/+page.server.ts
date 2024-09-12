import { getArea, getCatches } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Pokemon } from "$lib/server/types";

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
  const versions = Object.entries(
    catches.reduce((acc, curr) => {
      const { version, ...data } = curr;
      if (!acc[version]) {
        acc[version] = [];
      }

      acc[version].push({ ...data });
      return acc;
    }, {} as Record<string, Pokemon[]>)
  );

  return {
    area,
    versions,
  };
};
