<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<div class="flow-m">
  <h2>Search</h2>
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
</div>

<style>
  h2 {
    font-size: var(--size-step-3);
    font-family: Kanit, sans-serif;
    font-weight: 700;
    display: inline-block;
    padding-inline: 0.75em var(--space-l);
    position: relative;
    z-index: 0;
  }

  h2::before {
    content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-46 -46 92 92"><g transform="rotate(120)"><path fill="%23f7f7f7" d="M -44.5 0 A 44.5 44.5 0 0 0 44.5 0" /><path fill="%23f20d0d" d="M -44.5 0 A 44.5 44.5 0 0 1 44.5 0" /><circle fill="%23b3b3b3" r="16"/><circle fill="%23f2f2f2" r="10"/><g fill="%23333333"><path d="M 0 0 0 -5 -2 -5 -5 -2 -5 0 Z" /><path opacity="0.3" d="M 23.5 0 24.5 0 A 21 21 0 0 0 3.5 -21 19 19 0 0 1 22.5 0 Z M 31 0 32.5 0 A 29 29 0 0 0 3.5 -29 26 26 0 0 1 29.5 0 Z M 38.5 0 40.5 0 A 37 37 0 0 0 3.5 -37 33 33 0 0 1 36.5 0 ZM -23.5 0 -24.5 0 A 21 21 0 0 0 -3.5 21 19 19 0 0 1 -22.5 0 Z M -31 0 -32.5 0 A 29 29 0 0 0 -3.5 29 26 26 0 0 1 -29.5 0 Z M -38.5 0 -40.5 0 A 37 37 0 0 0 -3.5 37 33 33 0 0 1 -36.5 0 Z" /></g><path fill="none" stroke="%23333333" stroke-width="3" d="M -44.5 0 A 44.5 44.5 0 0 1 44.5 0 44.5 44.5 0 0 1 -44.5 0 L -16 0 A 16 16 0 0 0 16 0 A 16 16 0 0 0 -16 0 M -10 0 A 10 10 0 0 0 10 0 A 10 10 0 0 0 -10 0 M 16 0 L 44.5 0" /></g></svg>');
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 50%;
    translate: -40% -50%;
    block-size: 0.9em;
    inline-size: 0.9em;
  }

  h2::after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--color-primary);
    background: oklch(
      from var(--color-primary) calc(l - 0.03) calc(c + 0.18) h
    );
    clip-path: polygon(
      0% 0%,
      100% 0%,
      calc(100% - var(--space-s)) 20%,
      100% 32%,
      calc(100% - var(--space-s)) 50%,
      100% 65%,
      calc(100% - var(--space-s)) 78%,
      100% 100%,
      0% 100%
    );
    z-index: -1;
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
</style>
