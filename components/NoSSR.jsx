import React, { useEffect, useState } from 'react'

const NoSSR = ({
  children,
  skeleton,
}) => {
  const [render, setRender] = useState(false)
  useEffect(() => setRender(true), [])
  if (render) {
    return <>{children}</>
  }
  if (skeleton) {
    return <>{skeleton}</>
  }
  return null
}
export default NoSSR
