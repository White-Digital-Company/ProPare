import { Image, View } from 'react-native'
import tw from '@tools/tailwind'
import { PrimaryButton } from '@uikit/molecules/Buttons'
import { LanguageDropdown } from '@uikit/molecules'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import type { RootRouterNavigationProps } from '@navigation/RootRouter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Home'>>()
  const { t } = useTranslation()
  const { top } = useSafeAreaInsets()

  return (
    <View style={tw`flex-1 flex-col bg-white`}>
      <View style={tw`flex-1 flex-col`}>
        <View
          style={tw`flex-1 flex-row justify-end pr-[16px] pt-[${16 + top}px]`}
        >
          <LanguageDropdown />
        </View>
        <View style={tw`flex-1 flex-col justify-between items-center`}>
          <Image
            style={tw`h-[59px] w-[300px]`}
            source={require('@assets/images/logo.png')}
            resizeMode="contain"
          />
          <PrimaryButton
            onPress={() => navigation.navigate('Barcode')}
            title={t('screens.home.buttons.scan')}
            buttonStyle="w-[75%]"
          />
        </View>
      </View>
      <View style={tw`flex-1 justify-end`}>
        <View style={tw`bg-dark_blue h-[102px]`} />
      </View>
    </View>
  )
}

export default HomeScreen
