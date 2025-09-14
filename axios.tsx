"use client";

import axios from "axios";
import useUserStore from "@/store/useUserStore";

const apiClient = axios.create({
	baseURL: 'https://tateducationapi.tech-tonic.ru/api',
	headers: {
		'Content-Type': 'application/json',
    	'Accept': 'application/json, text/plain, */*',
	},
});

apiClient.interceptors.request.use((config) => {
	const { bearerToken } = useUserStore.getState();
	if (bearerToken) {
		config.headers.Authorization = `Bearer ${bearerToken}`;
	}
	return config;
});

export default apiClient;
