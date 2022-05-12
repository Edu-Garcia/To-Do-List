import './style.scss';

interface IButton {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, type = 'button', className, onClick, disabled }: IButton) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}