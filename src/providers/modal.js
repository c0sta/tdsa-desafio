import React from "react";

const initialState = {
  isOpen: false,
  title: "",
  type: "",
  postId: 0,
};
export const ModalContext = React.createContext(initialState);

const reducer = (state, action) => {
  // console.log("Reducer =>", state, action);
  switch (action.type) {
    case "open":
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        type: action.payload.type,
        postId: action.payload.postId,
      };
    case "close":
      return {
        ...initialState,
      };
    default:
      return;
  }
};

export const ModalProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ModalContext.Provider
      value={{ modalState: state, setToggleModal: dispatch }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
