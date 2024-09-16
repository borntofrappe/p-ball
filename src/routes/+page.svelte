<script lang="ts">
  import type { PageData } from "./$types";
  import type { Entry } from "$lib/server/types";
  import { enhance } from "$app/forms";

  let { data, form } = $props();

  const { height, weight, description } = data.entryOfTheDay;
  const entry: Entry = $state({
    no: " ",
    name: " ",
    category: " ",
    height: height,
    weight: weight,
    description: description,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAeCAMAAABkHdyoAAAASFBMVEWoqKj4+vj6+Pj4+fj4+Pv5+Pj4+Pr4+Pn4+Piqqqqoq6ipqqmoqqqoqqirqKipqaiqqKqoqaqqqKioqaipqKmpqKioqKqoqKkc5p6VAAABI0lEQVR42qWUjVbDIAyFr8VtqYo6YuD931Sh/KSpdMfjd3bWQG+TNCEFGHs8DkT8Ce1E8JBwFptBBS3m/BvSVIN4D1BHBWfssolf2LgSuWs26OYcPcqwObV2YsTh/a1sFQU629Lwruyn/W0pet9qz+pOWSn1Z/MvOHL/LbbULdt46amqnoy9CUQL2NRkyz7AJxg4S+orrCuRcf/Ra1r/qLP+kK+OMpMuUWFRcjLykZH0sJNkYA6PJyXRZgkdBGIiEMUxPrIdXJt65FSfiNRrkw6nJuHIhdrIhBw6ZPkWqO7btj7b5y+Qs7FbRk8SHNHZWEe24+ExgYeGhiHZR0td7Ll8abqliG3KehkZob+hoxs0upYcMCNEf9QH4FV9DLlYd/ybb9YCDv4mNKpOAAAAAElFTkSuQmCC",
  });

  $effect(() => {
    if (
      form?.name &&
      form.name.toLowerCase() === data.entryOfTheDay.name.toLowerCase()
    ) {
      const { no, name, category, src } = data.entryOfTheDay;
      entry.no = no;
      entry.name = name;
      entry.category = category;
      entry.src = src;
    }
  });

  $effect(() => {
    if (form?.seen) {
      entry.src = data.entryOfTheDay.src;
    }
  });
</script>

