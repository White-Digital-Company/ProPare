import httpClient from '@api/httpClient'
import axios from 'axios'
import { productApi } from '@api'
import type {
  ProductLinksSetResponse,
  RemoteProductData,
} from '@models/product'
import { productUrls } from './constants'
import { getProductDataLinks, getProductInfoByGSLink } from '@tools/product'

const getProductData = async (barcode: string): Promise<RemoteProductData> => {
  const requestLink = barcode.includes('http')
    ? barcode
    : productUrls.root(barcode)

  const { data } = await httpClient.get<ProductLinksSetResponse>(requestLink, {
    params: {
      linkType: 'all',
    },
  })

  console.log('data', data)

  const links = getProductDataLinks(data, barcode)

  console.log('links', links)

  const productData = await getProductInfoByGSLink(links.pip)

  const certificationData = await productApi
    .getProductDataByLink(links.certification)
    .catch(error => {
      if (error.response.data === 'Ok') {
        return 'Ok'
      }
      return null
    })

  return { pip: productData, certification: certificationData }
}

const getProductDataByLink = async (link: string) => {
  const res = await axios.get(link)

  return res.data
}

export default {
  getProductData,
  getProductDataByLink,
}
