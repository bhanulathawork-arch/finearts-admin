

// import { useState } from "react";
// import { adminLogin } from "../services/auth.service";

// function Login() {
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await adminLogin(formData);

//       console.log("FULL LOGIN RESPONSE:", res);

//       const token =
//         res?.token ||
//         res?.data?.token ||
//         res?.data?.data?.token;

//       if (!token) {
//         alert("Token not received from server");
//         return;
//       }

//       /* SAVE LOGIN DATA */
//      localStorage.setItem("adminToken", token);
// localStorage.setItem("role", "ADMIN");

// console.log("EXTRACTED TOKEN:", token);

// console.log(
//   "ADMIN TOKEN AFTER SAVE:",
//   localStorage.getItem("adminToken")
// );

// console.log(
//   "ROLE AFTER SAVE:",
//   localStorage.getItem("role")
// );
//       /* REDIRECT */
//       window.location.href = "/dashboard";

//     } catch (err) {
//       console.error(
//         err?.response?.data || err.message
//       );

//       alert("Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background-dark px-4">
//       <div className="w-full max-w-md glass-effect rounded-3xl p-8 border border-white/10 shadow-2xl">

//         {/* Logo */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mb-4">
//             <span className="text-white text-3xl font-bold">
//               DP
//             </span>
//           </div>

//           <h1 className="text-3xl font-bold gradient-text">
//             Admin Login
//           </h1>

//           <p className="text-gray-400 text-sm mt-2">
//             Welcome back to Dance Platform
//           </p>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <label className="block text-sm text-gray-300 mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl gradient-bg text-white font-semibold disabled:opacity-50"
//           >
//             {loading
//               ? "Logging in..."
//               : "Login"}
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default Login;



import { useState } from "react";
import { adminLogin } from "../services/auth.service";

function Login() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await adminLogin(formData);

      console.log("FULL ADMIN LOGIN RESPONSE:", res);

      const token =
        res?.token ||
        res?.data?.token ||
        res?.data?.data?.token;

      if (!token) {
        console.error("ADMIN TOKEN NOT RECEIVED:", res);
        alert("Token not received from server");
        return;
      }

      // Remove old/conflicting authentication values
      localStorage.removeItem("token");

      // Store ADMIN authentication separately
      localStorage.setItem("adminToken", token);
      localStorage.setItem("role", "ADMIN");

      console.log(
        "ADMIN TOKEN SAVED:",
        localStorage.getItem("adminToken")
      );

      console.log(
        "ADMIN ROLE:",
        localStorage.getItem("role")
      );

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(
        "ADMIN LOGIN ERROR:",
        err?.response?.data || err.message
      );

      alert(
        err?.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark px-4">
      <div className="w-full max-w-md glass-effect rounded-3xl p-8 border border-white/10 shadow-2xl">

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mb-4">
            <span className="text-white text-3xl font-bold">
              DP
            </span>
          </div>

          <h1 className="text-3xl font-bold gradient-text">
            Admin Login
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Welcome back to Dance Platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-bg text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;