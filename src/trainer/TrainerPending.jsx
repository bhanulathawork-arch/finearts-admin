
import { useEffect } from "react";
import { HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function TrainerPending({ status = "pending" }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "approved") {
      navigate("/trainer/dashboard");
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

          {/* Status Icon */}
          <div className="relative z-10">

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
              {isRejected ? "Application Rejected" : "Approval Pending"}
            </h1>

            {/* Main Message */}
            {isRejected ? (
              <>
                <p className="text-gray-300 text-lg leading-8">
                  Unfortunately, your trainer application was not approved.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  Your profile has been reviewed by the admin and was rejected.
                  Please review your profile information and submit again if
                  required.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-300 text-lg leading-8">
                  Your trainer profile has been submitted successfully.
                </p>

                <p className="text-gray-500 mt-3 leading-7">
                  Your application is currently being reviewed by the admin.
                  Once your profile is approved, you will be able to access
                  your trainer dashboard and manage your courses, schedules,
                  students and bookings.
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
                    isRejected ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {isRejected
                    ? "Status : Rejected"
                    : "Status : Pending Approval"}
                </span>

              </div>

              {!isRejected && (
                <p className="text-gray-500 text-sm mt-2">
                  Please wait while the admin reviews your application.
                </p>
              )}
            </div>

            {/* Progress Steps */}
            {!isRejected && (
              <div className="mt-8 text-left">

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center">
                    <HiCheckCircle className="text-green-400 text-2xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Profile Submitted
                    </p>
                    <p className="text-gray-500 text-sm">
                      Your application was successfully submitted.
                    </p>
                  </div>
                </div>

                <div className="ml-5 h-8 border-l border-dashed border-[#444]" />

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

                <div className="ml-5 h-8 border-l border-dashed border-[#444]" />

                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
                    <HiCheckCircle className="text-gray-400 text-2xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Trainer Dashboard
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
            ? "You can update your profile and submit a new application."
            : "You will be notified when your application has been reviewed."}
        </p>

      </div>
    </div>
  );
}