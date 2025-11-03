import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Send reset email to:", data.email);
    // ✅ TODO: axios.post("/api/auth/reset-password-request", data)
  };

  return (
    <div className="flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[400px] shadow-2xl text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Forgot Password 🔐
        </motion.h2>

        <p className="text-white/70 text-sm text-center mb-6">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-redcolor font-bold py-3 rounded-xl hover:bg-redcolor hover:text-white transition-all duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-white/80 text-sm hover:text-white transition-all"
        >
          ← Back to Login
        </button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
