/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Themed, jsx } from 'theme-ui'
import { BottomModal, ModalTitle, ModalCloseTarget } from 'react-spring-modal'

interface FeatureBarProps {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  action,
  hide,
}) => {
  return (
    <BottomModal isOpen={!hide}>
      <ModalTitle>{title}</ModalTitle>
      {description}
      <Themed.div sx={{ display: 'flex', justifyContent: 'center', p: [1, 2] }}>
        {action && action}
      </Themed.div>
    </BottomModal>
  )
}

export default FeatureBar
