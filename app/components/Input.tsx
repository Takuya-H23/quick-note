type Props = {
  type?: string
  id: string
  name: string
  label: string
  defaultValue?: string
  errorMessage?: string
}

export default function Input({
  label,
  type = 'text',
  id,
  name,
  defaultValue,
  errorMessage
}: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="p-1.5 rounded-sm text-gray-900"
        defaultValue={defaultValue}
      />
      <p>{errorMessage || ''}</p>
    </div>
  )
}
