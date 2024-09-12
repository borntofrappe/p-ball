import { getPokemon, getLocations, getLineage } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  const name = url.searchParams.get("name");
  if (name === null) {
    throw error(400, "Search by name");
  }

  const pokemon = getPokemon(name);

  if (pokemon === null) {
    throw error(404, "Pokémon not found");
  }

  const locations = getLocations(pokemon.name);

  const lineage = getLineage(pokemon.name);

  return {
    pokemon,
    locations,
    lineage,
  };
};
