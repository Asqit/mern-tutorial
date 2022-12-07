import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalsService';

const initialState = {
	goals: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

// Create a new goal
export const createGoal = createAsyncThunk(
	'goals/create',
	async (goalData, thunkApi) => {
		try {
			const TOKEN = thunkApi.getState().authReducer.user.token;
			return await goalService.createGoal(goalData, TOKEN);
		} catch (error) {
			const message =
				(error.respose &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkApi.rejectWithValue(message);
		}
	}
);

// Get user goals
export const getGoals = createAsyncThunk(
	'goals/getAll',
	async (_, thunkApi) => {
		try {
			const TOKEN = thunkApi.getState().authReducer.user.token;
			return await goalService.getGoals(TOKEN);
		} catch (error) {
			const message =
				(error.respose &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkApi.rejectWithValue(message);
		}
	}
);

// Delete a goal
export const deleteGoal = createAsyncThunk(
	'goals/deleteGoal',
	async (id, thunkApi) => {
		try {
			const TOKEN = thunkApi.getState().authReducer.user.token;
			return await goalService.deleteGoal(id, TOKEN);
		} catch (error) {
			const message =
				(error.respose &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkApi.rejectWithValue(message);
		}
	}
);

export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			}) // Getting all goals
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = action.payload;
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			}) /// Delete a goal
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload.id
				);
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
