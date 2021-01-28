import { FC } from 'react'
import cn from 'classnames'
import { useCartCount } from '@lib/shopify/storefront-data-hooks'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'

interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()
  const itemsCount = useCartCount()

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
