import { useNavigate } from "react-router-dom";

function LoginMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center">
      <div className="w-[430px] bg-[#18181d] border border-[#33333a] rounded-3xl p-10 shadow-2xl">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6">
          DP
        </div>

        <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">
          Fine Arts Login
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Choose your login type
        </p>

        <div className="space-y-5">
          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg"
          >
            Admin Login
          </button>

          <button
            onClick={() => navigate("/institute-login")}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg"
          >
            Institute Login
          </button>

          <button
            onClick={() => navigate("/trainer-login")}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg"
          >
            Trainer Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginMenu;