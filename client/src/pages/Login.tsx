import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/Login";

import {useLoginMutation} from "../slices/userApi"
import { useDispatch, useSelector } from "react-redux";

import  {setUserInfo}  from "../slices/auth";
import {  toast } from "react-toastify";
import { useNavigate } from "react-router";
import type { RootState } from "../store";
import { useEffect } from "react";


interface IFormInputs extends z.infer<typeof loginSchema> {}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<IFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const [login, {isLoading}]  = useLoginMutation()
    const userInfo = useSelector((state: RootState) => state.auth.userInfo)
    const submit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const res = await login(data).unwrap();
            dispatch(setUserInfo(res));
            reset();
            navigate("/");
        } catch (err: any) {
            
            toast.error(err?.data?.message || err.error);
        }
        
    };
    useEffect(()=> {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);
  return (
    <div className='max-w-lg mx-auto'>
        <h2 className='text-3xl font-medium mb-2 mt-20'>Login</h2>
        <form className='flex flex-col space-y-2' onSubmit={handleSubmit(submit)}>
           
            <div>
                <label htmlFor="Email" className='block mb-1 text-sm text-gray-500'>Email</label>
                <input type="email" className='form' {...register("email")} />
                {errors.email && <span className="text-rose-500 text-sm font-medium">{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="Password" className='block mb-1 text-sm text-gray-500'>Password</label>
                <input type="password" className='form' {...register("password")} />
                {errors.password && <span className="text-rose-500 text-sm font-medium">{errors.password.message}</span>}
            </div>
            <button type='submit' className=' text-white bg-emerald-500 border rounded-sm py-2 px-4' disabled={isSubmitting || isLoading}>Login</button>
        </form>
    </div>
  )
}

export default Login