import toast from 'react-hot-toast';

const toastSuccess = (message) => toast.success(message)
const toastError = (message) => toast.error(message)

export { toastSuccess, toastError }