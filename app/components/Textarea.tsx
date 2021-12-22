type Props = {
  id: string
  name: string
  label: string
  rows?: number
  cols?: number
  defaultValue?: string
  errorMessage?: string
  autoComplete?: string
  placeholder?: string
}

export default function Textarea({
  label,
  id,
  name,
  defaultValue,
  errorMessage,
  cols,
  rows = 3,
  placeholder = ''
}: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        name={name}
        id={id}
        rows={rows}
        cols={cols}
        className="p-1.5 rounded-sm text-gray-900"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <p className="text-sm text-red-500">{errorMessage || ''}</p>
    </div>
  )
}
