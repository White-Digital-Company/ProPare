import tw from '@tools/tailwind'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import BarcodeMask from 'react-native-barcode-mask'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner'
import { useNavigation } from '@react-navigation/native'
import type { RootRouterNavigationProps } from '@navigation/RootRouter'

export const BARCODE_READER_BOX_WIDTH = wp(80)
export const BARCODE_READER_BOX_HEIGHT = wp(40)

const BarcodeScreen = () => {
  const navigation = useNavigation<RootRouterNavigationProps<'Barcode'>>()
  const { back: device } = useCameraDevices()
  const [frameProccessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13])

  const [scanned, setScanned] = useState<boolean>(false)

  useEffect(() => {
    Camera.requestCameraPermission()
  }, [])

  useEffect(() => {
    if (barcodes?.length && !scanned) {
      setScanned(true)
      navigation.navigate('Product', { barcode: barcodes[0].rawValue ?? '' })
    }
  }, [barcodes])

  return (
    <View style={tw`flex-1`}>
      {!!device && (
        <Camera
          style={tw`flex-1`}
          device={device}
          isActive={!scanned}
          frameProcessor={frameProccessor}
          frameProcessorFps={5}
        />
      )}

      <View style={tw.style(`absolute top-0 left-0 right-0 bottom-0`)}>
        <BarcodeMask
          width={BARCODE_READER_BOX_WIDTH}
          height={BARCODE_READER_BOX_HEIGHT}
          edgeBorderWidth={5}
          animatedLineColor={tw`text-dark_blue`['color'] as string}
          animatedLineWidth={BARCODE_READER_BOX_WIDTH}
          edgeColor={tw`text-dark_blue`['color'] as string}
        />
      </View>
    </View>
  )
}

export default BarcodeScreen
