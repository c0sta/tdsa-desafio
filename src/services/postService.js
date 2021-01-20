const apiPath = "https://jsonplaceholder.typicode.com/";
const getAllPostsUrl = apiPath + "posts";
const getPostUrl = apiPath + "post/";

function getAllPosts() {
  return fetch(getAllPostsUrl)
    .then((response) => response.json())
    .then((postsArray) => postsArray);
}

function getPost(id) {
  return fetch(getPostUrl + JSON.stringify(id))
    .then((response) => response.json())
    .then((postObject) => console.log(postObject));
}

export { getAllPosts, getPost };
