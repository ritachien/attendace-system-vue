import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  width: '25rem',
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
