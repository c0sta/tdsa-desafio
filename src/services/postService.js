const apiPath = "https://jsonplaceholder.typicode.com";
const getAllUrl = apiPath + "/posts";
const createUrl = apiPath + "/posts";
const getByIdUrl = (id) => `${apiPath}/posts/${id}`;
const updateUrl = (id) => `${apiPath}/posts/${id}`;
const deleteUrl = (id) => `${apiPath}/posts/${id}`;

function getAllPosts() {
  return fetch(getAllUrl)
    .then((response) => response.json())
    .then((postsArray) => postsArray);
}

function getPost(id) {
  return fetch(getByIdUrl(id))
    .then((response) => response.json())
    .then((postObject) => postObject);
}

function create(data) {
  return fetch(createUrl, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Criado: ", data);
      return { data };
    });
}

function update(formData, postId) {
  return fetch(updateUrl(postId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Editado: ", data);
      return { data };
    });
}

function deletePost(id) {
  return fetch(deleteUrl(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log("Deletado!", response);
    response.json();
  });
}

export const postService = {
  getAll: getAllPosts,
  getById: getPost,
  create,
  update,
  delete: deletePost,
};
