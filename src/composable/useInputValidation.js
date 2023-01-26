// Regex
const Regex = {
  account: /^\w{5,12}$/,
  name: /^.+$/,
  email: /^[-\w.]+@([-\w]+\.)+[-\w]{2,4}$/,
  password: /^[\w!@#$%^&*]{6,20}$/,
}

export function useInputValidation ({ data, required, field }) {
  const regex = Regex[field]

  if (required) {
    return regex.test(data)
  } else {
    return data === null || regex.test(data)
  }
}
