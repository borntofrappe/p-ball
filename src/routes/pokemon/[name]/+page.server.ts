import { getPokemon, getLocations, getLineage } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Area } from "$lib/server/types";

export const load: PageServerLoad = ({ params }) => {
  const pokemon = getPokemon(params.name);

  if (pokemon === null) {
    throw error(404, "Pokémon not found");
  }

  const locations = getLocations(pokemon.name);
  const versions = Object.entries(
    locations.reduce((acc, curr) => {
      const { version, ...data } = curr;
      if (!acc[version]) {
        acc[version] = [];
      }

      acc[version].push({ ...data });
      return acc;
    }, {} as Record<string, Area[]>)
  );

  const lineage = getLineage(pokemon.name);

  return {
    pokemon,
    versions,
    lineage,
  };
};
