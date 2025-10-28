import reducer, { startLoading, stopLoading } from "./loadingSlice";
import type { LoadingState } from "@/types/podcast";

describe("loadingSlice", () => {
  const initialState: LoadingState = { isLoading: false };

  it("debe retornar el estado inicial por defecto", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("debe activar el estado de carga con startLoading", () => {
    const nextState = reducer(initialState, startLoading());
    expect(nextState.isLoading).toBe(true);
  });

  it("debe desactivar el estado de carga con stopLoading", () => {
    const loadingState: LoadingState = { isLoading: true };
    const nextState = reducer(loadingState, stopLoading());
    expect(nextState.isLoading).toBe(false);
  });
});
