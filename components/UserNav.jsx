/** @jsxRuntime classic */
/** @jsx jsx */
import { Bag } from '@components/icons'
import { useUI } from '@components/context'
import { Button, jsx } from 'theme-ui'

const UserNav = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <Button onClick={toggleSidebar} aria-label="Cart">
      <Bag />
    </Button>
  )
}

export default UserNav
