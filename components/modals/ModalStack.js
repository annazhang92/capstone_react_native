import { createStackNavigator } from 'react-navigation';

import Login from './login/Login';

const ModalStack = createStackNavigator({
  Login: Login,
}, {
  headerMode: 'none',
  mode: 'modal'
});

export default ModalStack;
