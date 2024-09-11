<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>{data.pokemon.name}</h1>
<img src={data.pokemon.src} alt="" width="46" height="30" />

<h2>Areas</h2>
<ul>
  {#each data.areas as area}
    <li>
      <p>{area.name}</p>
      <img src={area.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>

<h2>Lineage</h2>
<ul>
  {#each data.lineage as relation}
    <li>
      <p>{relation.name}</p>
      <img src={relation.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>
