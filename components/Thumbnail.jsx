/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Image from 'next/image'

const Thumbnail = ({
  src,
  onClick,
  onHover,
  name,
  width,
  height,
}) => {
  return (
    <button
      name={name}
      sx={{
        cursor: 'pointer',
        border: '1px solid gray',
        padding: 1,
        '&:focus': {
          outline: 'none',
          borderColor: 'black',
        },
      }}
      onMouseOver={onHover}
      onClick={onClick}
    >
      <Image src={src} width={width} height={height} loading="eager" />
    </button>
  )
}

export default Thumbnail
