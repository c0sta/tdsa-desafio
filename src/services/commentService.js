export const commentService = {
  getAllByPostId,
  create,
};

const apiPath = "https://jsonplaceholder.typicode.com";
const getByIdUrl = (postId) => `${apiPath}/posts/${postId}/comments`;
const createUrl = (postId) => `${apiPath}/posts/${postId}`;

function getAllByPostId(postId) {
  return fetch(getByIdUrl(postId))
    .then((response) => response.json())
    .then((commentsArray) => commentsArray)
    .catch((error) => alert("Erro ao buscar comentários desse post"));
}

function create({ commentData, postId }) {
  return fetch(createUrl(postId), {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => response.json())
    .catch((error) => alert("Erro ao comentar no post"));
}
