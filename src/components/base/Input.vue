<template>
  <VeeField
    :name="name"
    :type='type'
    class='input'
    :placeholder='placeholder'
    @keydown.enter='onEnter'
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      required: true,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['onEnter'],
  data() {
    return { value: '' };
  },
  methods: {
    onEnter(event) {
      this.$emit('onEnter', event);
    },
  },
};
</script>

<style lang="scss" scoped>
@each $key, $size in $input-sizes {
  .size-#{$key} {
    height: $size;
    font-size: div($size, 2) - 3;
  }
}
.input {
  border-radius: 6px;
  padding: 0 15px 0 15px;
  width: 100%;
  color: #f5f5f7;
  background-color: rgb(31, 31, 31);
  box-sizing: border-box;
  outline: none;

  @extend .size-md;

  &:disabled {
    opacity: 0.8;
    user-select: none;
  }

  &[type="email"], &[type="password"] {
    &:focus {
      box-shadow: 0 0 0 1px #0070c9;
    }
  }
}
</style>
