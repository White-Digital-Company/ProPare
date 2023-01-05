import type { RemoteProductData, UseProductData } from '@models/product'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import productApi from './actions'
import { productKeys } from './constants'
import {
  connectProductDataArrToPip,
  getPipDataByProductInfo,
  isAvailablePip,
} from '@tools/product'

const selectData = (data: RemoteProductData): UseProductData => {
  const dataFromEn = getPipDataByProductInfo(data.en)
  const dataFromSv = getPipDataByProductInfo(data.sv)

  const finallyResult = connectProductDataArrToPip([dataFromEn, dataFromSv])

  console.log('finallyResult.sv', finallyResult.sv)

  return {
    ...finallyResult,
    enAvailable: isAvailablePip(finallyResult.en),
    svAvailable: isAvailablePip(finallyResult.sv),
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
