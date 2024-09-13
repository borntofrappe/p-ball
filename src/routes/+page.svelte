<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

<div class="flow-m">
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
</style>
