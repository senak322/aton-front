import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Client {
  _id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  taxId: string;
  responsiblePerson: string;
  status: string;
}

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    const response = await axios.get("http://localhost:5000/api/clients", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateClientStatus = createAsyncThunk(
  "clients/updateClientStatus",
  async ({ id, status }: { id: string; status: string }, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;
    const response = await axios.patch(
      `http://localhost:5000/api/clients/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch clients";
      })
      .addCase(updateClientStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(
          (client) => client._id === action.payload._id
        );
        if (index !== -1) {
          state.clients[index].status = action.payload.status;
        }
      })
      .addCase(updateClientStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update client status";
      });
  },
});

export default clientsSlice.reducer;
