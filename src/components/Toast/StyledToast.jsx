import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 14px;
  }

  .Toastify__toast--default {
    background-color: #f3f3f3;
    color: #342143;
  }

  .Toastify__close-button--default {
    color: ${(props) => props.theme.colors.dark};
    opacity: 1;
  }

  .Toastify__progress-bar--default {
    background: #803bec;
  }

  .Toastify__toast--error {
    background-color: ${(props) => props.theme.colors.red1};
  }
`;

export default StyledToast;
