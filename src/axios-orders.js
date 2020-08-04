import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f6a5c.firebaseio.com/'
});

export default instance;