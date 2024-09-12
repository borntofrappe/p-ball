<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<main>
  <header>
    <h1 class="visually-hidden">{data.pokemon.name}</h1>
    <img src={data.pokemon.src} alt="" width="46" height="30" />
  </header>

  {#if data.locations.filter(([, areas]) => areas.length > 0).length > 0}
    <div>
      <h2 class="visually-hidden">Locations</h2>
      <p>
        You may catch <b>{data.pokemon.name}</b> in the {@html data.locations
          .filter(([, areas]) => areas.length > 0)
          .map(([version]) => `<b data-version=${version}>${version}</b>`)
          .join(" and ")} version.
      </p>

      {#each data.locations as [version, areas]}
        <article data-version={version}>
          <h3>{version}</h3>
          <ul role="img">
            {#each areas as area}
              <li>
                <img src={area.src} alt="" width="46" height="30" />
                <p><a href="/area?name={area.name}">{area.name}</a></p>
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>
  {/if}

  {#if data.lineage.length > 0}
    <div>
      <h2 class="visually-hidden">Evolutions</h2>
      <p>Remember that <b>{data.pokemon.name}</b> is not alone in the dex.</p>
      <article>
        <h3>EVO</h3>
        <ul role="img">
          {#each data.lineage as connection}
            <li>
              <img src={connection.src} alt="" width="46" height="30" />
              <p>
                <a href="/pokemon?name={connection.name}">{connection.name}</a>
              </p>
            </li>
          {/each}
        </ul>
      </article>
    </div>
  {/if}
</main>

<style>
  main {
    max-inline-size: var(--size-wrapper);
    margin-inline: auto;
    padding: var(--space-xl) var(--space-s);
  }

  main > * + * {
    margin-block-start: var(--space-s);
  }

  main > div:not(:first-of-type) {
    margin-block-start: var(--space-xl);
  }

  img {
    display: block;
    inline-size: 92px;
    block-size: 60px;
    inline-size: calc(var(--img-scale, 2) * 46px);
    block-size: calc(var(--img-scale, 2) * 30px);
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  header {
    --img-scale: 5;
  }

  header > img {
    display: block;
    margin-inline: auto;
  }

  div > * + * {
    margin-block-start: var(--gap, var(--space-m));
  }

  div > article {
    --gap: var(--space-l);
  }

  article {
    --color-text: #3f1f17;
    --color-primary: #f9b422;
    --color-background: #f5e99d;
    --border: 0.2rem solid var(--color-primary);
    --color-selection: #e3d9ab;
  }

  article ::selection {
    background: var(--color-selection);
  }

  article[data-version="red" i] {
    --color-text: #3f1f17;
    --color-background: #f5e99d;
    --color-primary: #e9270d;
    --color-text-label: #0e0706;
    --color-selection: #f8c281;
  }

  article[data-version="blue" i] {
    --color-text: #3f1f17;
    --color-background: #f5e99d;
    --color-primary: #2c1d5c;
    --color-text-label: #f0d5f0;
    --color-selection: #d5d2ad;
  }

  article {
    color: var(--color-text);
    background: var(--color-background);
    padding: var(--space-xl) var(--space-l);
    border: 3px solid var(--color-primary);
  }

  article ul {
    list-style: none;
    display: flex;
    gap: var(--space-m);
    justify-content: center;
    flex-wrap: wrap;
  }

  ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2xs);
    text-align: center;
  }

  ul li img {
    display: block;
    margin-inline: auto;
  }

  ul li p {
    max-inline-size: 12ch;
  }

  article {
    position: relative;
  }

  article :is(h2, h3) {
    font-size: var(--size-step-1);
    position: absolute;
    inset-inline-start: 5%;
    inset-block-start: 0;
    translate: 0 -50%;
    color: var(--color-text-label, var(--color-text));
    background: var(--color-primary);
    padding: var(--space-3xs) var(--space-2xs);
    line-height: 1;
  }
</style>
