import {
  createStackNavigator,
  type StackNavigationProp,
} from '@react-navigation/stack'
import type { RouteProp } from '@react-navigation/native'
import HomeScreen from '@screens/Home'
import BarcodeScreen from '@screens/Barcode'
import ProductScreen from '@screens/Product'

export type RootStackParamList = {
  Home: undefined
  Barcode: undefined
  Product: {
    barcode: string
  }
}

export type RootRouterScreenProps<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>

export type RootRouterNavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>

const Stack = createStackNavigator<RootStackParamList>()

const RootRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootRouter
