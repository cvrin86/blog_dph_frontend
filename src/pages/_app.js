import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";
import Head from "next/head";
import "../styles/globals.css";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const reducers = combineReducers({ user });
const persistConfig = { key: "photoblog - 99999999", storage };
import { Toaster } from "react-hot-toast";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// Configurer le store redux
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Blog Photo</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </PersistGate>
    </Provider>
  );
}
