// import { HiClock } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

// export default function InstitutePending() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4">

//       <div className="w-full max-w-xl bg-[#18181d] border border-[#33333a] rounded-3xl p-10 shadow-2xl text-center">

//         {/* Icon */}
//         <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-6">
//           <HiClock className="text-yellow-400 text-5xl" />
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl font-bold text-white mb-3">
//           Approval Pending
//         </h1>

//         {/* Message */}
//         <p className="text-white text-lg leading-8">
//           Your institute profile has been submitted successfully.
//         </p>

//         <p className="text-gray-500 mt-3">
//           Admin is reviewing your application.
//           Once approved, you will be able to manage
//           classes, trainers, students and bookings.
//         </p>

//         {/* Status */}
//         <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
//           <span className="text-yellow-400 font-semibold">
//             Status : Pending Approval
//           </span>
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex gap-4">

//           <button
//             onClick={() => navigate("/")}
//             className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white"
//           >
//             Back Home
//           </button>

//           <button
//             className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
//           >
//             Contact Admin
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }



import { useEffect } from "react";
import {
  HiClock,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function InstitutePending({ status = "pending" }) {
  const navigate = useNavigate();

  // Redirect approved institutes to institute dashboard
  useEffect(() => {
    if (status === "approved") {
      navigate("/institute/dashboard");
    }
  }, [status, navigate]);

  const isRejected = status === "rejected";

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Card */}
        <div className="relative overflow-hidden bg-[#18181d] border border-[#33333a] rounded-3xl p-8 sm:p-10 shadow-2xl text-center">

          {/* Top Glow */}
          <div
            className={`absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 ${
              isRejected ? "bg-red-500" : "bg-yellow-500"
            }`}
          />

          {/* Content */}
          <div className="relative z-10">

            {/* Status Icon */}
            <div
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-7 ${
                isRejected
                  ? "bg-red-500/15 border border-red-500/20"
                  : "bg-yellow-500/15 border border-yellow-500/20"
              }`}
            >
              {isRejected ? (
                <HiXCircle className="text-red-400 text-6xl" />
              ) : (
                <HiClock className="text-yellow-400 text-6xl" />
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isRejected
                ? "Application Rejected"
                : "Approval Pending"}
            </h1>

            {/* Main Message */}
            {isRejected ? (
              <>
                <p className="text-gray-300 text-lg leading-8">
                  Unfortunately, your institute application was not approved.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  Your institute profile has been reviewed by the admin
                  and was rejected. Please review your profile information
                  and submit again if required.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-300 text-lg leading-8">
                  Your institute profile has been submitted successfully.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  Your application is currently being reviewed by the admin.
                  Once your institute profile is approved, you will be able
                  to access your institute dashboard and manage your
                  trainers, classes, students and bookings.
                </p>
              </>
            )}

            {/* Status Box */}
            <div
              className={`mt-8 rounded-2xl p-5 border ${
                isRejected
                  ? "bg-red-500/10 border-red-500/25"
                  : "bg-yellow-500/10 border-yellow-500/25"
              }`}
            >
              <div className="flex items-center justify-center gap-2">

                {isRejected ? (
                  <HiXCircle className="text-red-400 text-xl" />
                ) : (
                  <HiClock className="text-yellow-400 text-xl" />
                )}

                <span
                  className={`font-semibold ${
                    isRejected
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {isRejected
                    ? "Status : Rejected"
                    : "Status : Pending Approval"}
                </span>

              </div>

              {!isRejected && (
                <p className="text-gray-500 text-sm mt-2">
                  Please wait while the admin reviews your institute
                  application.
                </p>
              )}
            </div>

            {/* Progress Steps */}
            {!isRejected && (
              <div className="mt-8 text-left">

                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center">
                    <HiCheckCircle className="text-green-400 text-2xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Profile Submitted
                    </p>

                    <p className="text-gray-500 text-sm">
                      Your institute application was successfully submitted.
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-5 h-8 border-l border-dashed border-[#444]" />

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center">
                    <HiClock className="text-yellow-400 text-2xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Admin Review
                    </p>

                    <p className="text-gray-500 text-sm">
                      Waiting for admin approval.
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="ml-5 h-8 border-l border-dashed border-[#444]" />

                {/* Step 3 */}
                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
                    <HiCheckCircle className="text-gray-400 text-2xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Institute Dashboard
                    </p>

                    <p className="text-gray-500 text-sm">
                      Available after approval.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Back Home */}
            <button
              onClick={() => navigate("/")}
              className="w-full mt-8 py-3.5 rounded-xl bg-gray-700 hover:bg-gray-600 active:scale-[0.98] transition-all text-white font-medium"
            >
              Back Home
            </button>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-5">
          {isRejected
            ? "You can update your institute profile and submit a new application."
            : "You will be notified when your institute application has been reviewed."}
        </p>

      </div>
    </div>
  );
}

