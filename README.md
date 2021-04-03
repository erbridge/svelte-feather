# @erbridge/svelte-feather

[Feather icons](https://feathericons.com/) as Svelte components.

## Installation

```sh
npm install @erbridge/svelte-feather
```

## Usage

The most basic usage is to import the individual components you need:

```svelte
<script>
  import { X } from "@erbridge/svelte-feather";
</script>

<X />
```

To override the root `<svg>` node's attributes, pass them in as props:

```svelte
<script>
  import { X } from "@erbridge/svelte-feather";
</script>

<X width={36} height={36} />
```

You can also specify attributes that aren't set on the Feather SVGs by default:

```svelte
<script>
  import { X } from "@erbridge/svelte-feather";
</script>

<X role="presentation" />
```

Note that passing a `class` prop results in the value being added to the default
Feather classes, not overriding them.
