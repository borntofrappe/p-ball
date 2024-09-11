import {
  getPokemon,
  getLocations,
  getLineage,
} from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const pokemon = getPokemon(params.name);

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
