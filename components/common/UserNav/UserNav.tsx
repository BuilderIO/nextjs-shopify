/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import NoSSR from '../NoSSR/NoSSR'
import { Button, jsx } from 'theme-ui'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <NoSSR>
      <Button sx={{ zIndex: 1 }} onClick={toggleSidebar}>
        <Bag />
      </Button>
    </NoSSR>
  )
}

export default UserNav
