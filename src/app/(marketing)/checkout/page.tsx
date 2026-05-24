"use client";
// src/app/(marketing)/checkout/page.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course");
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        const found = courses.find((c: any) => c.id === courseId || c.id === courseId?.replace(/%20/g, "-").replace(/ /g, "-"));
        setCourse(found);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (courseId) {
      loadCourse();
    } else {
      setIsLoading(false);
    }
  }, [courseId]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading billing details...</div>;
  }

  if (!course) {
    return (
      <div className="py-32 px-6 max-w-3xl mx-auto min-h-[60vh] text-center">
        <h1 className="text-4xl font-heading font-bold text-brand-dark mb-4">Course not found</h1>
        <p className="text-brand-muted text-lg mb-8">Please select a course to enroll from the Course Catalog.</p>
      </div>
    );
  }

  const gst = Math.round(course.price * 0.18);
  const total = course.price + gst;

  return (
    <div className="py-32 px-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-heading font-bold text-brand-dark mb-4">
        Checkout & Billing
      </h1>
      <p className="text-brand-muted text-lg mb-8">
        You are enrolling in <span className="font-bold text-brand-rose">{course.title}</span>. Complete your payment below.
      </p>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-rose/10">
        <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Payment Summary</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-brand-dark">Course Enrollment Fee</span>
            <span className="font-bold">₹{course.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-brand-muted">GST (18%)</span>
            <span className="font-bold">₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg">
            <span className="font-bold text-brand-dark">Total Amount</span>
            <span className="font-bold text-brand-rose">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button 
          className="w-full h-14 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-2"
          onClick={() => alert(`Razorpay Gateway will open here for ₹${total}!`)}
        >
          Pay ₹{total.toLocaleString()} with Razorpay
        </button>
      </div>
    </div>
  );
}
