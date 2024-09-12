<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<main>
  <header>
    <h1 class="visually-hidden">{data.pokemon.name}</h1>
    <img src={data.pokemon.src} alt="" width="46" height="30" />
  </header>

  {#if data.locations.filter(([, areas]) => areas.length > 0).length > 0}
    <div>
      <h2 class="visually-hidden">Locations</h2>
      <p>
        You may catch <b>{data.pokemon.name}</b> in the {@html data.locations
          .filter(([, areas]) => areas.length > 0)
          .map(([version]) => `<b>${version}</b>`)
          .join(" and ")} version.
      </p>

      {#each data.locations as [version, areas]}
        <article>
          <h3>{version}</h3>
          <ul>
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
  {/if}

  {#if data.lineage.length > 0}
    <div>
      <h2 class="visually-hidden">Evolutions</h2>
      <p>Remember that <b>{data.pokemon.name}</b> is not alone in the dex.</p>
      <article>
        <h3>EVO</h3>
        <ul>
          {#each data.lineage as connection}
            <li>
              <img src={connection.src} alt="" width="46" height="30" />
              <p>
                <a href="/pokemon?name={connection.name}">{connection.name}</a>
              </p>
            </li>
          {/each}
        </ul>
      </article>
    </div>
  {/if}
</main>
