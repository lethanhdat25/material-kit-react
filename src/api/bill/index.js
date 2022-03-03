import axios from 'axios';

const url = 'https://localhost:44349/api/Bills';
export const billApi = {
    postBill: async (data) => {
        return await axios.post(url, data);
    },
    getBill: async () => {
        return await axios.get(url);
    }
};
