<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<h1>p-ball</h1>

<h2>{@html data.entry.name}</h2>
<p>{data.entry.category}</p>
<img src={data.entry.src} alt="" width="46" height="30" />
<p>{data.entry.description}</p>
