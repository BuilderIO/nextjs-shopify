/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Button, jsx } from 'theme-ui'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <Button onClick={toggleSidebar} aria-label="Cart">
      <Bag />
    </Button>
  )
}

export default UserNav
