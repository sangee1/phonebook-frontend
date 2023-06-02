import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = ()=>{
    const request =  axios.get(baseUrl);
    return request.then(response=> response.data);
}

const createPerson=(person)=>{
    const request = axios.post(baseUrl,person);
    return request.then(response=>response.data);
}

const updatePerson = (id,changedPerson)=>{
    const request = axios.put(`${baseUrl}/${id}`,changedPerson);
    return request.then(response=>response.data);
}

const deletePerson = (id)=>{
    return axios.delete(`${baseUrl}/${id}`).then(response=>response.data)
}

export default {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}