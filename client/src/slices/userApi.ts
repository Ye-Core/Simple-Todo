import { apiSlice } from "./api"

interface loginInput{
    email : string,
    password : string
}

interface registerInput extends loginInput {
    username : string
}

interface updateInput {
    username?: string;
    email?: string;
    password?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder)=> ({
        login: builder.mutation({
            query: (data: loginInput)=> ({
                url : "login",
                method : "POST",
                body : data,
                credentials : "include"
            })
        }),
        logout: builder.mutation({
            query: ()=> ({
                url : "logout",
                method : "DELETE",
                credentials : "include"
            })
        }),
        register: builder.mutation({
            query: (data: registerInput) => ({
                url : "register",
                method : "POST",
                body : data,
                credentials : "include"
            })
        }),
        updateProfile: builder.mutation({
            query: (data: updateInput) => ({
                url : "profile",
                method : "PUT",
                body : data,
                credentials : "include"
            })
        })
    })
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation} = userApiSlice