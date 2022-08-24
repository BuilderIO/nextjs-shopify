import React, { useState } from 'react'

const UntilInteraction = ({
  children,
  skeleton,
}) => {
  const [render, setRender] = useState(false)
  if (render) {
    return <>{children}</>
  }
  return (
    <div
      onMouseOver={() => setRender(true)}
      onClick={() => setRender(true)}
      onTouchStart={() => setRender(true)}
    >
      {skeleton}
    </div>
  )
}
export default UntilInteraction
