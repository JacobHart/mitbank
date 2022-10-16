import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: null,
  },

  reducers: {

    registerSuccess: (state, action) => {
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        }
    },

    registerFail: (state, action) => {
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
    },

    userLoaded: (state, action) => {
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        }
    },

    authError: (state, action) => {
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
    },

    loginSuccess: (state, action) => {
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        }
    },

    loginFail: (state, action) => {
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
    },

    logOut: (state, action) => {
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
    }

  
  }
});

export const { registerSuccess, registerFail, userLoaded, authError, loginSuccess, loginFail, logOut } = authSlice.actions;


export default authSlice.reducer;
