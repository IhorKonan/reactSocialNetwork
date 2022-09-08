import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
// @ts-ignore
import profileReducer from "./profile-reducer.ts";
// @ts-ignore
import sideBarReducer from "./sidebar-reducer.ts";
// @ts-ignore
import usersReducer from "./users-reducer.ts";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
// @ts-ignore
import appReducer from "./app-reducer.ts";
// @ts-ignore
import authReducer from "./auth-reducer.ts";
// @ts-ignore
import dialogsReducer from "./dialogs-reducer.ts";

let rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBarPage: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>;


export type InfernActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));
// @ts-ignore
window.__store__ = store;

export default store;