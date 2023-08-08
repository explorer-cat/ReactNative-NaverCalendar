import React, {useEffect, useState, useCallback} from 'react';
import {Provider} from 'react-redux';
import store from './src/modules/store/store';
import MainNavigator from './src/navigations/MainNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
