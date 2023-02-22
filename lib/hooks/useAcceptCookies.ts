import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { builder } from '@builder.io/react'
const COOKIE_NAME = 'accept_cookies'

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) {
      builder.canTrack = false
      setAcceptedCookies(false)
    }
  }, [])

  const acceptCookies = () => {
    setAcceptedCookies(true)
    Cookies.set(COOKIE_NAME, 'accepted', { expires: 365 })
    builder.canTrack = true
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}
