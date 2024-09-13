<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props();
</script>

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
