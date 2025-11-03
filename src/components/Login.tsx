import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("FORM DATA:", data);
    // TODO: Call login API here
    navigate("/game");
  };

  return (
    <div className="flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-[400px] shadow-2xl text-white"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6"
        >
          Welcome Back 👋
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <p
            onClick={() => navigate("/forgotpassword")}
            className="text-white/70 text-sm underline cursor-pointer hover:text-white transition"
          >
            Forgot Password?
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-redcolor font-bold py-3 rounded-xl mt-4 hover:bg-redcolor hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-white/60 text-sm">or</div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full border-2 border-white text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-redcolor transition-all duration-300"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
