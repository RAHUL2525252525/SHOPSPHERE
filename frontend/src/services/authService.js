import API from "./api";

export const loginUser = async (data) => {
    const response = await API.post("/users/login", data);
    if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userEmail", response.data.email);
    }
    return response.data;
};

export const registerUser = async (data) => {
    const response = await API.post("/users/register", data);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await API.post("/users/forgot-password", { email });
    return response.data;
};

export const resetPassword = async (email, newPassword) => {
    const response = await API.post("/users/reset-password", {
        email,
        newPassword,
    });
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
};
