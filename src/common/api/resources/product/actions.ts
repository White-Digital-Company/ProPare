import httpClient from '@api/httpClient'
import axios from 'axios'
import type { ProductLinksSetResponse } from '@models/product'
import { productUrls } from './constants'
import { getProductDataLinks, getProductInfoByGSLink } from '@tools/product'

const getProductData = async (barcode: string) => {
  const requestLink = barcode.includes('http')
    ? barcode
    : productUrls.root(barcode)

  const { data } = await httpClient.get<ProductLinksSetResponse>(requestLink, {
    params: {
      linkType: 'all',
    },
  })

  const links = getProductDataLinks(data, barcode)

  const productData = await getProductInfoByGSLink(links.pip)

  return productData
}

const getProductDataByLink = async (link: string) => {
  const { data } = await axios.get(link)

  return data
}

export default {
  getProductData,
  getProductDataByLink,
}
