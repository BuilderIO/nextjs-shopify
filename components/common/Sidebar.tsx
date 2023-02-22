/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Close, Box } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'
import { FC } from 'react'
import { BaseModal, ModalCloseTarget } from '@components/modals'
import NoSSR from './NoSSR'

interface Props {
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props & { children: React.ReactNode }> = ({
  children,
  open = false,
  onClose,
}) => {
  const width = useResponsiveValue(['100%', 500])
  return (
    <NoSSR>
      <BaseModal
        isOpen={open}
        onDismiss={onClose}
        contentProps={{
          style: {
            width,
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
          },
        }}
        contentTransition={{
          from: { transform: 'translateX(100%)' },
          enter: { transform: 'translateX(0)' },
          leave: { transform: 'translateX(100%)' },
        }}
      >
        <ModalCloseTarget>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
              bg: 'text',
              color: 'background',
            }}
          >
            <Close />
          </Box>
        </ModalCloseTarget>
        {children}
      </BaseModal>
    </NoSSR>
  )
}

export default Sidebar
