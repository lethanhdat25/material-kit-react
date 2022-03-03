import axios from 'axios';

const url = 'https://localhost:44349/api/Accounts/';
export const userApi = {
    getUser: async (params, value) => {
        return await axios.get(url + params + `/?${params}=${value}`);
    },
    editUser: async (data,) => {
        return await axios.put(url + data.id, data);
    },
};
