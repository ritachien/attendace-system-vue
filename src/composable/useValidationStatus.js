export function useValidationStatus (data, validResult) {
  if (!data) {
    return undefined
  } else {
    return validResult ? 'success' : 'error'
  }
}
