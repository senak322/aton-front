import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientsReducer from '../features/clients/clientsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
