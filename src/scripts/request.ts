import axios from 'axios'


interface formDataType {
    name: string;
    email: string;
    title: string;
    body: string;
}

export const postEmail = async function (body: formDataType) {
    return await axios({
        url: '/api/v1/email',
        method: "POST",
        data: body
    })
}