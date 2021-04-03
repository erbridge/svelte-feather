<script>
  import classnames from "classnames";

  let extraClasses = "";
  export { extraClasses as class };

  // prettier-ignore
  const defaults = {attrs};

  const classes = classnames(defaults.class, extraClasses);
</script>

<svg {...defaults} {...$$props} class={classes}>
  <slot />
  {content}
</svg>
