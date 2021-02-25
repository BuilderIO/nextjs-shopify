import { FC } from 'react'
import cn from 'classnames'
import { useCartCount } from '@lib/shopify/storefront-data-hooks'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import NoSSR from '../NoSSR/NoSSR'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()
  const itemsCount = useCartCount()

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <NoSSR>
            <li className={s.item} onClick={toggleSidebar}>
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </li>
          </NoSSR>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
