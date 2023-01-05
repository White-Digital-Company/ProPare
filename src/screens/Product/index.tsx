import { useState } from 'react'
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import type {
  RootRouterScreenProps,
  RootRouterNavigationProps,
} from '@navigation/RootRouter'
import { useProduct } from '@api'
import { Shadow } from 'react-native-shadow-2'
import tw from '@tools/tailwind'
import Label from '@uikit/molecules/rows/Label'
import FlagButton from '@uikit/molecules/Buttons/FlagButton'
import { useTranslation } from 'react-i18next'
import ProductLoaderSkeleton from './components/ProductLoaderSkeleton/index'

const ProductScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Certification'>>()
  const { params } = useRoute<RootRouterScreenProps<'Product'>>()
  const { t } = useTranslation()

  const [language, setLanguage] = useState<'sv' | 'en'>('sv')

  const query = useProduct(params.barcode)

  console.log('query.data', query.data)

  if (query.isLoading) {
    return <ProductLoaderSkeleton barcode={params.barcode} />
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {!query.isSuccess ||
      (!query.data.svAvailable && !query.data.enAvailable) ? (
        <View style={tw`grow`}>
          <ImageBackground
            style={tw`p-[24px] h-[200px] items-center justify-center`}
            source={require('@assets/images/background.png')}
          >
            <View style={tw`flex-row items-center justify-center`}>
              <Text style={tw`text-lg font-bold text-center`}>
                {t('screens.product.incomplete')}
              </Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            style={tw`p-[24px] mb-[40px]`}
            source={require('@assets/images/background.png')}
          >
            <View style={tw`flex-row mb-[16px] items-center justify-center`}>
              <Text style={tw`text-lg font-bold mr-[14px]`}>
                {t('screens.product.labels.passport')}
              </Text>
              {query.data.svAvailable && (
                <FlagButton
                  flag="flagSV"
                  onPress={() => setLanguage('sv')}
                  buttonStyle="mr-[14px]"
                />
              )}
              {query.data.enAvailable && (
                <FlagButton flag="flagEU" onPress={() => setLanguage('en')} />
              )}
            </View>
            {query.data.en.image && (
              <Shadow style={tw`w-full rounded-[4px]`}>
                <Image
                  source={{ uri: query.data.en.image }}
                  style={tw`w-full h-[200px] rounded-[4px]`}
                />
              </Shadow>
            )}
          </ImageBackground>
          <View style={tw`px-[16px]`}>
            <Label
              title={t('screens.product.labels.gtin')}
              value={params.barcode}
            />
            {query.data[language].brand && (
              <Label
                title={t('screens.product.labels.brand')}
                value={query.data[language].brand ?? ''}
              />
            )}
            {query.data[language].subbrand && (
              <Label
                title={t('screens.product.labels.subBrand')}
                value={query.data[language].subbrand ?? ''}
              />
            )}
            {query.data[language].owner && (
              <Label
                title={t('screens.product.labels.brandOwner')}
                value={query.data[language].owner ?? ''}
              />
            )}
            {query.data[language].productName && (
              <Label
                title={t('screens.product.labels.product')}
                value={query.data[language].productName ?? ''}
              />
            )}
            {query.data[language].packageHeight && (
              <Label
                title={t('screens.product.labels.height')}
                value={query.data[language].packageHeight ?? ''}
              />
            )}
            {query.data[language].packageWidth && (
              <Label
                title={t('screens.product.labels.width')}
                value={query.data[language].packageWidth ?? ''}
              />
            )}
            {query.data[language].packageSize && (
              <Label
                title={t('screens.product.labels.size')}
                value={query.data[language].packageSize ?? ''}
              />
            )}
            {query.data[language].packageDepth && (
              <Label
                title={t('screens.product.labels.depth')}
                value={query.data[language].packageDepth ?? ''}
              />
            )}
            {query.data[language].grossWeight && (
              <Label
                title={t('screens.product.labels.weight')}
                value={query.data[language].grossWeight ?? ''}
              />
            )}
            {query.data[language].countryOfOriginStatement && (
              <Label
                title={t('screens.product.labels.country')}
                value={query.data[language].countryOfOriginStatement ?? ''}
              />
            )}
            {query.data[language].markedLabel && (
              <Label
                title={t('screens.product.labels.certification')}
                value={`${query.data[language].markedLabel}`}
                isButton
                onPress={() =>
                  navigation.navigate('Certification', {
                    barcode: params.barcode,
                  })
                }
              />
            )}
          </View>
        </ScrollView>
      )}
      <View style={tw`w-full items-center justify-center py-[14px]`}>
        <Text
          style={tw`text-light_blue text-xl font-light`}
        >{`<<<<GTIN${params.barcode}<<<<`}</Text>
      </View>
    </View>
  )
}

export default ProductScreen
