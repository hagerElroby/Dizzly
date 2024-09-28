interface CheckboxFieldProps {
  label: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
}) => {
  return (
    <div className="relative my-1">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4  border-gray-300 rounded focus:ring-lightRed"
        />
        <label htmlFor={name} className="text-dark font-medium text-xs md:text-sm">
          {label}
        </label>
      </div>
     {name=="rememberMe"? null :
        <div className="h-4 my-1">
          {error && (
            <p
              className={`text-xs md:text-sm text-lightRed transition-opacity duration-300 ${
                error ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error}
            </p>
          )}
        </div>
     }
    </div>
  )
}

export default CheckboxField
