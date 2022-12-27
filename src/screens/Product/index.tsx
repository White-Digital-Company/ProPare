import { Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import type { RootRouterScreenProps } from '@navigation/RootRouter'

const ProductScreen = () => {
  const { params } = useRoute<RootRouterScreenProps<'Product'>>()

  return <Text>{`Product barcode: ${params.barcode}`}</Text>
}

export default ProductScreen
