import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import colorNames from 'css-color-names'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  color?: string
}

function getHexColor(strColor: string) {
  return (colorNames as Record<string, string>)[strColor.toLowerCase()]
}

const Swatch: FC<Props & Omit<ButtonProps, 'variant'>> = ({
  className,
  color = '',
  label,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()
  const hexColor = variant == 'color' && getHexColor(color)
  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: !hexColor,
      ...(hexColor && {
        [s.color]: color,
        [s.dark]: color ? isDark(hexColor) : false,
      }),
    },
    className
  )

  return (
    <Button
      className={rootClassName}
      style={hexColor ? { backgroundColor: hexColor } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {hexColor && active && (
        <span>
          <Check />
        </span>
      )}
      {!hexColor ? label : null}
    </Button>
  )
}

export default Swatch
