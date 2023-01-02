export interface ProductLinksSetResponse {
  linkset: ProductLinks[]
}

export interface ProductLinks {
  anchor: string
  itemDescription: string
  unixtime: number
  'https://gs1.org/voc/defaultLink': Link[]
  'https://gs1.org/voc/pip': Link[]
  'https://gs1.org/voc/defaultLinkMulti': Link[]
  'https://gs1.org/voc/hasRetailers': Link[]
  'https://gs1.org/voc/productSustainabilityInfo': Link[]
  'https://gs1.org/voc/recipeInfo': Link[]
  'https://gs1.org/voc/traceability': Link[]
}

export interface Link {
  href: string
  type: string
  hreflang?: string[]
}

export interface ProductLink {
  en: string
  sv?: string
}

export interface RemoteProductData {
  en: any
  sv: any
}

export interface ProductData {
  en: PipData
  sv: PipData
}

export interface UseProductData {
  en: PipData
  enAvailable: boolean
  sv: PipData
  svAvailable: boolean
}

export interface PipData {
  brand?: string
  subbrand?: string
  owner?: string
  productName?: string
  packageSize?: string
  packageDepth?: string
  packageHeight?: string
  packageWidth?: string
  grossWeight?: string
  countryOfOriginStatement?: string
  image?: string
  markedLabel?: string
}
