import axios from 'axios'

const API=axios.create({baseURL:"https://memories4514.herokuapp.com"})

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

  }
  return req;
})

 
export const fetchPosts=()=>API.get('/posts')
export const createPost=(post)=>API.post('/posts',post)
export const updatePost=(id,post)=> API.patch(`/posts/${id}`,post)
export const deletePost=(id)=> API.delete(`/posts/${id}`)
export const likePost=(id)=>API.patch(`/posts/${id}/like`)


export const signIn=(formData)=> API.post('/user/signin',formData)
export const signUp=(formData)=> API.post('/user/signup',formData)