import axios from 'axios';

const url = 'https://localhost:44349/api/Carts';
export const cartApi = {
    postCart: async (data) => {
        return await axios.post(url, data);
    },
    getCart: async () => {
        return await axios.get(url);
    }
};
