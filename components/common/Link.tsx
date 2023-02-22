import NextLink from 'next/link'
import { Link as ThemedLink, LinkProps as ThemedLinkProps } from 'theme-ui'

const Link: React.FC<ThemedLinkProps & { children?: React.ReactNode }> = ({
  children,
  as,
  ...props
}) => {
  return (
    <ThemedLink
      as={as || NextLink}
      {...props}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {children}
    </ThemedLink>
  )
}

export default Link
