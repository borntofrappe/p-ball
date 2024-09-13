import { getPokemon, getLocations, getLineage } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  const name = url.searchParams.get("name");
  if (name === null) {
    throw error(400, "There is no <b>name</b> in the search query.");
  }

  const pokemon = getPokemon(name);

  if (pokemon === null) {
    throw error(
      404,
      `There is no <b>Pokémon</b> matching the input name. Be sure to look for one of the <b>151</b> creatures from the <b>first generation</b>.`
    );
  }

  const locations = getLocations(pokemon.name);

  const lineage = getLineage(pokemon.name);

  return {
    pokemon,
    locations,
    lineage,
  };
};
