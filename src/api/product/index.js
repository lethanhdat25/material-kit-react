import axios from 'axios';

const url = 'https://localhost:44349/api/';
export const productApi = {
    getData: async () => {
        return await axios.get(url + 'Products');
    },

    getProductById: async (id) => {
        return await axios.get(url + `Products/${id}`);
    }
};
