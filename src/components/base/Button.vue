<template>
  <button
    :disabled='disabled'
    :type='type'
    :data-color='color'
    class='base__button'
    @click='$emit("onClick")'
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
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

    &:disabled {
      color: #181818;
      background-color: #b6b6b6;
      cursor: not-allowed;
    }

    &:not(:disabled) {
      &:active {
        background-color: map-get($color, 'bg--active');
      }
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

  &[data-color='link'] {
    @extend .btn-link;

    font-weight: 400;
    line-height: 1.37rem;
    letter-spacing: .03rem;
    padding: 0px;

    &:hover {
      text-decoration: underline;
    }
  }

  &[data-color='delete'] {
    @extend .btn-delete;
  }

  &[data-color='text'] {
    @extend .btn-text;
  }
}
</style>
