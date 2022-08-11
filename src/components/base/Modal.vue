<template>
  <div
    tabindex='3'
    id='modal'
    class='fixed z-10 inset-0 overflow-y-auto'
    v-if="visible"
  >
    <div
      class='
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      '
      @click.self='onCancel'
    >
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class='hidden sm:inline-block sm:align-middle sm:h-screen'
        >&#8203;</span
      >
      <div
        class='
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          duration-500
          sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full
          modal-content
          '
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class='text-left p-5'>
          <!--Modal Header-->
          <div class='flex justify-between items-start pb-1 h-16'>
            <!-- Modal Close Button -->
            <div
              class='modal-close cursor-pointer z-50'
              @click.stop='onCancel'
            >
              <img
                class="svg-gray"
                :src="closeSVG"
                width="18"
                height="18"
                alt="close icon"
              />
            </div>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeSVG from '@/assets/svg/close.svg';

export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['onCancel'],
  methods: {
    onCancel() {
      this.$emit('onCancel');
    },
  },
  setup() {
    return { closeSVG };
  },
};
</script>

<style lang='scss' scoped>
#modal {
  background-color: rgba(0, 0, 0, .55);

  & .modal-content {
    background-color: rgb(51, 51, 51);
  }
}
</style>