<div class="flow-xl">
  <section class="flow-m">
    <h2 class="heading-ball">Search</h2>
    <p>
      Need some help or some inspiration? You just need a
      <b>name</b>.
    </p>
    {#each data.searchNames as [param, values]}
      <form class="search" method="GET" action="/{param}">
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
      <h3>{entry.name}</h3>
      <picture>
        <img width="46" height="30" src={entry.src} alt={entry.name} />
      </picture>
      <p>NO. {entry.no}</p>
      <p>{entry.category}</p>
      <dl>
        <dt>
          <span aria-hidden="true">H</span>
          <span class="visually-hidden">Height</span>
        </dt>
        <dd>{entry.height}m</dd>
        <dt>
          <span aria-hidden="true">W</span>
          <span class="visually-hidden">Weight</span>
        </dt>
        <dd>{entry.weight}kg</dd>
      </dl>
      <p>
        {entry.description}
      </p>
      <output class:animate={data.entryOfTheDay.name === entry.name}>
        {#if data.entryOfTheDay.name === entry.name}
          <span>You caught {entry.name}</span>
          <span>Jackpot!</span>
        {:else if form?.name}
          <span>Ball saved - Try again</span>
        {/if}
      </output>
    </article>

    <form use:enhance class="catch" method="POST" action="?/catch">
      <label>
        <span class="visually-hidden">Who's that entry?</span>
        <input
          disabled={data.entryOfTheDay.name === entry.name}
          name="name"
          type="text"
          minlength="3"
          placeholder="???"
          required
        />
      </label>
      <button disabled={data.entryOfTheDay.name === entry.name}>Catch</button>
    </form>

    <div class="line-height-body" aria-hidden="true">
      P.S. If you can't quite guess you can always
      <form use:enhance class="see" method="POST" action="?/see">
        <button disabled={data.entryOfTheDay.src === entry.src}
          >take a peek</button
        >
      </form>
      at the shadows.
    </div>
  </section>
</div>

<style>
  h2 {
    font-size: var(--size-step-3);
  }

  form.search {
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

  form.search h3 {
    display: inline-block;
    font-size: var(--size-step-1);
    text-transform: capitalize;
    letter-spacing: 0.5px;
    color: var(--heading-color);
    background: var(--heading-background);
    padding: var(--space-2xs) var(--space-l);
    border-radius: 1e5px;
  }

  form.search h3::selection {
    background: var(--heading-selection);
  }

  form.search div {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }

  form.search button {
    inline-size: var(--button-size);
    block-size: var(--button-size);
    padding: var(--button-padding);
    border: none;
    border-radius: var(--border-radius);
    color: var(--white);
    background: var(--color-primary);
  }

  form.search button > svg {
    display: block;
    block-size: 100%;
    inline-size: 100%;
  }

  form.search input {
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

  form.search button:focus-visible,
  form.search input:focus {
    outline: var(--focus-outline);
  }

  article {
    --entry-color: var(--white);
    --entry-background: var(--black);
    --entry-panel-color: var(--black);
    --entry-panel-background: var(--white);
    --img-scale: 2.8;
    --entry-size: 36ch;
    white-space: preserve;

    font-size: clamp(1.4238rem, 1.3697rem + 0.2704vw, 1.6233rem);
    font-family: PixelEntry, monospace;
    max-inline-size: var(--entry-size);
    margin-inline: auto;
    inline-size: 100%;
    color: var(--entry-color);
    background: var(--entry-background);
    padding: var(--space-s);
    padding-block-end: var(--space-3xs);
    display: grid;
    grid-template-areas: "no ." "image name" "image category" "image stats" "desc desc" "output output";
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

  article output {
    grid-area: output;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
  }

  article output::before,
  article output::after {
    content: " ";
  }

  article output.animate {
    --duration: 10s;
    --steps: 100;
    display: block;
    animation: slide-in-out var(--duration) steps(var(--steps));
    position: relative;
  }

  article output.animate > span:nth-child(1) {
    animation: hide 0.1s var(--duration) step-start forwards;
  }

  article output.animate > span:nth-child(2) {
    animation: show 0.1s var(--duration) step-start forwards;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
  }

  @keyframes slide-in-out {
    0% {
      translate: 100% 0%;
    }
    30%,
    70% {
      translate: 0% 0%;
    }
    100% {
      translate: -100% 0%;
    }
  }

  @keyframes hide {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes show {
    to {
      opacity: 1;
      visibility: visible;
    }
  }

  article
    picture
    img[alt=" "]:not(
      [src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAeCAMAAABkHdyoAAAASFBMVEWoqKj4+vj6+Pj4+fj4+Pv5+Pj4+Pr4+Pn4+Piqqqqoq6ipqqmoqqqoqqirqKipqaiqqKqoqaqqqKioqaipqKmpqKioqKqoqKkc5p6VAAABI0lEQVR42qWUjVbDIAyFr8VtqYo6YuD931Sh/KSpdMfjd3bWQG+TNCEFGHs8DkT8Ce1E8JBwFptBBS3m/BvSVIN4D1BHBWfssolf2LgSuWs26OYcPcqwObV2YsTh/a1sFQU629Lwruyn/W0pet9qz+pOWSn1Z/MvOHL/LbbULdt46amqnoy9CUQL2NRkyz7AJxg4S+orrCuRcf/Ra1r/qLP+kK+OMpMuUWFRcjLykZH0sJNkYA6PJyXRZgkdBGIiEMUxPrIdXJt65FSfiNRrkw6nJuHIhdrIhBw6ZPkWqO7btj7b5y+Qs7FbRk8SHNHZWEe24+ExgYeGhiHZR0td7Ll8abqliG3KehkZob+hoxs0upYcMCNEf9QH4FV9DLlYd/ybb9YCDv4mNKpOAAAAAElFTkSuQmCC"]
    ) {
    filter: brightness(0);
  }

  form.catch {
    --button-color: #1d82a5;
    --button-background: #ffffff;
    --button-outline: #1d82a5;
    --button-color-disabled: #ffffff;
    --input-color: #000000;
    --input-background: none;

    font-size: var(--size-step-);
    padding: var(--space-s) var(--space-xl);
    max-inline-size: max-content;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-m);
    position: relative;
    z-index: 0;
  }

  form.catch::before,
  form.catch::after {
    content: url('data:image/svg+xml,<svg style="--_fill: white; --_stroke: black;" xmlns="http://www.w3.org/2000/svg" viewBox="-4.5 -4.4 23 8.8"><g fill="var(--_fill, none)" stroke="var(--_stroke, currentColor)" stroke-linecap="round" stroke-linejoin="round"><path d="M 0 -3.75 A 3.75 3.75 0 0 0 0 3.75 C 8 4 18 2.5 18 0 C 18 -2 8 -4 0 -3.75 Z M 0 -0.5 A 0.5 0.5 0 0 0 0 0.5 0.5 0.5 0 0 0 0 -0.5 Z" /></g></svg>');
    inline-size: calc(var(--space-xl) * 1);
    position: absolute;
    inset-block-end: calc(var(--space-s) + 0.5em);
    transform: rotate(10deg);
    transition: transform 0.2s cubic-bezier(0.34, 2, 0.64, 1);
    z-index: -1;
  }

  form.catch::before {
    inset-inline-start: 0;
  }

  form.catch::after {
    inset-inline-end: 0;
    scale: -1 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    form.catch:has(input:valid)::before,
    form.catch:has(input:valid)::after {
      transform: rotate(35deg);
    }
  }

  form.catch input {
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
    text-align: center;
    color: var(--input-color);
    background: var(--input-background);
    max-inline-size: 12ch;
    letter-spacing: 0.05ch;
    padding: 0.5ex 1ch;
    border: none;
    box-shadow: 0 1px currentColor;
  }

  form.catch input:focus {
    outline: none;
    box-shadow: 0 2px currentColor;
  }

  form.catch input::placeholder {
    letter-spacing: 0.2ch;
  }

  form.catch button {
    font-size: inherit;
    font-family: Kanit, sans-serif;
    font-weight: 700;
    color: var(--button-color);
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill-opacity="0.35" fill="%231d82a5" viewBox="0 0 1 1"><rect width="0.5" height="0.5" /><rect x="0.5" y="0.5" width="0.5" height="0.5" /></svg>'),
      var(--button-background);
    background-size: 5%;
    border: none;
    padding: 0 var(--space-xs);
    line-height: 1.25;
    letter-spacing: 0.1ch;
    text-transform: uppercase;
  }

  form.catch button:disabled {
    color: var(--button-color-disabled);
  }

  form.catch button:focus-visible {
    outline: 2px solid currentColor;
  }

  form.see {
    display: inline;
  }

  form.see button {
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    border: none;
    color: inherit;
    background: none;
  }

  form.see button:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }

  form.see button:hover {
    text-decoration: none;
  }
</style>
