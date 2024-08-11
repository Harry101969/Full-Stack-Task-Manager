import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextBoxForRegister from "../components/TextBoxForRegister";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";
import SelectIsAdminOrUser from "../components/SelectIsAdminOrUser";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const LISTS = ["Admin", "User"];
  const [selected, setSelected] = useState(LISTS[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   name, email, password, isAdmin, role, title  need these things in registering
  const [registerUser, { isLoading }] = useRegisterMutation();
  const submitHandler = async (data) => {
    try {
      const userData = {
        ...data,
        isAdmin: selected === "Admin",
      };

      const result = await registerUser(userData).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      setTimeout(() => {
        toast.success("User Registered Successfully!!");
      }, 600);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  const signInHandler = () => {
    console.log("Sign-up clicked");
    navigate("/log-in");
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-3 pb-9"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome!
              </p>
              <p className="text-center text-base text-gray-700 ">
                Keep all your credential safge.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <TextBoxForRegister
                placeholder="Username"
                type="name"
                name="name"
                label="Username"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Username is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <TextBoxForRegister
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <TextBoxForRegister
                placeholder="Your Password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <div className="w-full gap-4 flex flex-row">
                <SelectIsAdminOrUser
                  label="Admin Or User"
                  lists={LISTS}
                  selected={selected}
                  setSelected={setSelected}
                  className="xs:text-sm"
                />
                <TextBoxForRegister
                  placeholder="Role"
                  type="role"
                  name="role"
                  label="Role"
                  className="w-full rounded-full"
                  register={register("role", {
                    required: "Role is required!",
                  })}
                  error={errors?.role ? errors.role?.message : ""}
                />
              </div>

              {/* I dont need the title
              <TextBoxForRegister
                placeholder="Title"
                type="title"
                name="title"
                label="Title"
                className="w-full rounded-full"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors?.role ? errors.role?.message : ""}
              /> */}
              <p
                className="text-sm mt-2 text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
                onClick={signInHandler}
              >
                Sign-In
              </p>

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Register"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
