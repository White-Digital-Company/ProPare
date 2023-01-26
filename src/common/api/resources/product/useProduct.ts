import type { RemoteProductData, UseProductData } from '@models/product'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import productApi from './actions'
import { productKeys } from './constants'
import {
  connectProductDataArrToPip,
  getCertificationDataFromResponse,
  getPipDataByProductInfo,
  isAvailablePip,
} from '@tools/product'

const selectData = (data: RemoteProductData): UseProductData => {
  const dataFromEn = getPipDataByProductInfo(data.pip.en)
  const dataFromSv = getPipDataByProductInfo(data.pip.sv)

  const pipResult = connectProductDataArrToPip([dataFromEn, dataFromSv])

  const certification = getCertificationDataFromResponse(data.certification)

  return {
    pip: {
      ...pipResult,
      enAvailable: isAvailablePip(pipResult.en),
      svAvailable: isAvailablePip(pipResult.sv),
    },
    certification,
  }
}

const useProduct = (barcode: string) => {
  const query = useQuery<RemoteProductData, AxiosError, UseProductData>(
    productKeys.root(barcode),
    () => productApi.getProductData(barcode),
    {
      select: selectData,
    },
  )

  return query
}

export default useProduct
