<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>{data.pokemon.name}</h1>
<img src={data.pokemon.src} alt="" width="46" height="30" />

<h2>Areas</h2>
<ul>
  {#each data.locations as location}
    <li>
      <p><a href="/area/{location.name}">{location.name}</a></p>
      <img src={location.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>

<h2>Lineage</h2>
<ul>
  {#each data.lineage as connection}
    <li>
      <p><a href="/pokemon/{connection.name}">{connection.name}</a></p>
      <img src={connection.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>
