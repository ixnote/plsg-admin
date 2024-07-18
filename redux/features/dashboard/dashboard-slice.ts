import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  toggle: boolean;
  trips: any[] | null;
  vehicles: any[] | null;
  vehicle: any | null;
}

const initialState: DashboardState = {
  toggle: false,
  trips: null,
  vehicles: null,
  vehicle: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    selectTrip: (state, action: PayloadAction<any>) => {
      state.trips = [...(state.trips || []), action.payload];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    selectVehicle: (state, action: PayloadAction<any>) => {
      console.log(action.payload);

      if (action.payload.insert) {
        state.vehicle = action.payload.vehicle;
        state.vehicles = [...(state.vehicles || []), action.payload.vehicle];
      } else {
        state.vehicles = state.vehicles?.filter(
          (vehicle) => vehicle.id != action.payload.vehicle.id
        ) as any;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggle, selectTrip, selectVehicle } = dashboardSlice.actions;
export default dashboardSlice.reducer;
