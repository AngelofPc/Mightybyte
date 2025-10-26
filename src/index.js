import { AppRegistry } from 'react-native';
import App from './App';
const appName = 'mightybyte-react-react-native-challenge';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
