import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 0;
  }

  .Toastify__toast--default {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.mintwhite};
  }

  .Toastify__close-button--default {
    color: ${(props) => props.theme.colors.dark};
    opacity: 1;
  }

  .Toastify__progress-bar--default {
    background: ${(props) => props.theme.colors.dark};
  }

  .Toastify__toast--error {
    background-color: ${(props) => props.theme.colors.red1};
  }
`;

export default StyledToast;
