import { getLocalStorage } from './localStorage';

const addAxiosHearder = () => {
    const token = getLocalStorage().token;
    const basicAuth = 'Bearer ' + token;
    return {
        Authorization: basicAuth
    };
};
export default addAxiosHearder;
