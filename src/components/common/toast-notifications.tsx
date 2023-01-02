import { useToasts } from 'react-toast-notifications'

const NotificationManager = (type: number, content: string) => {
  const SUCCESS = 1001;
  const ERROR = 1002;
  const WARNING = 1003;
  const INFO = 1004;

  const { addToast } = useToasts();

  switch (type) {
    case SUCCESS: {
      return addToast(content, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    case ERROR: {
      const error = () => {
        addToast(content, {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      break;
    }
    case WARNING: {
      const warning = () => {
        addToast(content, {
          appearance: 'warning',
          autoDismiss: true,
        });
      }

      break;
    }
    case INFO: {
      const info = () => {
        addToast(content, {
          appearance: 'info',
          autoDismiss: true,
        });
      }

      break;
    }
    default:
      break;
  }
}

export default NotificationManager;