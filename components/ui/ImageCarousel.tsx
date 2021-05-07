import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import UntilInteraction from '@components/common/UntilInteraction'

type props = import('./LazyImageCarousel').ImageCarouselProps

const LazyCarousel = dynamic(() => import('./LazyImageCarousel'), {
  ssr: false,
})
const ImageCarousel: React.FC<props> = ({
  images,
  onThumbnailClick,
  ...imageProps
}) => {
  return (
    <UntilInteraction skeleton={<Image src={images[0].src} {...imageProps} />}>
      <LazyCarousel
        images={images}
        onThumbnailClick={onThumbnailClick}
        {...imageProps}
      />
    </UntilInteraction>
  )
}
export default ImageCarousel
