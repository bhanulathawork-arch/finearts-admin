import { HiClock } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function InstitutePending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-[#18181d] border border-[#33333a] rounded-3xl p-10 shadow-2xl text-center">

        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-6">
          <HiClock className="text-yellow-400 text-5xl" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Approval Pending
        </h1>

        {/* Message */}
        <p className="text-white text-lg leading-8">
          Your institute profile has been submitted successfully.
        </p>

        <p className="text-gray-500 mt-3">
          Admin is reviewing your application.
          Once approved, you will be able to manage
          classes, trainers, students and bookings.
        </p>

        {/* Status */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
          <span className="text-yellow-400 font-semibold">
            Status : Pending Approval
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">

          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white"
          >
            Back Home
          </button>

          <button
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
          >
            Contact Admin
          </button>

        </div>

      </div>

    </div>
  );
}