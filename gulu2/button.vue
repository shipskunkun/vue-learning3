<template>
  <button class="g-button">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-setting"></use>
    </svg>
  按钮</button>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="scss">
  .g-button {
      font-size: var(--font-size);
      height: var(--button-height);
      padding: 0 1em;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      background: var(--button-bg);
      &.g-button:hover {
        border-color: var(--border-color-hover);
      }
      &:active {
        background-color: var(--button-active-bg);
      }
      &:focus {
        outline: none;
      }
    }
    
</style>