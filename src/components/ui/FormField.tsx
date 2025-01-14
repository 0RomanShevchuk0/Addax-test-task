import { FC } from "react"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"

interface FormFieldProps {
  label: string
  type: "text" | "password" | "email" | "date" | "color"
  register: UseFormRegisterReturn
  error?: FieldError
}

const FormField: FC<FormFieldProps> = ({ label, type, error, register }) => (
  <div className="flex flex-col items-start gap-1">
    <label className="text-gray-700 mb-1">{label}</label>
    <input
      className="border-b border-gray-300 px-0 focus:border-black outline-none w-full"
      type={type}
      {...register}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
)

export default FormField
