<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();

  let catches = $derived(
    data.catches.filter(([, pokemon]) => pokemon.length > 0)
  );

  let distinctPokemon = $derived(
    new Set(
      catches.reduce(
        (acc, [, pokemon]) => [
          ...acc,
          ...pokemon.reduce((a, c) => [...a, c.name], [] as string[]),
        ],
        [] as string[]
      )
    ).size
  );
</script>

<svelte:head>
  <title>P-Ball - {data.area.name}</title>
</svelte:head>

<div class="flow-l">
  <header class="header-data">
    <h1 class="visually-hidden">{data.area.name}</h1>
    <img src={data.area.src} alt="" width="46" height="30" />
  </header>

  <div class="flow-l">
    <p>
      You reach <b>{data.area.name}</b> in the {@html catches
        .map(([version]) => `<b data-version="${version}">${version}</b>`)
        .join(" and ")} version. Here you can find {distinctPokemon} distinct
      <b>Pokémon</b>.
    </p>
    {#each catches as [version, pokemon]}
      <article class="panel-data" data-version={version}>
        <h2>{version}</h2>
        <ul>
          {#each pokemon as pokemon}
            <li>
              <img src={pokemon.src} alt="" width="46" height="30" />
              <p>
                <a href="/pokemon?name={pokemon.name}">{pokemon.name}</a>
              </p>
            </li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>
</div>
