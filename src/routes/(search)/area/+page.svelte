<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<main>
  <header>
    <h1 class="visually-hidden">{data.area.name}</h1>
    <img src={data.area.src} alt="" width="46" height="30" />
  </header>
</main>

<div>
  <p>
    You reach <b>{data.area.name}</b> in the {@html data.catches
      .map(([version]) => `<b>${version}</b>`)
      .join(" and ")} version. Here you can find {data.catches.reduce(
      (acc, [, catches]) => acc + catches.length,
      0
    )} <b>Pokémon</b>
  </p>
  {#each data.catches as [version, pokemon]}
    <h2>{version}</h2>
    <ul>
      {#each pokemon as pokemon}
        <li>
          <img src={pokemon.src} alt="" width="46" height="30" />
          <p><a href="/pokemon?name={pokemon.name}">{pokemon.name}</a></p>
        </li>
      {/each}
    </ul>
  {/each}
</div>
