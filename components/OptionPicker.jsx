/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Select, Label } from '@theme-ui/components'

const OptionPicker = ({
  name,
  options,
  onChange,
  selected,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Select id={name} onChange={onChange} value={selected}>
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default OptionPicker
