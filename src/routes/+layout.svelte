<script lang="ts">
  import '../app.css'
  import svg from "$lib/svg";
  let { children } = $props();
</script>

<div class="layout">
  <nav>
    <a href="/">
      <span class="visually-hidden">P-Ball</span>
      {@html svg["banner"]}
    </a>
  </nav>

  <main>
    {@render children()}
  </main>

  <footer>
    {@html svg["banner"]}
    <p>Made with pure interest by <b>Gabriele Corti</b></p>
  </footer>
</div>