import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const { mutateAsync, isSuccess } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        err?.error ||
        "Κάτι πήγε στραβά";
      enqueueSnackbar(message, { variant: "error", autoHideDuration: 4000 });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Η εγγραφή σας ολοκληρώθηκε", {
        variant: "success",
        autoHideDuration: 4000,
      });
      navigate("/login");
    }
  }, [isSuccess]);

  const password = watch("password");

  return (
    <div className="flex flex-col items-center px-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-[450px] shadow-2xl text-white"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6"
        >
          Εγγραφή ✨
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Όνομα
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              {...register("name", {
                required: "Το όνομα είναι απαραίτητο",
              })}
            />
            {errors.name && (
              <p className="text-red-300 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
                required: "Το email είναι απαραίτητο",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Λάθος email",
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
              Κωδικός
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              {...register("password", {
                required: "Ο κωδικός είναι απαραίτητος",
                minLength: {
                  value: 6,
                  message: "Ελάχιστοι χαρακτήρες 6",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Επιβεβαίωση Κωδικού
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              {...register("confirmPassword", {
                required: "Παρακαλώ επιβεβαιώστε τον κωδικό",
                validate: (value) =>
                  value === password || "Οι κωδικοί δεν ταιριάζουν",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-redcolor font-bold py-3 px-1 rounded-xl mt-4 hover:bg-redcolor hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Εγγράφεσαι..." : "Εγγραφή"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-white/60 text-sm">or</div>

        {/* Login Link Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full border-2 border-white text-white font-semibold py-3 px-1 rounded-xl hover:bg-white hover:text-redcolor transition-all duration-300"
        >
          Έχεις ήδη λογαριασμό; Σύνδεση
        </button>
      </motion.div>
    </div>
  );
};

export default Register;
