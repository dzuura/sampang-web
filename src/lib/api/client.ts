import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

/**
 * Create and configure Axios instance for API calls
 * - Attaches JWT token from localStorage as Authorization header
 * - Handles 401 responses by attempting token refresh
 * - Gracefully handles errors and redirects on auth failure
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

/**
 * Request Interceptor: Attach JWT token to all requests
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor: Handle 401 errors and token refresh
 * When a 401 is received:
 * 1. Attempt to refresh the token
 * 2. If refresh succeeds, retry the original request
 * 3. If refresh fails, clear credentials and redirect to login
 */
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && originalRequest && !((originalRequest as any)._retry)) {
            (originalRequest as any)._retry = true;

            try {
                // Attempt to refresh token
                const refreshResponse = await axios.post(
                    `${API_URL}/auth/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    }
                );

                const newToken = refreshResponse.data.access_token;
                localStorage.setItem('authToken', newToken);

                // Update the original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                // Retry the original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed - clear auth and redirect to login
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
                window.location.href = 'http://localhost:8000/admin/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
