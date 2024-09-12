<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>{data.area.name}</h1>
<img src={data.area.src} alt="" width="46" height="30" />

{#each data.versions as [version, catches]}
  <h3>{version}</h3>
  <ul>
    {#each catches as pokemon}
      <li>
        <p><a href="/pokemon?name={pokemon.name}">{pokemon.name}</a></p>
        <img src={pokemon.src} alt="" width="46" height="30" />
      </li>
    {/each}
  </ul>
{/each}
