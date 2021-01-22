import PropTypes from "prop-types";

const apiPath = "https://jsonplaceholder.typicode.com/";
const getAllPostsUrl = apiPath + "posts";
const getPostUrl = apiPath + "post/";
const createPostUrl = apiPath + "posts";

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

function create(data) {
  return fetch(createPostUrl, {
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

export { getAllPosts, getPost, create };

getPost.propTypes = {
  id: PropTypes.number,
};
update.propTypes = {
  id: PropTypes.number,
};
create.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.string,
    title: PropTypes.string,
  }),
};
