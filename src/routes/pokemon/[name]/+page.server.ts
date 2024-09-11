import {
  getCatchesByEntryName,
  getLineageByEntryName,
  getPokemonByName,
} from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const pokemon = getPokemonByName(params.name);

  if (pokemon === null) {
    throw error(404, "Pokémon not found");
  }

  const areas = getCatchesByEntryName(pokemon.name);
  const lineage = getLineageByEntryName(pokemon.name);

  return {
    pokemon,
    areas,
    lineage,
  };
};
