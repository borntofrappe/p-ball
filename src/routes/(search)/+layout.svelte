<script lang="ts">
  import svg from "$lib/svg";
  let { children } = $props();
</script>

<div class="layout">
  <nav>
    <a href="/">
      <span class="visually-hidden">P-Ball</span>
      <picture>
        {@html svg["banner"]}
      </picture>
    </a>
  </nav>

  <div>
    {@render children()}
  </div>

  <footer>
    <picture>
      {@html svg["banner"]}
    </picture>
    <p>Made with pure interest by <b>Gabriele Corti</b></p>
  </footer>
</div>
