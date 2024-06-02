import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { concertApi } from "./services/concert";
import { paymentApi } from "./services/payment";
import { settingConcertApi } from "./services/settingConcert";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [concertApi.reducerPath]: concertApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [settingConcertApi.reducerPath]: settingConcertApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, concertApi.middleware, paymentApi.middleware, settingConcertApi.middleware]),
});

export const resetApiState = () => {
  store.dispatch(authApi.util.resetApiState());
  store.dispatch(concertApi.util.resetApiState());
  store.dispatch(paymentApi.util.resetApiState());
  store.dispatch(settingConcertApi.util.resetApiState());
  // Add more resetApiState calls for each additional API slice you have
};

export default store;
