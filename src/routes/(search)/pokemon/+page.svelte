<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();

  let locations = $derived(
    data.locations.filter(([, areas]) => areas.length > 0)
  );
</script>

<svelte:head>
  <title>P-Ball - {data.pokemon.name}</title>
</svelte:head>

{#snippet evo(lineage: Array<{name: string, src: string}>)}
  <article class="panel-data">
    <h3>EVO</h3>
    <ul role="img">
      {#each lineage as connection}
        <li>
          <img src={connection.src} alt="" width="46" height="30" />
          <p>
            <a href="/pokemon?name={connection.name}">{connection.name}</a>
          </p>
        </li>
      {/each}
    </ul>
  </article>
{/snippet}

<div class="flow-l">
  <header class="header-data">
    <h1 class="visually-hidden">{data.pokemon.name}</h1>
    <img src={data.pokemon.src} alt="" width="46" height="30" />
  </header>

  {#if locations.length > 0}
    <h2 class="visually-hidden">Locations</h2>
    <div class="flow-l">
      <p>
        You may catch <b>{data.pokemon.name}</b> in the {@html locations
          .map(([version]) => `<b data-version=${version}>${version}</b>`)
          .join(" and ")} version.
      </p>

      {#each locations as [version, areas]}
        <article class="panel-data" data-version={version}>
          <h3>{version}</h3>
          <ul role="img">
            {#each areas as area}
              <li>
                <img src={area.src} alt="" width="46" height="30" />
                <p><a href="/area?name={area.name}">{area.name}</a></p>
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    {#if data.lineage.length > 0}
      <h2 class="visually-hidden">Evolutions</h2>
      <div class="flow-l">
        <p>
          Don't forget the evolutionary line. You'll want to play a little
          longer to complete the dex.
        </p>
        {@render evo(data.lineage)}
      </div>
    {/if}
  {:else if data.lineage.length > 0}
    <h2 class="visually-hidden">Evolutions</h2>
    <div class="flow-l">
      <p>
        The only way to find <b>{data.pokemon.name}</b> is through evolution.
      </p>
      {@render evo(data.lineage)}
    </div>
  {/if}
</div>
