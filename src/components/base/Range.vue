<template>
  <VeeField
    type='range'
    class='input-range'
    :name='name'
    :min='min'
    :max='max'
    :step='step'
    :value='value'
    v-model='inputValue'
    :style='{ "--range-value": `${inputValue * 100}%` }'
  />
</template>

<script>
export default {
  name: 'Range',
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 1,
    },
    step: {
      type: Number,
      required: false,
      default: 0.01,
    },
    value: {
      type: Number,
      required: false,
    },
  },
  data(props) {
    const { value } = props;
    return { inputValue: value };
  },
};
</script>

<style lang='scss' scoped>
.input-range {
  --range-value: 100%;
  $thumb-bg-color: #2c2c2c;
  $thumb-bg-color--active: #413e40;
  $thumb-border-color: #7a7a7a;
  $thumb-border-color--active: #8d8b8c;
  $track-bg-color: #aaa;

  min-width: 70px;
  height: 3px;
  padding: 0;
  background-color: transparent;

  -webkit-appearance: none;
  -moz-appearance: none;

  &:disabled {
    opacity: 0.8;
    user-select: none;
  }

  // Chrome
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 3px;
    border-color: transparent;
    border-radius: 1.5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 4px;
    background-image: linear-gradient(
      90deg,
      transparent var(--range-value),
      rgba(0, 0, 0, 0.5) var(--range-value)
    );
    background-color: $track-bg-color;
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 13.5px;
    height: 13.5px;
    margin-top: -5px;
    background-color: $thumb-bg-color;
    border: 1.2px solid $thumb-border-color;
    border-radius: 100%;
    cursor: pointer;

    &:active {
      background-color: $thumb-bg-color--active;
      border-color: $thumb-border-color--active;
    }
  }

  /** FF*/
  &::-moz-range {
    &-thumb {
      -moz-appearance: none;
      width: 10.75px;
      height: 10.75px;
      background-color: $thumb-bg-color;
      border: 2.5px solid $thumb-border-color;
      border-radius: 100%;
      cursor: pointer;

      &:active {
       background-color: $thumb-bg-color--active;
        border-color: $thumb-border-color--active;
      }
    }

    &-progress {
      -moz-appearance: none;
      background-color: #aaa;
      border-radius: 1.5px;
      cursor: pointer;
    }

    &-track {
      -moz-appearance: none;
      background-color: #4a4a4a;
      border-radius: 1.5px;
      cursor: pointer;
    }
  }
}
</style>
