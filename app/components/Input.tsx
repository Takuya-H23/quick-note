type Props = {
  type?: string
  id: string
  name: string
  label: string
  required?: boolean
  defaultValue?: string
  errorMessage?: string
  autoComplete?: string
  placeholder?: string
}

export default function Input({
  label,
  type = 'text',
  id,
  name,
  defaultValue,
  errorMessage,
  required = false,
  autoComplete = 'on',
  placeholder = ''
}: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>{`${label}${required ? '*' : ''}`}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="p-1.5 rounded-sm text-gray-900"
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
      />
      <p className="text-sm text-red-500">{errorMessage || ''}</p>
    </div>
  )
}
