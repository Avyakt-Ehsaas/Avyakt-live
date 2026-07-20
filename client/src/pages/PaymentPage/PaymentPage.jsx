import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Leaf, CheckCircle, ShieldCheck, Lock } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../utils/api.js";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {

  const [payload, setPayload] = React.useState({});
  const navigate = useNavigate();

  const [isEligibleForFreeTrial, setIsEligibleForFreeTrial] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to proceed with payment.");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    try {
      const paymentData = localStorage.getItem("paymentData");
      if (paymentData) {
        const parsedData = JSON.parse(paymentData);

        setPayload(parsedData);

        console.log("Parsed Data:", parsedData);
      }
    }
    catch (error) {
      toast.error("Error retrieving payment information. Please try again.");
      navigate("/live-sessions");
    }
  }, []);


  const checkFreeTrialEligibility = async () => {

    try {

      const response = await API.get(
        `/api/subscriptions/free-trial/check-access/${payload?.planId}`
      );

      const message = response.data.message;

if (message === "Eligible for free trial") {

  setIsEligibleForFreeTrial(true);

} else if (
  message === "Trial Subscription Active" ||
  message === "Paid Subscription Active"
) {

  setIsEligibleForFreeTrial(false);

  toast.success("You already have access to this plan.");

  navigate("/live-sessions");

}else if(message === "Trial Expired. Please purchase plan") {

  setIsEligibleForFreeTrial(false);

  toast("Your free trial has expired.");

}
else {

  setIsEligibleForFreeTrial(false);

}

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");

        localStorage.clear();

        navigate("/login");
        return;
      }
      toast.error("Error checking free trial eligibility");
    }
  };

  useEffect(() => {
    if (payload?.planId) {
      checkFreeTrialEligibility();
    }

  }, [payload]);

  const handlePayment = () => {
    try {


    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  }

  const handleFreeTrialEnroll = async () => {
    try {
      const response = await API.post("/api/subscriptions/free-trial/enroll", {
        planId: payload?.planId,
      });
      toast.success("Successfully enrolled in free trial! Your access will be activated shortly.");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
        return;
      }
      toast.error("Error enrolling in free trial");
    }
  };


  return (
    <section className="min-h-screen bg-[#F8FAF2] px-6 py-8 font-dm text-[#2F3E2E]">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-2">

        {/* LEFT CARD */}
        <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_45px_rgba(85,112,73,0.12)]">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6E7] text-[#6FA35F]">
              <User size={22} />
            </div>
            <div>
              <h2 className="heading-large font-season-medium font-med text-left text-greenbase">Your Details</h2>
              <p className="mt-2 font-dm paragraph-secondary text-left text-gray">
                Please review your information before continuing to the payment.
              </p>
            </div>
          </div>

          {payload ? (
            <div className="space-y-5 ">
              <DetailBox icon={<User />} label="Full Name" value={payload?.name} />
              <DetailBox icon={<Mail />} label="Email Address" value={payload?.email} />
              <DetailBox icon={<Phone />} label="WhatsApp Number" value={payload?.whatsapp} />
            </div>
          ) : (
            <p className="text-gray">Loading...</p>
          )}

          <div className="relative mt-8 overflow-hidden rounded-[24px] bg-[#F5FAEF] p-6 pb-10">
            <div className="mb-2 flex items-center gap-3">
              <Leaf className="text-greenbase" size={24} />
              <h3 className="text-greenbase font-med font-dm card-title text-left">
                What happens next?
              </h3>
            </div>

            <ul className="space-y-3 paragraph-secondary text-left text-gray">
              {[
                "You will receive a confirmation on your email & WhatsApp.",
                "Your 21-day live healing access will be activated.",
                "You can join the daily live practice at 9:30 PM IST.",
                "Access to libraries, recordings and resources.",
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle size={16} className="mt-0.5 text-greenbase" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-2 right-2 text-greenbase opacity-30">
              <Leaf size={90} />
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_45px_rgba(85,112,73,0.12)]">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6E7] text-[#6FA35F]">
              <Lock size={21} />
            </div>
            <h2 className="heading-large font-season-medium font-med text-left text-greenbase">Order Summary</h2>
          </div>

          <div className="rounded-[22px] border border-[#E8EEE2] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className=" rounded-md bg-[#6FA35F] px-3 py-1 text-white bg-greenbase-primary  font-dm">
                  Selected Plan
                </span>
                <h3 className="mt-1 font-med text-greenbase font-dm subheading text-left">
                  {payload?.planName}
                </h3>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F8EA] text-[#6FA35F]">
                <Leaf size={36} />
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-[#EEF1EA] pt-4">
              <SummaryRow label="Plan" value={payload?.planName} />
              <SummaryRow label="Duration" value={payload?.planDuration || "Monthly"} />
              {isEligibleForFreeTrial ? (
                <>
                  <SummaryRow
                    label="Original Price"
                    value={
                      <span className="line-through text-red-500">
                        ₹{payload?.price || 499}
                      </span>
                    }
                  />

                  <SummaryRow
                    label="Free Trial Discount"
                    value={
                      <span className="text-greenbase font-dm paragraph-secondary font-semibold">
                        100% OFF
                      </span>
                    }
                  />
                </>
              ) : (
                <SummaryRow
                  label="Price"
                  value={`₹${payload?.price || 499}`}
                />
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#DDE6D5] pt-5">
              <span className="font-med paragraph-secondary text-greenbase">Total Amount</span>
              {isEligibleForFreeTrial ? (
                <div className="flex flex-col items-end">
                  <span className="font-dm paragraph-secondary text-left line-through text-gray">
                    ₹{payload?.price || 499}
                  </span>
                  <span className="font-med font-dm card-title text-greenbase">
                    ₹0
                  </span>
                </div>
              ) : (
                <span className="font-med card-title text-greenbase">
                  ₹{payload?.price || 499}
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-[18px] bg-[#F8FBF5] p-4">
            <ShieldCheck className="text-greenbase" size={28} />
            <div>
              <h4 className="font-med text-greenbase font-dm text-left paragraph-secondary font-dm mb-1">
                100% Secure & Encrypted Payment
              </h4>
              <p className="paragraph-secondary text-left text-gray font-dm">
                Your payment information is safe with us.
              </p>
            </div>
          </div>

          {
            isEligibleForFreeTrial ? (
              <button
                onClick={handleFreeTrialEnroll}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#5F974E] py-4 font-dm text-white shadow-lg shadow-[#5F974E]/25 transition hover:bg-[#4F843F]"
              >
                <Lock size={18} />
                Start Free Trial
              </button>
            ) : (
              <button
                onClick={handlePayment}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#5F974E] py-4 font-dm text-white shadow-lg shadow-[#5F974E]/25 transition hover:bg-[#4F843F]"
              >
                <Lock size={18} />
                Proceed to Secure Payment
              </button>
            )
          }

          <p className="mt-3 paragraph-secondary text-gray font-dm">
            You won’t be charged until the next step.
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            {["VISA", "●●", "RuPay", "UPI", " Pay"].map((pay, index) => (
              <div
                key={index}
                className="flex   h-10 flex-1 items-center justify-center rounded-lg bg-[#F7F8F4] paragraph-secondary text-gray shadow-sm"
              >
                {pay}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-[#71AC61] bg-white p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6E7] text-greenbase">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="paragraph-secondary text-gray text-left font-dm">{label}</p>
        <h4 className="mt-1 paragraph-secondary text-left text-greenbase font-dm">{value}</h4>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-med text-primary font-dm paragraph-secondary text-left">{label}</span>
      <span className="font-med text-greenbase font-dm paragraph-secondary text-left">{value}</span>
    </div>
  );
}