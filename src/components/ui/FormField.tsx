import React, { FC } from "react"
import Input from "./Input"

interface FormFieldProps {
  label: string
  type: "text" | "password" | "email" | "datetime-local" | "color"
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  name?: string
  maxLength?: number
}

const FormField: FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  required,
  name,
  maxLength,
}) => (
  <div className="flex flex-col items-start gap-1">
    <label className="text-gray-700 mb-1">{label}</label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      maxLength={maxLength}
    />
  </div>
)

export default FormField
