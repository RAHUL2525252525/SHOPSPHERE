import API from "./api";


// Get all orders (Admin)
export const getOrders = async () => {

    try {

        const response = await API.get(
            "/orders"
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};



// Get user orders
export const getOrdersByUser = async (email) => {

    try {

        const response = await API.get(
            `/orders/user/${email}`
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};



// Get order by id
export const getOrderById = async (id) => {

    try {

        const response = await API.get(
            `/orders/${id}`
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};



// Create order
export const createOrder = async (orderData) => {

    try {

        const response = await API.post(
            "/orders/place",
            orderData
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};



// Cancel order
export const cancelOrder = async (id) => {

    try {

        const response = await API.put(
            `/orders/cancel/${id}`
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};



// Update order status
export const updateOrderStatus = async (id, status) => {

    try {

        const response = await API.put(
            `/orders/${id}/status`,
            {
                status
            }
        );

        return response.data;

    } catch(error) {

        throw error;

    }

};