export interface AttributeInput {
  [key: string]: string
}

export interface LineItemPatch {
  variantId: string | number
  quantity: number
  customAttributes?: AttributeInput[]
}
