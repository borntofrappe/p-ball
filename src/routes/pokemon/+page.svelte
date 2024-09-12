<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>{data.pokemon.name}</h1>
<img src={data.pokemon.src} alt="" width="46" height="30" />

<h2>Areas</h2>

{#each data.versions as [version, areas]}
  <h3>{version}</h3>
  <ul>
    {#each areas as area}
      <li>
        <p><a href="/area?name={area.name}">{area.name}</a></p>
        <img src={area.src} alt="" width="46" height="30" />
      </li>
    {/each}
  </ul>
{/each}

<h2>Lineage</h2>
<ul>
  {#each data.lineage as connection}
    <li>
      <p><a href="/pokemon?name={connection.name}">{connection.name}</a></p>
      <img src={connection.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>
