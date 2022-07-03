import axios from 'axios';
const URL = 'http://localhost:8000';
const authenticate = async (user)=>{
    try {
        const response = await axios.post(`${URL}/formData`,user);
        return await response.data;
    } catch (error) {
        console.log("error while calling api",error.message);
    }
};

export {authenticate};