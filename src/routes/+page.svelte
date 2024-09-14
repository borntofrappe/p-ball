<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<div class="flow-xl">
  <section class="flow-m">
    <h2 class="heading-ball">Search</h2>
    <p>
      Need some help or some inspiration? You just need a
      <b>name</b>.
    </p>
    {#each data.searchNames as [param, values]}
      <form method="GET" action="/{param}">
        <h3 id="heading-{param}">{param}</h3>
        <div>
          <label>
            <input
              aria-labelledby="heading-{param}"
              list="names-{param}"
              type="text"
              name="name"
              required
            />
            <datalist id="names-{param}">
              {#each values as value}
                <option {value}></option>
              {/each}
            </datalist>
          </label>
          <button>
            <span class="visually-hidden">Search</span>
            <!-- prettier-ignore -->
            <svg width="1em" height="1em" viewBox="-4 -4 8 8">
            <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <circle fill="none" cx="-0.75" cy="-0.75" r="2.75" />
              <path d="M 1.6 1.4 C 3.5 2.75 3.5 2.75 3.15 3.15 2.75 3.5 2.75 3.5 1.4 1.6 Z" />
            </g>
          </svg>
          </button>
        </div>
      </form>
    {/each}
  </section>

  <section class="flow-m">
    <h2 class="heading-ball">Guess</h2>
    <p>Want to play a little longer? Try the <b>catch of the day</b>.</p>

    <article>
      <h3>{data.entry.name}</h3>
      <picture>
        <img width="46" height="30" src={data.entry.src} alt="" />
      </picture>
      <p>NO. {data.entry.no}</p>
      <p>{data.entry.category}</p>
      <dl>
        <dt>
          <span aria-hidden="true">H</span>
          <span class="visually-hidden">Height</span>
        </dt>
        <dd>{data.entry.height}m</dd>
        <dt>
          <span aria-hidden="true">W</span>
          <span class="visually-hidden">Weight</span>
        </dt>
        <dd>{data.entry.weight}kg</dd>
      </dl>
      <p>
        {data.entry.description}
      </p>
    </article>
  </section>
</div>

<style>
  h2 {
    font-size: var(--size-step-3);
  }

  form {
    --heading-color: #e7dfc8;
    --heading-background: #150a06;
    --heading-selection: #8b5546;
    --button-color: var(--white);
    --button-background: var(--color-primary);
    --button-size: var(--space-l);
    --button-padding: var(--space-2xs);
    --border-radius: var(--space-3xs);
    --border: 0.5rem solid var(--green);
    --_green: var(--green);
    --_green: oklch(from var(--green) l calc(c - 0.04) h);
    --input-color: #150a06;
    --input-background: #ffffff;
    --input-border: 0.1rem solid var(--_green);
    --input-padding: var(--space-2xs) var(--space-s);
    --focus-outline: 0.2rem solid var(--_green);

    background: oklch(from var(--color-background) calc(l - 0.01) c h);
    max-inline-size: var(--size-wrapper-s);
    margin-inline: auto;
    padding: var(--space-l) var(--space-m);
    border-radius: 1rem;
    border: var(--border);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    align-items: center;
  }

  form h3 {
    display: inline-block;
    font-size: var(--size-step-1);
    text-transform: capitalize;
    letter-spacing: 0.5px;
    color: var(--heading-color);
    background: var(--heading-background);
    padding: var(--space-2xs) var(--space-l);
    border-radius: 1e5px;
  }

  h3::selection {
    background: var(--heading-selection);
  }

  form div {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }

  form button {
    inline-size: var(--button-size);
    block-size: var(--button-size);
    padding: var(--button-padding);
    border: none;
    border-radius: var(--border-radius);
    color: var(--white);
    background: var(--color-primary);
  }

  form button > svg {
    display: block;
    block-size: 100%;
    inline-size: 100%;
  }

  form input {
    display: block;
    color: var(--input-color);
    background: var(--input-background);
    font-family: "Comic Neue";
    font-weight: 700;
    font-size: var(--size-step-0);
    padding: var(--input-padding);
    border: var(--input-border);
    border-radius: var(--border-radius);
  }

  button:focus-visible,
  form input:focus {
    outline: var(--focus-outline);
  }

  article {
    --entry-color: var(--white);
    --entry-background: var(--black);
    --entry-panel-color: var(--black);
    --entry-panel-background: var(--white);
    --img-scale: 2.8;
    --entry-size: 36ch;

    font-size: clamp(1.4238rem, 1.3697rem + 0.2704vw, 1.6233rem);
    font-family: PixelEntry, monospace;
    max-inline-size: var(--entry-size);
    margin-inline: auto;
    inline-size: 100%;
    color: var(--entry-color);
    background: var(--entry-background);
    padding: var(--space-s);
    display: grid;
    grid-template-areas: "no ." "image name" "image category" "image stats" "desc desc";
    grid-template-columns: auto minmax(auto, 1fr);
    gap: 0.5ex 1ch;
  }

  article ::selection {
    background: oklch(from var(--entry-background) calc(l + 0.4) c h);
  }

  article h3 {
    grid-area: name;
    font-size: 1.25em;
    text-transform: uppercase;
    line-height: 1;
  }

  article picture {
    grid-area: image;
    align-self: center;
    background: var(--entry-panel-background);
  }

  article p:nth-of-type(1) {
    grid-area: no;
    font-size: 1.1em;
    letter-spacing: 0.1ch;
    line-height: 1;
  }

  article p:nth-of-type(2) {
    grid-area: category;
    font-size: 1.25em;
    text-transform: uppercase;
    line-height: 1;
  }

  article p:nth-of-type(3) {
    grid-area: desc;
    max-inline-size: var(--size-wrapper-s);
    margin-block-start: 0.9ex;
    font-size: 1.2em;
    color: var(--entry-panel-color);
    background: var(--entry-panel-background);
    padding: var(--space-xs);
    text-wrap: pretty;
    line-height: 1.2;
  }

  article p:nth-of-type(3)::selection {
    background: oklch(from var(--entry-panel-background) calc(l - 0.12) c h);
  }

  article dl {
    grid-area: stats;
    letter-spacing: 1px;
  }

  article dl {
    display: grid;
    grid-template-columns: auto minmax(auto, 1fr) auto auto;
    gap: 0 1ch;
  }
</style>
