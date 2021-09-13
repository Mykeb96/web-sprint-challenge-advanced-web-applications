import axios from "axios";


const axiosWithAuth = () => {
    const token = localStorage.getItem('authtoken');

    return axios.create({
        headers: {
            Authorization: token
        },
    });
}

export default axiosWithAuth;
//Task List:
//Build and export a function used to send in our authorization token