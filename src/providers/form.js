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
  comments: [],
  posts: [],
  isSearching: false,
  foundPosts: [],
  searchField: "",
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
    case "comments":
      return {
        ...state,
        comments: [...action.payload],
      };
    case "posts":
      return {
        ...state,
        posts: [...action.payload],
      };
    case "search":
      return {
        ...state,
        isSearching: (action.payload.searchField.length > 0) | false,
        searchField: action.payload.searchField,
        foundPosts: state.posts.filter(
          (post) =>
            post.title
              .toLowerCase()
              .search(action.payload.searchField.toLowerCase()) !== -1
        ),
      };
    default:
      return;
  }
};

export const FormProvider = ({ children }) => {
  const [formState, formDispatch] = React.useReducer(reducer, initialValue);

  console.log("FormState => ", formState);
  return (
    <FormContext.Provider value={{ formState, setFormValues: formDispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => React.useContext(FormContext);
