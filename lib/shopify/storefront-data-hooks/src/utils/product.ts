/* 
  prepareVariantsWithOptions()

  This function changes the structure of the variants to
  more easily get at their options. The original data 
  structure looks like this:

  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc4NDQ4MTAzMDE4OA==",
    "selectedOptions": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Small"
      }
    ]
  },

  This function accepts that and outputs a data structure that looks like this:

  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc4NDQ4MTAzMDE4OA==",
    "color": "Red",
    "size": "Small"
  },
*/

export function prepareVariantsWithOptions(
  variants: any[]
  // variants: Readonly<ShopifyBuy.ProductVariant[]>
) {
  return variants.map((variant) => {
    // TODO: look into types, prob need update in @types/shopify-buy
    // convert the options to a dictionary instead of an array
    const optionsDictionary = variant.selectedOptions?.reduce(
      (options: any, option: any) => {
        options[`${option?.name?.toLowerCase()}`] = option?.value
        return options
      },
      {}
    )

    // return an object with all of the variant properties + the options at the top level
    return {
      ...optionsDictionary,
      ...variant,
    }
  }) as any[]
}

export const getPrice = (price: string, currency: string) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : '0'))

/*
  prepareVariantsImages()

  This function distills the variants images into a non-redundant
  group that includes an option 'key' (most likely color). The
  datastructure coming into this function looks like this:

  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc4NDQ4MTAzMDE4OA==",
    "image": image1,
    "color": "Red",
    "size": "Small"
  },
  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaW1l2C8zMTc4NDQ4MTAzMDE4OA==",
    "image": image1,
    "color": "Red",
    "size": "Medium"
  },

  And condenses them so that there is only one unique
  image per key value:

  {
    "image": image1,
    "color": "Red",
  },
*/

export function prepareVariantsImages(
  variants: any[],
  // variants: Readonly<GatsbyTypes.ShopifyProductVariant[]>,
  optionKey: any
): any[] {
  // Go through the variants and reduce them into non-redundant
  // images by optionKey. Output looks like this:
  // {
  //   [optionKey]: image
  // }
  const imageDictionary = variants.reduce<Record<string, ShopifyBuy.Image>>(
    (images, variant) => {
      if (variant[optionKey]) {
        images[variant[optionKey]] = variant.image
      }
      return images
    },
    {}
  )

  // prepare an array of image objects that include both the image
  // and the optionkey value.
  const images = Object.keys(imageDictionary).map((key) => {
    return {
      [optionKey]: key,
      src: imageDictionary[key],
    }
  })

  return images
}
