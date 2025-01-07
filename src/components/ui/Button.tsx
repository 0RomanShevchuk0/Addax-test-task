import { FC, ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors",
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
