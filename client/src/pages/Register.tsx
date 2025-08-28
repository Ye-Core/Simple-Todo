import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import * as z from "zod";
import { registerSchema } from "../schema/Register";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterMutation } from "../slices/userApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";



interface IFormInputs extends z.infer<typeof registerSchema> {}

const Register = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting} , reset} = useForm<IFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const [registerMutation, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate();
    const submit: SubmitHandler<IFormInputs> = async(data) => {
        try {
            await registerMutation(data);
            reset();
            navigate("/login")
            toast.success("Registration successful!");
        } catch (err : any) {
            toast.error(err?.data?.message || err.error);
            
        }
        
    }
  return (
    <div className='max-w-lg mx-auto'>
        <h2 className='text-3xl font-medium mb-2 mt-20'>Register</h2>
        <form className='flex flex-col space-y-2' onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="Username" className='block mb-1 text-sm text-gray-500'>Name</label>
                <input type="text" className='form' {...register("username")} />
                {errors.username && <span className="text-rose-500 text-sm font-medium">{errors.username.message}</span>}
            </div>
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
            <button type='submit' className=' text-white bg-emerald-500 border rounded-sm py-2 px-4' disabled={isSubmitting || isLoading}>Register</button>
        </form>
    </div>
  )
}

export default Register