<template>
  <n-form-item
    :label="props.label"
    :required="props.required"
    :validation-status="validStatus"
    :feedback="feedback"
    size="large"
  >
    <n-input
      @input="updateInputValue"
      v-model:value="input"
      :id="props.field"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      clearable
    />
  </n-form-item>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NFormItem, NInput } from 'naive-ui'

import { useValidStatus } from '../../composable/useInputValidation'

const emits = defineEmits(['updateInput'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  isValidInput: {
    type: Boolean,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '',
  },
  feedback: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  passwordValue: {
    type: String,
    default: '',
  }
})
const input = ref(null)
const validStatus = computed(() => {
  // passwordCheck 以外 input
  if (props.field !== 'passwordCheck') {
    return useValidStatus(input.value, props.isValidInput)
  }

  // 處理 passwordCheck
  if (!props.passwordValue) return undefined
  if (props.passwordValue === input.value?.trim()) {
    return 'success'
  } else {
    return 'error'
  }
})
const feedback = computed(() => props.feedback && validStatus.value === 'error'
  ? props.feedback
  : null
)

function updateInputValue () {
  emits('updateInput', {
    field: props.field,
    data: (typeof input.value === 'string') ? input.value.trim() : input.value,
  })
}
</script>
