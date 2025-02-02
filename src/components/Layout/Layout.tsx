'use client';
import { persistor, store } from '@/lib/redux/store';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';




const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </PersistGate>
    </Provider>


  )
}

export default Layout