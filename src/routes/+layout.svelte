<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";
  import svg from "$lib/svg";
  let { children } = $props();
</script>

<div class="layout">
  {#if $page.url.pathname === "/"}
    <header>
      <p class="visually-hidden">P-ball</p>
      {@html svg["banner"]}
      <p>Pushing you to play <b>Pokémon Pinball</b> and collect them all</p>
    </header>
  {:else}
    <nav>
      <a href="/">
        <span class="visually-hidden">P-Ball</span>
        {@html svg["banner"]}
      </a>
    </nav>
  {/if}

  <main>
    {@render children()}
  </main>

  <footer>
    {@html svg["banner"]}
    <p>Made with pure interest by <b>Gabriele Corti</b></p>
  </footer>
</div>
