import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activities";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(800);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateError = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateError.push(data.errors[key]);
                    }
                }
                throw modalStateError.flat()
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: Activity) => axios.post('/activities', activity),
    update: (activity: Activity) => axios.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;