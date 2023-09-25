import { toast } from 'react-toastify';

const options = {
  autoClose: 1500,
  className: '',
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
};

export const reactToast = toast;

export const toastSuccess = (message, customOptions) => {
  toast.success(message, { ...options, ...customOptions });
};

export const toastError = (message, customOptions) => {
  toast.error(message, { ...options, autoClose: 3000, ...customOptions });
};

export const toastWarning = (message, customOptions) => {
  toast.warn(message, { ...options, ...customOptions });
};

export const toastInformation = (message, customOptions) => {
  toast.info(message, { ...options, ...customOptions });
};

export const toastDefault = (message, customOptions) => {
  toast(message, { ...options, ...customOptions });
};
