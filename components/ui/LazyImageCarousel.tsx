/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, IconButton } from 'theme-ui'
import { FC } from 'react'
import {
  CarouselProvider,
  ImageWithZoom,
  Slide,
  Slider,
  Dot,
} from 'pure-react-carousel'
import Image from 'next/image'

import 'pure-react-carousel/dist/react-carousel.es.css'

const CustomDotGroup: FC<Omit<ImageCarouselProps, 'alt'>> = ({
  images,
  onThumbnailClick,
  ...imageProps
}) => {
  return (
    <div sx={{ textAlign: 'center' }}>
      {images.map((image, slide) => (
        <IconButton
          key={slide}
          as="span"
          onClick={() => onThumbnailClick?.(slide)}
        >
          <Dot slide={slide}>
            <Image
              src={image.src}
              {...imageProps}
              height={30}
              width={30}
            ></Image>
          </Dot>
        </IconButton>
      ))}
    </div>
  )
}

export type ImageCarouselProps = {
  images: Array<{ src: string }>
  alt: string
  onThumbnailClick?: (index: number) => void
  width: number | string
  height: number | string
  layout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  priority?: boolean
  loading?: 'eager' | 'lazy'
  sizes?: string
}

const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  onThumbnailClick,
  ...imageProps
}) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={images.length}
  >
    <Slider>
      {images.map((image, index) => (
        <Slide index={index} key={index}>
          <ImageWithZoom src={image.src} />
        </Slide>
      ))}
    </Slider>
    <CustomDotGroup
      {...imageProps}
      onThumbnailClick={onThumbnailClick}
      images={images}
    />
  </CarouselProvider>
)

export default ImageCarousel
