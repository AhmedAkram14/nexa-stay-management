import { createContext, useContext } from "react";

const FormLayoutContext = createContext({ isModal: false });

export function FormLayoutProvider({ isModal = false, children }) {
  return (
    <FormLayoutContext.Provider value={{ isModal }}>
      {children}
    </FormLayoutContext.Provider>
  );
}

export function useFormLayout() {
  return useContext(FormLayoutContext);
}
