import { Dispatch, useEffect, useReducer } from "react";
import { TInputFormState, TInputFormStatePassedOnInit } from "../types/typings";

export const enum REDUCER_ACTION_TYPE {
  SET_INPUT_STATE,
  SET_IS_TEST_PASSED_TO_TRUE,
  SET_IS_TEST_PASSED_TO_FALSE,
  SET_VALIDATION_TO_TRUE,
  SET_VALIDATION_TO_FALSE,
  SET_IS_DIRTY,
  CLEAR_FORM_INPUT,
}

export type Reducer_Action = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const formReducer = (
  state: TInputFormState,
  action: Reducer_Action
): TInputFormState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_INPUT_STATE:
      return { ...state, inputValue: action.payload ?? "" };

    case REDUCER_ACTION_TYPE.SET_IS_TEST_PASSED_TO_TRUE:
      return { ...state, isTestPassed: true };

    case REDUCER_ACTION_TYPE.SET_IS_TEST_PASSED_TO_FALSE:
      return { ...state, isTestPassed: false };

    case REDUCER_ACTION_TYPE.SET_IS_DIRTY:
      return { ...state, isDirty: true };

    case REDUCER_ACTION_TYPE.SET_VALIDATION_TO_TRUE:
      return { ...state, isValid: true };

    case REDUCER_ACTION_TYPE.SET_VALIDATION_TO_FALSE:
      return { ...state, isValid: false };

    case REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT:
      return {
        inputValue: "",
        isTestPassed: false,
        isDirty: false,
        isValid: true,
        errorMessage: state.errorMessage,
      };

    default:
      throw new Error("useFormInput Hook error: bad action.type");
  }
};

export const useFormInput = (
  initialState: TInputFormStatePassedOnInit,
  inputValidationFunction: (input: string) => boolean,
  errorMessage?: string
): [TInputFormState, Dispatch<Reducer_Action>] => {
  ////vars
  const [inputFormState, dispatch] = useReducer(formReducer, {
    inputValue: initialState.inputValue,
    isTestPassed: false,
    isDirty: false,
    isValid: initialState.isValid ?? true,
    errorMessage: errorMessage || "An error occurred.",
  } as TInputFormState);

  ////logic
  //validating input
  const currentInput = inputFormState.inputValue;
  const isTestPassed = inputValidationFunction(inputFormState.inputValue);
  useEffect(() => {
    if (isTestPassed && !inputFormState.isTestPassed)
      dispatch({ type: REDUCER_ACTION_TYPE.SET_IS_TEST_PASSED_TO_TRUE });
    if (!isTestPassed && inputFormState.isTestPassed)
      dispatch({ type: REDUCER_ACTION_TYPE.SET_IS_TEST_PASSED_TO_FALSE });
  }, [currentInput]);

  //overall validation of input -> passed validation of input with callback and isDirty
  const currentIsDirty = inputFormState.isDirty;
  useEffect(() => {
    if (isTestPassed && inputFormState.isDirty) {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_VALIDATION_TO_TRUE });
      return;
    }
    if (!isTestPassed && inputFormState.isDirty) {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_VALIDATION_TO_FALSE });
    }
  }, [currentInput, currentIsDirty]);

  return [inputFormState, dispatch];
};
