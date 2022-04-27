import './style.scss';

interface IButton {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, type = 'button', className, onClick }: IButton) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}