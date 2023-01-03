import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  width: '25rem',
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

export const popErrMsg = (msg) => {
  Toast.fire({
    icon: 'warning',
    title: msg
  })
}

export const popOkMsg = (msg) => {
  Toast.fire({
    icon: 'success',
    title: msg
  })
}

export const popConfirmMsg = ({ msg, contents, icon }) => {
  Swal.fire({
    title: msg,
    html: contents,
    icon,
  })
}
