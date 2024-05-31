import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { concertApi } from "./services/concert";
import { paymentApi } from "./services/payment";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [concertApi.reducerPath]: concertApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, concertApi.middleware, paymentApi.middleware]),
});

export default store;
