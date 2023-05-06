import validace from 'json-validace'
import { writable } from 'svelte/store';


const { Schema } = validace
interface customErr {
    required: string;
    type: string;
}

const customErr: customErr = {
    required: '%key% feild is required!',
    type: "value is not a valid %key%"
}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMessage = writable({
    name: "",
    email: "",
    title: "",
    body: ""
})

const func = function (result: any) {
    errorMessage.update((value: any) => ({ ...value, [result.key]: result.errorMessages[0] ?? "" }))
}



export const Form = new Schema({
    name: {
        type: "string",
        default: "anonimous",
        func: func
    },
    email: {
        type: ["email", customErr.type],
        required: [true, customErr.required],
        func: func
    },
    title: {
        type: "string",
        required: [true, customErr.required],
        func: func
    },
    body: {
        type: "string",
        required: [true, customErr.required],
        func: func
    }
})



