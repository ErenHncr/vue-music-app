<template>
  <div class='dropdown'>
    <BaseButton
      color='link'
      @onClick='showOptions = !showOptions'
      >
      <slot></slot>
    </BaseButton>
    <div
      v-if="showOptions && options.length > 0"
      class='dropdown-options'
    >
      <ul>
         <li
          v-for="option in options"
          :key="option?.key"
          @click.prevent='onDropdownItemClick(option?.key, option?.onClick)'
        >
          {{ option?.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Dropdown',
  props: {
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  emits: ['onItemClick'],
  setup(props, { emit }) {
    const showOptions = ref(false);

    const onDropdownItemClick = (key, onClick = () => {}) => {
      onClick(key);
      emit('onItemClick', key);
    };

    return { showOptions, onDropdownItemClick };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &-options {
    background-color: rgba(45, 45, 45, 0.88);
    min-width: 180px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 2.5rem;
    right: 0px;
    border-radius: 6px;
    border: 0.7px solid rgba(255, 255, 255, 0.2);
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 1px;
    overflow: hidden;

    & > ul {
      & > li {
        height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>
