import 'react-native-gesture-handler'
import '@i18n'
import tw from '@tools/tailwind'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDeviceContext } from 'twrnc'
import RootRouter from '@navigation/RootRouter'

const App = () => {
  useDeviceContext(tw)

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootRouter />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

export default App
