<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>p-ball</h1>

<h2>Search</h2>

{#each data.searchNames as [param, values]}
  <form method="GET" action="/{param}">
    <h3>{param}</h3>
    <label>
      <input list="names-{param}" type="text" name="name" />
      <datalist id="names-{param}">
        {#each values as value}
          <option {value}></option>
        {/each}
      </datalist>
    </label>
    <button>Search</button>
  </form>
{/each}

<h2>{@html data.entry.name}</h2>
<p>{data.entry.category}</p>
<img src={data.entry.src} alt="" width="46" height="30" />
<p>{data.entry.description}</p>
