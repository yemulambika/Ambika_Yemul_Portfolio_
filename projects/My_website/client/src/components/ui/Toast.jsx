import toast from 'react-hot-toast';

export const useAppToast = () => {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast(message);
  return { showSuccess, showError, showInfo, toast };
};

export default useAppToast;