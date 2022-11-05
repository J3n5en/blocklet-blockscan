import axios from './api.js';

const fetcher = (...args) => axios(...args).then((res) => res?.data);

export default fetcher;
