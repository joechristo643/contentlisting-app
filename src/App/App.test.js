

import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import myReducer from "../redux/reducer.js";
import rootSaga from "../redux/saga.js";
import userEvent from "@testing-library/user-event";


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = configureStore({
  reducer:{
    gridContent: myReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

test('render input element on search button click',  async () => {
  render(
    <Provider store={store}>
    <App />
</Provider>);

const button = screen.getByAltText('search') 
        // simulate search button click
        userEvent.click(button); 
        const inputElement = screen.getByRole('textbox');

   // expect result
        await waitFor(() =>  
            expect(inputElement).toBeInTheDocument()
       );
  expect(inputElement).toBeInTheDocument();
});