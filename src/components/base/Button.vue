<template>
  <button
    type='button'
    :data-color='color'
    class='base__button'
    @click.prevent='$emit("onClick")'
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
  },
  emits: ['onClick'],
};
</script>

<style lang='scss' scoped>
@each $key, $color in $btn-colors {
  .btn-#{$key} {
    color: map-get($color, 'text');
    background-color: map-get($color, 'bg');
    &:active {
      background-color: map-get($color, 'bg--active');
    }
  }
}

.base__button {
  height: $btn-height;
  font-size: $btn-font-size;
  font-weight: $btn-font-weight;
  letter-spacing: -.022em;
  white-space: nowrap;
  text-align: center;
  line-height: 0;
  border-radius: 4px;
  padding: 8px 16px;
  border: 0;
  outline: 0;
  color: $btn-color;
  background-color: $btn-bg-color;

  &:focus-visible {
    box-shadow: $btn--focus-visible-box-shadow;
  }

  &[data-color='primary'] {
    @extend .btn-primary;
  }

  &[data-color='secondary'] {
    @extend .btn-secondary;
  }
}
</style>
