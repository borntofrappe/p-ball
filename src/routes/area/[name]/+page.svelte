<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>{data.area.name}</h1>
<img src={data.area.src} alt="" width="46" height="30" />

<h2>Catches</h2>
<ul>
  {#each data.catches as pokemon}
    <li>
      <p>{pokemon.name}</p>
      <img src={pokemon.src} alt="" width="46" height="30" />
    </li>
  {/each}
</ul>
