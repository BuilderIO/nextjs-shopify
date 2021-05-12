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
    <div
      sx={{
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        maxHeight: '100%',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        left: 10,
        transform: 'translateY(-50%)',
      }}
    >
      {images.map((image, slide) => (
        <IconButton
          key={slide}
          sx={{ height: 80, width: 80 }}
          as="span"
          onClick={() => onThumbnailClick?.(slide)}
        >
          <Dot slide={slide}>
            <Image
              src={image.src}
              {...imageProps}
              height={80}
              width={80}
            ></Image>
          </Dot>
        </IconButton>
      ))}
    </div>
  )
}

export type ImageCarouselProps = {
  showZoom?: boolean
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
  showZoom,
  ...imageProps
}) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    hasMasterSpinner={false}
    totalSlides={images.length}
    orientation="vertical"
  >
    <div sx={{ position: 'relative' }}>
      <Slider>
        {images.map((image, index) => (
          <Slide index={index} key={index}>
            {showZoom ? (
              <ImageWithZoom src={image.src} />
            ) : (
              <Image src={image.src} {...imageProps} />
            )}
          </Slide>
        ))}
      </Slider>
      {showZoom && (
        <CustomDotGroup
          {...imageProps}
          onThumbnailClick={onThumbnailClick}
          images={images}
        />
      )}
    </div>
  </CarouselProvider>
)

export default ImageCarousel
