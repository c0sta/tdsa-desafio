import React from "react";

const initialValue = {
  post: {
    postId: 0,
    title: "",
    post: "",
  },
  comment: {
    name: "",
    email: "",
    body: "",
  },
};

const FormContext = React.createContext(initialValue);

const reducer = (state, action) => {
  switch (action.type) {
    case "post":
      return {
        ...state,
        post: action.payload,
      };
    case "comment":
      return {
        ...state,
        comment: action.payload,
      };

    default:
      return;
  }
};

export const FormProvider = ({ children }) => {
  //   const [form, setForm] = React.useState(initialValue);
  const [formState, formDispatch] = React.useReducer(reducer, initialValue);

  //   const setFormValues = (values) => {
  //     setForm((prevData) => ({
  //       ...prevData,
  //       ...values,
  //     }));
  //   };
  console.log("cuzao", formState);
  return (
    <FormContext.Provider value={{ formState, setFormValues: formDispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => React.useContext(FormContext);
