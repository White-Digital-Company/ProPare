import tw from '@tools/tailwind'
import { View, Text, ImageBackground, Image } from 'react-native'
import { useProduct } from '@api'
import { useRoute } from '@react-navigation/native'
import type { RootRouterScreenProps } from '@navigation/RootRouter'
import Label from '@uikit/molecules/rows/Label'
import { useTranslation } from 'react-i18next'

const CertificationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<RootRouterScreenProps<'Certification'>>()

  const query = useProduct(params.barcode)

  if (!query.isSuccess) {
    return null
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`grow`}>
        <ImageBackground
          style={tw`p-[24px] h-[180px] items-center justify-center`}
          source={require('@assets/images/background.png')}
        >
          <Text style={tw`font-bold text-2xl`}>Svanen</Text>
          <Image
            source={{ uri: query.data.en.image }}
            style={tw`absolute w-[70px] h-[56px] top-[10px] right-[30px]`}
          />
        </ImageBackground>
        <View style={tw`grow w-full px-[35px] justify-center`}>
          <Label
            title={t('screens.certification.labels.status')}
            value="Active"
            titleStyle={'w-[45%]'}
          />
          <Label
            title={t('screens.certification.labels.license')}
            value={'Abc123'}
            titleStyle={'w-[45%]'}
          />
          <Label
            title={t('screens.certification.labels.agency')}
            value={'XXXXX'}
            titleStyle={'w-[45%]'}
          />
          <Label
            title={t('screens.certification.labels.holder')}
            value={'XXXXX'}
            titleStyle={'w-[45%]'}
          />
        </View>
      </View>
      <View style={tw`w-full items-center justify-center py-[14px]`}>
        <Text
          style={tw`text-light_blue text-xl font-light`}
        >{`<<<<GTIN${params.barcode}<<<<`}</Text>
      </View>
    </View>
  )
}

export default CertificationScreen
