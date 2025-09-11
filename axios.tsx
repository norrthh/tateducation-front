"use client";

import axios from "axios";
import useUserStore from "@/store/useUserStore";

const apiClient = axios.create({
	// baseURL: 'https://back.pac-man.online/api',
	// baseURL: 'https://pacman-back.sukhov-family.ru/api',
	baseURL: 'http://127.0.0.1:8000/api',
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
