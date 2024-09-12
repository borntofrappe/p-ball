<script lang="ts">
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

  <div>
    {@render children()}
  </div>

  <footer>
    {@html svg["banner"]}
    <p>Made with pure interest by <b>Gabriele Corti</b></p>
  </footer>
</div>

<style>
  .layout {
    min-block-size: 100svb;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  nav {
    color: var(--color-text);
    background: var(--color-primary);
    padding: var(--space-s) var(--space-s);
    border-block-end: var(--border);
    display: grid;
    grid-template-columns: 1fr minmax(auto, var(--size-wrapper)) 1fr;
  }

  nav > * {
    grid-column: 2;
  }

  nav a {
    text-decoration: none;
  }

  nav > a > :global(svg) {
    display: block;
    max-block-size: var(--size-nav);
    inline-size: auto;
  }

  footer {
    color: var(--color-text);
    background: var(--color-primary);
    text-align: center;
    padding: var(--space-l) var(--space-s);
    border-block: var(--border);
  }

  footer > :global(* + *) {
    margin-block-start: var(--space-s);
  }

  footer > :global(svg) {
    display: block;
    max-block-size: var(--size-footer);
    margin-inline: auto;
  }

  footer > p {
    max-inline-size: 55ch;
    margin-inline: auto;
    font-size: var(--size-step-1);
    font-weight: 700;
    text-wrap: balance;
  }

  footer {
    position: relative;
    border-block-start: var(--border);
    padding-block-start: calc(var(--space-l) + var(--size-ribbon));
  }

  footer::before {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 0;
    inline-size: 100%;
    block-size: var(--size-ribbon);
    background: var(--color-primary);
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 1">\<defs><symbol id="banner-outline" viewBox="-46 -46 92 92" x="-0.5" y="-0.5" width="1" height="1"><path fill="currentColor" d="M 23.5 0 24.5 0 A 21 21 0 0 0 3.5 -21 19 19 0 0 1 22.5 0 Z M 31 0 32.5 0 A 29 29 0 0 0 3.5 -29 26 26 0 0 1 29.5 0 Z M 38.5 0 40.5 0 A 37 37 0 0 0 3.5 -37 33 33 0 0 1 36.5 0 ZM -23.5 0 -24.5 0 A 21 21 0 0 0 -3.5 21 19 19 0 0 1 -22.5 0 Z M -31 0 -32.5 0 A 29 29 0 0 0 -3.5 29 26 26 0 0 1 -29.5 0 Z M -38.5 0 -40.5 0 A 37 37 0 0 0 -3.5 37 33 33 0 0 1 -36.5 0 Z" /><path fill="none" stroke="currentColor" stroke-width="3" d="M -44.5 0 A 44.5 44.5 0 0 1 44.5 0 44.5 44.5 0 0 1 -44.5 0 L -16 0 A 16 16 0 0 0 16 0 A 16 16 0 0 0 -16 0 M -10 0 A 10 10 0 0 0 10 0 A 10 10 0 0 0 -10 0 M 16 0 L 44.5 0" /></symbol><pattern id="pattern" viewBox="-0.5 -0.5 2 1" width="2" height="1" patternUnits="userSpaceOnUse"><g style="color: hsl(0 0% 100%)"><use transform="scale(0.8) rotate(50)" href="%23banner-outline" /><use transform="translate(1 0) scale(-1 1) scale(0.8) rotate(50)" href="%23banner-outline" /></g></pattern></defs><rect fill="url(%23pattern)" width="9" height="1" /></svg>'),
      var(--color-primary);
    background-position: 50% 50%;
    background-repeat: repeat-x;
  }
</style>
