"use client";
// src/app/(marketing)/checkout/page.tsx
export default function CheckoutPage() {
  return (
    <div className="py-32 px-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-heading font-bold text-brand-dark mb-4">
        Checkout & Billing
      </h1>
      <p className="text-brand-muted text-lg mb-8">
        Build your custom billing flow, payment gateway integration, and OTP-based authentication here.
      </p>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-rose/10">
        <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Payment Summary</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-brand-dark">Course Enrollment</span>
            <span className="font-bold">₹1,999</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-brand-muted">GST (18%)</span>
            <span className="font-bold">₹360</span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg">
            <span className="font-bold text-brand-dark">Total</span>
            <span className="font-bold text-brand-rose">₹2,359</span>
          </div>
        </div>

        <button 
          className="w-full h-14 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-2"
          onClick={() => alert("Razorpay Gateway will open here!")}
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
}
