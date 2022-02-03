interface IButton {
  type?: JSX.IntrinsicElements['button']['type'];
  color?: `green` | `red` | `gray`;
  children: React.ReactNode;
  modifier?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ type = `button`, color = `gray`, modifier, children, ...rest }: IButton) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={`p-2 rounded border-2 bg-white ${
        color === `green`
          ? `text-green-400 border-green-400`
          : color === `red`
          ? `text-red-400 border-red-400`
          : ``
      } ${modifier}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
