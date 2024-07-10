<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="modal-mask"
    >
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body" />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              class="modal-button-ok"
              @click="emitConfirm"
            >
              ОК
            </button>
            <button
              class="modal-button-cancel"
              @click="$emit('close')"
            >
              ОТМЕНА
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['confirm', 'close'])

const emitConfirm = () => {
  emit('confirm');
  emit('close');
};
</script>