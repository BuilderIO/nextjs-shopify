
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Close, Themed } from 'theme-ui'
import { FC } from 'react'
import { BaseModal, ModalCloseTarget } from 'react-spring-modal';

interface Props {
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  
  return (
    <BaseModal
    isOpen={open}
    onDismiss={onClose}
    contentProps={{
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
      }
    }}
    contentTransition={{
      from: { transform: 'translateX(100%)' },
      enter: { transform: 'translateX(0)' },
      leave: { transform: 'translateX(100%)' }
    }}
  >

<ModalCloseTarget>
<Themed.div sx={{ display: 'flex', justifyContent: 'space-between', py: 1, bg: 'text', color: 'background'}}>
          <Close />
        </Themed.div>
    </ModalCloseTarget>
    {children}

  </BaseModal>
  )
}

export default Sidebar
