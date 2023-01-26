<template>
  <n-checkbox
    :id="props.field"
    v-model:checked="input"
    type="checkbox"
    size="large"
    @update:checked="updateInputValue"
  >
    {{ props.labelText }}
  </n-checkbox>
</template>

<script setup>
import { ref } from 'vue'
import { NCheckbox } from 'naive-ui'

const emits = defineEmits(['updateInput'])
const props = defineProps({
  labelText: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  value: {
    type: Boolean,
    default: false,
  }
})

const input = ref(null)

function updateInputValue () {
  emits('updateInput', {
    field: props.field,
    data: input.value,
  })
}
</script>
