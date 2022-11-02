import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api/auth'

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = "Bearer " + localStorage.getItem("token");
    return config;
});

async function deletePost(postId) {
    return axios.delete(`${API_BASE_URL}/posts/${postId}`)
}

async function likePost(postId) {
    return axios.put(`${API_BASE_URL}/posts/likes/${postId}`, {})
}

async function commentPost(postId, comment) {
    return axios.put(`${API_BASE_URL}/posts/comments/${postId}`, { comment })
}

export function PostsService() {
    return {
        deletePost,
        likePost,
        commentPost,
    }
}