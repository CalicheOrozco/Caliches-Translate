import { AUTO_LANGUAGES } from "../constants";
import {
  type Action,
  type State,
  type Language,
  type FromLanguage,
} from "../types";
import { useReducer } from "react";

// 1. Create a initialState
const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "es",
  fromText: "",
  result: "",
  loading: false,
};

// 2. Create a reducer
const reducer = (state: State, action: Action) => {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    // logic of the state inside the reducer
    // Avoid changing the state if the fromLanguage is auto
    if (state.fromLanguage === AUTO_LANGUAGES) return state;

    const loading = state.fromText !== ''
    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: state.fromText,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = state.fromText !== ''
    return {
      ...state,
      fromText: action.payload,
      loading,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
};

export function useStore() {
  // 3. Use the reducer
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };


  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
