import { Text, TouchableOpacity } from 'react-native'
import tw from '@tools/tailwind'
import { useTranslation } from 'react-i18next'

export interface LabelProps {
  title: string
  value: string | number
  titleStyle?: string
  isButton?: boolean
  onPress?: () => void
}

const Label = ({
  title,
  value,
  titleStyle = '',
  isButton = false,
  onPress,
}: LabelProps) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      disabled={!isButton}
      activeOpacity={0.7}
      onPress={onPress && onPress}
      style={tw`mb-[14px] flex-row`}
    >
      <Text
        android_hyphenationFrequency="normal"
        style={tw`font-medium text-black text-lg w-[35%] mr-[10px] leading-7 ${titleStyle}`}
      >
        {title}
      </Text>
      <Text style={tw`font-normal w-[65%] text-lg text-light_blue leading-7`}>
        {`${value} `}
        {isButton && (
          <Text style={tw`text-sm font-extrabold leading-7 underline`}>
            {t('screens.product.buttons.more')}
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  )
}

export default Label
