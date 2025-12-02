import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: "https://zap-shift-server-weld.vercel.app",
})

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;