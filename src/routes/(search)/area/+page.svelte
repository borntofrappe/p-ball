<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<div class="flow-l">
  <header class="header-data">
    <h1 class="visually-hidden">{data.area.name}</h1>
    <img src={data.area.src} alt="" width="46" height="30" />
  </header>

  <div class="flow-l">
    <p>
      You reach <b>{data.area.name}</b> in the {@html data.catches
        .filter(([, pokemon]) => pokemon.length > 0)
        .map(([version]) => `<b data-version="${version}">${version}</b>`)
        .join(" and ")} version. Here you can find {data.catches.reduce(
        (acc, [, catches]) => acc + catches.length,
        0
      )} <b>Pokémon</b>.
    </p>
    {#each data.catches.filter(([, pokemon]) => pokemon.length > 0) as [version, pokemon]}
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
