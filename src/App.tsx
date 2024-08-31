import "./App.css";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("It worked data", data);
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(submitData)}>
          <label>First Name:</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <span>{errors?.firstName?.messages}</span>}
          <label htmlFor="">Last Name:</label>
          <input type="text" {...register("lastName")} />
          <label htmlFor="">Email:</label>
          <input type="email" {...register("email")} />
          <label htmlFor="">Age:</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          <label htmlFor="">Password:</label>
          <input type="password" {...register("password")} />
          <label htmlFor="">Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default App;
