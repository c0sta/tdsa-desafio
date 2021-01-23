import PropTypes from "prop-types";

const apiPath = "https://jsonplaceholder.typicode.com/";
const getAllCommentsUrl = apiPath + "posts/";
// const getCommentUrl = apiPath + "comments?postId=";
const createCommentUrl = apiPath + "posts/";

export function getAllCommentsFromPost(postId) {
  return fetch(createCommentUrl + postId.toString() + "/comments")
    .then((response) => response.json())
    .then((commentsArray) => commentsArray);
}

export function create({ data, postId }) {
  return fetch(createCommentUrl + postId + "/comments", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return { data };
    });
}

function update(id) {
  return id;
}
