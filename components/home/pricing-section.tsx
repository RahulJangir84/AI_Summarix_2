"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon, Zap, Star } from "lucide-react";
import constants, { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv, MotionSection } from "../common/motion";
import { useRef, useState, useEffect } from "react";

type PriceType = {
  id: string;
  title: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const data = constants();

const PricingCard = ({
  price,
  description,
  items,
  paymentLink,
  title,
  id,
}: PriceType) => {
  const isPro = id === "pro";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: x * -8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <MotionDiv
      variants={itemVariants}
      className="relative w-full max-w-[420px]"
    >
      {/* Outer glow for Pro card */}
      {isPro && (
        <>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 opacity-70 blur-sm animate-pulse-glow" />
          <div className="absolute -inset-[2px] rounded-2xl bg-indigo-600 opacity-100" />
        </>
      )}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease" : "transform 0.4s ease",
        }}
        className={cn(
          "relative z-10 flex h-full flex-col gap-6 rounded-2xl p-7 border transition-shadow duration-300",
          isPro
            ? "bg-white dark:bg-gradient-to-b dark:from-[#0f1128] dark:to-[#0a0c1e] border-indigo-200 dark:border-transparent shadow-xl hover:shadow-2xl"
            : "bg-white dark:bg-[#0a0c1e] border-slate-200/80 dark:border-white/8 hover:border-slate-300 dark:hover:border-white/15 shadow-md hover:shadow-lg"
        )}
      >
        {/* Badge */}
        {isPro && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#7882E3] px-4 py-1 text-xs font-bold text-white shadow-lg">
              <Star className="h-3 w-3 fill-white" />
              Most Popular
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-xl text-slate-900 dark:text-white capitalize">{title}</p>
            {isPro && <Zap className="h-4 w-4 fill-indigo-600 dark:fill-indigo-400 text-indigo-600 dark:text-indigo-400" />}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">${price}</span>
          <div className="mb-1.5">
            <p className="text-xs uppercase font-bold text-slate-500 leading-none">USD</p>
            <p className="text-xs text-slate-500">/month</p>
          </div>
        </div>

        {/* Divider */}
        <div className={cn("h-px w-full", isPro ? "bg-indigo-200 dark:bg-indigo-500/30" : "bg-slate-200 dark:bg-white/8")} />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className={cn(
                "flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full",
                isPro ? "bg-indigo-100 dark:bg-indigo-500/20" : "bg-slate-100 dark:bg-white/8"
              )}>
                <CheckIcon className={cn("h-3 w-3", isPro ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400")} />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={paymentLink}
          className={cn(
            "group inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300",
            isPro
              ? "bg-[#3b438d] hover:bg-[#2f3575] text-white shadow-lg hover:shadow-xl"
              : "bg-slate-100 dark:bg-white/8 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
          )}
        >
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </MotionDiv>
  );
};


export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.005 }}
      className="relative overflow-hidden bg-white dark:bg-[#080918]"
      id="pricing"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 py-24 lg:pb-20 lg:pt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <MotionDiv variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-6">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Simple,{" "}
            <span className="bg-[#7882E3] bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg max-w-xl mx-auto">
            No hidden fees, no surprises. Start free and upgrade when you need more.
          </p>
        </MotionDiv>


        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8">
          {data.plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}