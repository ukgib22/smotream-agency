"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Bot,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Flame,
  Megaphone,
  Menu,
  MousePointerClick,
  PlayCircle,
  Rocket,
  Scissors,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  WandSparkles,
  X,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Audit", href: "#audit" }
];

const logos = ["BarberPro", "FadeHouse", "GroomLab", "ShopScale", "CartFlow", "UrbanCuts"];

const problems = [
  { title: "Ads burn budget", icon: Flame },
  { title: "Website does not convert", icon: MousePointerClick },
  { title: "Leads do not reply", icon: BellRing },
  { title: "No clear growth system", icon: Target }
];

const solutions = [
  {
    title: "Paid Ads",
    body: "Meta, TikTok and Google campaigns built to generate qualified leads.",
    icon: Megaphone
  },
  {
    title: "Viral Content",
    body: "Short-form content, UGC ads and scroll-stopping hooks built for attention.",
    icon: WandSparkles
  },
  {
    title: "Landing Pages",
    body: "High-converting pages designed to turn visitors into booked calls and purchases.",
    icon: MousePointerClick
  },
  {
    title: "AI Automations",
    body: "Instant lead follow-up, CRM workflows, email/SMS and appointment reminders.",
    icon: Bot
  }
];

const services = [
  {
    title: "Paid Ads",
    body: "Meta Ads, TikTok Ads, Google Ads and retargeting campaigns built to generate qualified leads and purchases.",
    icon: Megaphone,
    accent: "bg-orange text-white"
  },
  {
    title: "Viral Content",
    body: "Short-form videos, UGC ads, hooks and creative testing systems built to capture attention.",
    icon: WandSparkles,
    accent: "bg-purple text-white"
  },
  {
    title: "Funnels & Automation",
    body: "Landing pages, lead forms, CRM workflows, email/SMS follow-up and appointment booking systems.",
    icon: Bot,
    accent: "bg-lime text-ink"
  }
];

const stats = [
  ["+127%", "lead volume"],
  ["3.8x", "ROAS"],
  ["-31%", "cost per acquisition"],
  ["42", "booked calls/month"]
];

const growthProcess = ["Audit", "Strategy", "Build", "Launch", "Optimize"];

const cases = [
  {
    title: "Barbershop Booking Engine",
    problem: "inconsistent weekly bookings",
    strategy: "local Meta ads, booking funnel, SMS reminders",
    result: "42 booked calls in 30 days",
    icon: Scissors
  },
  {
    title: "eCommerce ROAS System",
    problem: "high ad spend with low profitability",
    strategy: "UGC creatives, retargeting, offer testing",
    result: "3.8x ROAS target",
    icon: ShoppingBag
  },
  {
    title: "Local Retention System",
    problem: "customers came once but did not return",
    strategy: "email/SMS automation, referral offer, review flow",
    result: "lower cost per repeat customer",
    icon: BadgeCheck
  }
];

const helpGroups: Array<{
  title: string;
  icon: LucideIcon;
  items: string[];
  style: string;
}> = [
  {
    title: "Barbershops",
    icon: Scissors,
    items: [
      "More appointment bookings",
      "Local lead generation",
      "Retargeting for repeat visits",
      "Review and referral systems"
    ],
    style: "bg-orange text-white"
  },
  {
    title: "eCommerce",
    icon: ShoppingBag,
    items: ["More profitable purchases", "Better ROAS", "Abandoned cart recovery", "Creative testing systems"],
    style: "bg-purple text-white"
  }
];

const auditIncludes = [
  "Funnel teardown",
  "Offer diagnosis",
  "Ad strategy review",
  "Content growth ideas",
  "30-day acquisition plan"
];

const formFields = [
  { id: "name", name: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", name: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "business-type", name: "business_type", label: "Business type", type: "text", autoComplete: "organization" },
  { id: "website", name: "website", label: "Website / Instagram URL", type: "url", autoComplete: "url" },
  { id: "monthly-budget", name: "monthly_revenue", label: "Monthly ad budget", type: "text", autoComplete: "off" }
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function calculateLeadScore({
  monthlyRevenue,
  businessType,
  website,
  biggestProblem
}: {
  monthlyRevenue: string;
  businessType: string;
  website: string;
  biggestProblem: string;
}) {
  const normalizedRevenue = monthlyRevenue.toLowerCase().replace(/[$,\s]/g, "");
  const hasQualifiedRevenue = normalizedRevenue.includes("5000+") || normalizedRevenue.includes("10k+");
  const score =
    (hasQualifiedRevenue ? 70 : 0) +
    (businessType ? 10 : 0) +
    (website ? 10 : 0) +
    (biggestProblem ? 10 : 0);

  return Math.min(score, 100);
}

const faqs = [
  ["Who do you work with?", "We specialize in barbershops and eCommerce brands that want a clearer system for turning attention into booked calls, purchases and repeat revenue."],
  ["Do you work with barbershops?", "Yes. We build local acquisition systems for barbershops using ads, booking funnels, review flows, referrals and automated reminders."],
  ["Do you work with eCommerce brands?", "Yes. We help eCommerce teams improve creative testing, retargeting, offer conversion, abandoned cart recovery and ROAS visibility."],
  ["How fast can we launch?", "Most focused campaigns can move from audit to launch within 10 to 21 days once assets, access and offers are ready."],
  ["Do you create the ads and landing page?", "Yes. We can create strategy, ad concepts, landing pages, tracking, automation flows and the campaign structure needed to launch."],
  ["What platforms do you use?", "We work across Meta, TikTok, Google, landing page platforms, CRM tools, email/SMS systems and automation stacks."],
  ["What results can I expect?", "Results depend on offer, market, budget and sales follow-up. The audit identifies the highest-leverage path before spend is scaled."],
  ["How do I start?", "Request the free growth audit, share your business details, and we will review the biggest revenue leaks in your current acquisition system."]
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: "easeOut" }
  };
}

function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      className={`group relative inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 sm:min-h-14 sm:w-auto sm:px-7 ${
        variant === "primary"
          ? "bg-orange text-white shadow-glow hover:bg-ink hover:shadow-premium"
          : "border border-ink/15 bg-white/80 text-ink hover:border-ink hover:bg-lime hover:shadow-premium"
      }`}
      href={href}
    >
      <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition duration-500 group-hover:left-[115%] group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {variant === "primary" ? <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /> : null}
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp()}>
      <p
        className={`mb-4 inline-flex rounded-full border px-3.5 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.18em] sm:px-4 sm:text-[0.68rem] sm:tracking-[0.22em] ${
          dark ? "border-white/10 bg-white/10 text-lime" : "border-orange/20 bg-orange/10 text-orange"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`font-heading text-[2rem] font-extrabold leading-[1.06] sm:text-4xl lg:text-6xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-4 text-[0.98rem] leading-7 sm:mt-5 sm:text-lg sm:leading-8 ${dark ? "text-white/70" : "text-ink/70"}`}>{text}</p> : null}
    </motion.div>
  );
}

function DashboardMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 0.4, 0] }}
      className="relative mx-auto w-full max-w-[23rem] sm:max-w-xl"
      transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div aria-hidden="true" className="float-shape -left-6 top-2 hidden h-20 w-20 rounded-[1.4rem] bg-lime shadow-premium sm:block sm:-left-10 sm:top-8" />
      <div aria-hidden="true" className="float-shape -right-4 bottom-3 hidden h-16 w-16 rounded-full bg-orange/90 shadow-premium [animation-delay:1.5s] sm:block" />
      <div className="absolute -left-8 top-20 hidden rounded-full border border-ink/10 bg-lime px-5 py-3 text-sm font-extrabold text-ink shadow-premium sm:block">
        Live pipeline
      </div>
      <div className="absolute -right-5 bottom-16 hidden rounded-full bg-purple px-5 py-3 text-sm font-extrabold text-white shadow-premium sm:block">
        CPA down 31%
      </div>
      <div className="relative rounded-[1.6rem] border border-white/80 bg-ink p-2.5 shadow-[0_24px_70px_rgba(17,17,17,0.2)] sm:rounded-[2rem] sm:p-4 sm:shadow-[0_35px_120px_rgba(17,17,17,0.24)]">
        <div className="absolute inset-x-10 -top-5 h-10 rounded-full bg-orange/50 blur-2xl" />
        <div className="relative rounded-[1.25rem] bg-white p-3 sm:rounded-[1.5rem] sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/50 sm:text-xs sm:tracking-[0.2em]">Acquisition cockpit</p>
              <p className="font-heading text-xl font-extrabold text-ink sm:text-2xl">SMOTREAM OS</p>
            </div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-orange sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-purple sm:h-3 sm:w-3" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {[
              ["+127%", "leads", TrendingUp, "bg-lime"],
              ["3.8x", "ROAS", BarChart3, "bg-purple text-white"],
              ["42", "booked calls", ClipboardCheck, "bg-orange text-white"],
              ["-31%", "cost per acquisition", TrendingDown, "bg-cream"]
            ].map(([value, label, Icon, color], index) => (
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.03, 1] }}
                className={`relative overflow-hidden rounded-[1.1rem] p-3 shadow-sm sm:rounded-[1.35rem] sm:p-5 ${color as string}`}
                key={label as string}
                transition={prefersReducedMotion ? undefined : { duration: 3.2, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/20" />
                <Icon className="mb-4 h-4 w-4 sm:mb-6 sm:h-5 sm:w-5" />
                <p className="font-heading text-2xl font-extrabold sm:text-4xl">{value as string}</p>
                <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] opacity-70 sm:text-xs sm:tracking-[0.16em]">{label as string}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 rounded-[1.1rem] border border-ink/10 bg-cream p-3 sm:mt-4 sm:rounded-[1.35rem] sm:p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-bold text-ink/60">
              <span>Funnel health</span>
              <span>87%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                animate={prefersReducedMotion ? undefined : { width: ["42%", "87%", "68%", "87%"] }}
                className="h-full rounded-full bg-orange"
                transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.1rem] bg-ink p-3 text-white sm:mt-4 sm:rounded-[1.35rem] sm:p-4">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-xs sm:tracking-[0.18em]">Next best action</p>
              <p className="mt-1 font-heading text-sm font-extrabold sm:text-base">Launch retargeting sprint</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink sm:h-11 sm:w-11">
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowMobileCta(window.scrollY > 720);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!supabase) {
      setSubmitError("Supabase is not configured. Please add the site environment variables and try again.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const lead = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      business_type: String(formData.get("business_type") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      monthly_revenue: String(formData.get("monthly_revenue") || "").trim(),
      biggest_problem: String(formData.get("biggest_problem") || "").trim(),
      status: "new",
      source: "website",
      lead_score: 0
    };

    lead.lead_score = calculateLeadScore({
      monthlyRevenue: lead.monthly_revenue,
      businessType: lead.business_type,
      website: lead.website,
      biggestProblem: lead.biggest_problem
    });

    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert(lead);
    setIsSubmitting(false);

    if (error) {
      setSubmitError("We could not submit your audit request. Please check your details and try again.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <MotionConfig reducedMotion="user">
    <main className="min-h-screen overflow-hidden bg-cream pb-24 text-ink md:pb-0">
      {/* Sticky navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/90 shadow-[0_10px_40px_rgba(17,17,17,0.06)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
          <a className="flex items-center gap-3" href="#top" aria-label="SMOTREAM home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white shadow-premium sm:h-10 sm:w-10">
              <Sparkles className="h-5 w-5 text-lime" aria-hidden="true" />
            </span>
            <span className="font-heading text-base font-extrabold tracking-tight sm:text-lg">SMOTREAM</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a className="rounded-full px-2 py-1 text-sm font-bold text-ink/70 transition hover:bg-white hover:text-ink" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <ButtonLink href="#audit">Get Free Growth Audit</ButtonLink>
          </div>
          <button
            aria-label="Toggle navigation"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-white shadow-sm md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-ink/10 bg-cream px-4 pb-4 pt-2 shadow-[0_24px_60px_rgba(17,17,17,0.1)] md:hidden"
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                className="block min-h-12 rounded-2xl px-4 py-3.5 text-base font-bold text-ink/75 transition active:bg-white"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mt-2 flex min-h-[3.25rem] items-center justify-center rounded-full bg-orange px-5 text-sm font-extrabold text-white shadow-glow"
              href="#audit"
              onClick={() => setMenuOpen(false)}
            >
              Get Free Growth Audit
            </a>
          </motion.div>
        ) : null}
      </header>

      {/* Hero section */}
      <section className="grain section-glow relative bg-cream pt-24 sm:pt-28" id="top">
        <div aria-hidden="true" className="float-shape left-[6%] top-36 hidden h-12 w-12 rounded-full bg-purple/80 shadow-premium sm:block" />
        <div aria-hidden="true" className="float-shape right-[8%] top-28 hidden h-16 w-16 rounded-[1.2rem] bg-lime shadow-premium [animation-delay:1s] sm:block" />
        <div aria-hidden="true" className="absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-orange/20 blur-3xl" />
        <div aria-hidden="true" className="absolute right-0 top-44 h-80 w-80 rounded-full bg-purple/20 opacity-75 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-10 left-8 hidden h-48 w-48 rounded-full bg-lime/20 blur-3xl lg:block" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-6 sm:gap-12 sm:px-6 sm:pt-14 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:pb-32">
          <motion.div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-ink/10 bg-white/90 px-3.5 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] shadow-[0_12px_40px_rgba(17,17,17,0.06)] backdrop-blur sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.16em]">
              <Zap className="h-4 w-4 text-orange" />
              Premium acquisition systems
            </div>
            <h1 className="mx-auto max-w-4xl font-heading text-[2.85rem] font-extrabold leading-[0.96] tracking-normal text-ink min-[390px]:text-[3.2rem] sm:text-6xl lg:mx-0 lg:text-7xl xl:text-8xl">
              We Scale Brands With Paid Ads & Viral Content
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[1.04rem] font-semibold leading-7 text-ink/70 sm:mt-6 sm:text-xl sm:leading-8 lg:mx-0">
              Meta Ads &bull; TikTok Growth &bull; Funnels &bull; Viral Content &bull; Conversion Systems
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start">
              <ButtonLink href="#audit">Get My Free Audit</ButtonLink>
              <ButtonLink href="#case-studies" variant="secondary">
                <PlayCircle className="h-4 w-4" />
                View Case Studies
              </ButtonLink>
            </div>
            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-ink/60 sm:mt-7 sm:grid-cols-3 lg:mx-0">
              <span className="rounded-full border border-ink/10 bg-white/60 px-3.5 py-2 text-center shadow-sm backdrop-blur">10+ brands worked with</span>
              <span className="rounded-full border border-ink/10 bg-white/60 px-3.5 py-2 text-center shadow-sm backdrop-blur">250k+ content views</span>
              <span className="rounded-full border border-ink/10 bg-white/60 px-3.5 py-2 text-center shadow-sm backdrop-blur">Dozens of funnels reviewed</span>
            </div>
          </motion.div>
          <DashboardMockup />
        </div>
      </section>

      {/* Social proof strip */}
      <section className="relative border-y border-ink/10 bg-white py-4 sm:py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:gap-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <p className="shrink-0 text-xs font-extrabold uppercase tracking-[0.22em] text-ink/50">Trusted growth systems for</p>
          <div className="marquee-mask flex-1 overflow-hidden">
            <div className="marquee-track flex gap-3">
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  className="min-w-36 rounded-full border border-ink/10 bg-cream px-5 py-3 text-center font-heading text-sm font-extrabold shadow-sm sm:min-w-40"
                  key={`${logo}-${index}`}
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The problem"
            title="Your marketing should not feel like guessing."
            text="Most businesses do not have a traffic problem. They have a conversion problem, an offer problem and a follow-up problem."
          />
          <div className="mt-9 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {problems.map((item, index) => (
              <motion.div className="premium-card rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-sm sm:rounded-[1.75rem] sm:p-6" key={item.title} {...fadeUp(index * 0.08)}>
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-orange/10 text-orange sm:mb-8">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative z-10 font-heading text-xl font-extrabold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section className="section-glow relative bg-ink px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="The solution" title="We do not just run ads. We build revenue engines." dark />
          <div className="mt-9 grid gap-3.5 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item, index) => (
              <motion.div className="premium-card dark-card rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:rounded-[1.75rem] sm:p-6" key={item.title} {...fadeUp(index * 0.08)}>
                <div className="relative z-10 mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-orange shadow-glow sm:mb-8">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative z-10 font-heading text-xl font-extrabold">{item.title}</h3>
                <p className="relative z-10 mt-4 leading-7 text-white/70">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we help section */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-lime/30 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Who we help" title="Built for barbershops and eCommerce brands." />
          <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
            {helpGroups.map(({ title, icon: Icon, items, style }) => (
              <motion.div className={`premium-card rounded-[1.6rem] p-6 shadow-premium sm:rounded-[2rem] sm:p-10 ${style}`} key={title} {...fadeUp()}>
                <div className="relative z-10 mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-white/20 sm:mb-10 sm:h-16 sm:w-16 sm:rounded-3xl">
                  <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
                </div>
                <h3 className="relative z-10 font-heading text-[1.85rem] font-extrabold sm:text-4xl">{title}</h3>
                <ul className="relative z-10 mt-6 space-y-3.5 sm:mt-8 sm:space-y-4">
                  {items.map((item) => (
                    <li className="flex items-start gap-3 font-bold leading-6" key={item}>
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28" id="services">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Everything you need to acquire more clients." />
          <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  className="premium-card group rounded-[1.5rem] border border-ink/10 bg-cream p-5 shadow-sm sm:rounded-[1.75rem] sm:p-8"
                  key={service.title}
                  {...fadeUp(index * 0.08)}
                >
                  <div className="relative z-10 mb-8 flex items-start justify-between gap-5">
                    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-glow transition duration-300 group-hover:scale-105 ${service.accent}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="relative z-10 font-heading text-2xl font-extrabold text-ink sm:text-3xl">{service.title}</h3>
                  <p className="relative z-10 mt-4 text-[0.98rem] leading-7 text-ink/70">{service.body}</p>
                  <div className="relative z-10 mt-8 h-px bg-gradient-to-r from-ink/15 via-ink/5 to-transparent" />
                  <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-ink/70">
                    Built for acquisition
                    <ArrowRight className="h-4 w-4 text-orange transition group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results/statistics section */}
      <section className="section-glow relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28" id="results">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Results" title="Built for measurable growth." />
          <div className="mt-9 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {stats.map(([value, label], index) => (
              <motion.div className="premium-card dark-card rounded-[1.5rem] border border-white/10 bg-ink p-5 text-white shadow-premium sm:rounded-[1.75rem] sm:p-7" key={label} {...fadeUp(index * 0.08)}>
                <p className="relative z-10 font-heading text-[2.75rem] font-extrabold text-lime sm:text-6xl">{value}</p>
                <p className="relative z-10 mt-3 text-sm font-bold uppercase tracking-[0.14em] text-white/60">{label}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-ink/60">
            Example performance targets. Actual results depend on offer, market and budget.
          </p>
        </div>
      </section>

      {/* Process section */}
      <section className="section-glow relative bg-ink px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28" id="process">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title="Our 5-step growth process" dark />
          <div className="mt-9 grid gap-3.5 sm:mt-12 sm:gap-4 md:grid-cols-5">
            {growthProcess.map((step, index) => (
              <motion.div className="premium-card dark-card flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:block sm:rounded-[1.75rem] sm:p-6" key={step} {...fadeUp(index * 0.08)}>
                <p className="relative z-10 font-heading text-4xl font-extrabold text-orange sm:mb-10 sm:text-5xl">0{index + 1}</p>
                <h3 className="relative z-10 font-heading text-xl font-extrabold">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28" id="case-studies">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Case studies" title="Premium placeholder wins, built around real growth levers." />
          <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
            {cases.map((study, index) => {
              const Icon = study.icon;

              return (
                <motion.article
                  className="premium-card group rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-sm sm:rounded-[1.75rem] sm:p-7"
                  key={study.title}
                  {...fadeUp(index * 0.08)}
                >
                  <div className="relative z-10 mb-7 flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple text-white shadow-premium transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <span className="rounded-full border border-ink/10 bg-lime px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-ink">
                      Case 0{index + 1}
                    </span>
                  </div>
                  <h3 className="relative z-10 font-heading text-2xl font-extrabold leading-tight text-ink sm:text-[1.7rem]">
                    {study.title}
                  </h3>
                  <div className="relative z-10 mt-7 space-y-3">
                    {[
                      ["Problem", study.problem],
                      ["Strategy", study.strategy],
                      ["Result", study.result]
                    ].map(([label, value]) => (
                      <div className="rounded-2xl border border-ink/10 bg-cream/70 p-4" key={label}>
                        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-orange">{label}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-ink/75">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 mt-6 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
                    <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/55">Outcome</span>
                    <ArrowRight className="h-4 w-4 text-lime transition group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Growth Audit offer section */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28" id="audit">
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-4 rounded-[1.6rem] border border-white/10 bg-ink p-3.5 text-white shadow-[0_28px_90px_rgba(17,17,17,0.22)] sm:gap-8 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <motion.div className="relative overflow-hidden rounded-[1.3rem] bg-orange p-6 text-white sm:rounded-[1.5rem] sm:p-7 lg:p-10" {...fadeUp()}>
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/30 blur-2xl" />
            <Rocket className="relative z-10 mb-6 h-9 w-9 sm:mb-8 sm:h-10 sm:w-10" />
            <h2 className="relative z-10 font-heading text-[2rem] font-extrabold leading-tight sm:text-4xl lg:text-5xl">Get a Free Growth Audit</h2>
            <p className="mt-4 leading-7 text-white/80 sm:mt-5 sm:leading-8">
              We will review your website, offer, ads, content and follow-up system, then show you exactly where your
              revenue is leaking.
            </p>
            <ul className="relative z-10 mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
              {auditIncludes.map((item) => (
                <li className="flex items-start gap-3 rounded-2xl bg-white/15 px-4 py-3 font-bold leading-6" key={item}>
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.form className="grid gap-3.5 rounded-[1.3rem] bg-white p-4 text-ink shadow-premium sm:gap-4 sm:rounded-[1.5rem] sm:p-7" onSubmit={handleSubmit} {...fadeUp(0.12)}>
            {submitted ? (
              <div aria-live="polite" className="grid min-h-[400px] place-items-center text-center" role="status">
                <div>
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-lime">
                    <Check className="h-8 w-8" />
                  </div>
                  <p className="font-heading text-3xl font-extrabold">Your audit request has been received.</p>
                  <p className="mt-3 text-ink/65">We will contact you soon.</p>
                </div>
              </div>
            ) : (
              <>
                {formFields.map((field) => (
                  <label className="grid gap-2 text-sm font-bold" htmlFor={field.id} key={field.id}>
                    {field.label}
                    <input
                      autoComplete={field.autoComplete}
                      className="min-h-[3.25rem] rounded-2xl border border-ink/10 bg-cream px-4 text-base outline-none transition focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,44,0.12)] sm:min-h-12 sm:text-sm"
                      id={field.id}
                      name={field.name}
                      required
                      type={field.type}
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-bold" htmlFor="growth-problem">
                  Biggest growth problem
                  <textarea
                    className="min-h-32 rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-base outline-none transition focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,44,0.12)] sm:min-h-28 sm:text-sm"
                    id="growth-problem"
                    name="biggest_problem"
                    required
                  />
                </label>
                {submitError ? (
                  <p className="rounded-2xl border border-orange/25 bg-orange/10 px-4 py-3 text-sm font-bold leading-6 text-ink" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button
                  className="group mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-extrabold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Get Free Growth Audit"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions before the audit?" />
          <div className="relative mt-8 space-y-2.5 sm:mt-10 sm:space-y-3">
            {faqs.map(([question, answer], index) => (
              <motion.div
                className={`rounded-[1.2rem] border p-1 transition sm:rounded-[1.35rem] ${
                  openFaq === index ? "border-orange/30 bg-orange/5 shadow-premium" : "border-ink/10 bg-cream"
                }`}
                key={question}
                layout
              >
                <button
                  aria-controls={`faq-answer-${index}`}
                  aria-expanded={openFaq === index}
                  className="flex min-h-14 w-full items-center justify-between gap-4 rounded-[1rem] px-4 py-4 text-left font-heading text-[0.98rem] font-extrabold leading-6 sm:gap-5 sm:rounded-[1.1rem] sm:px-7 sm:py-5 sm:text-base"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  type="button"
                >
                  {question}
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition sm:h-9 sm:w-9 ${openFaq === index ? "bg-orange text-white" : "bg-white text-ink"}`}>
                    <ChevronDown className={`h-5 w-5 transition ${openFaq === index ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {openFaq === index ? (
                  <motion.p
                    className="px-4 pb-5 leading-7 text-ink/70 sm:px-7 sm:pb-6"
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {answer}
                  </motion.p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <motion.div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.6rem] bg-ink px-5 py-14 text-center text-white shadow-[0_30px_100px_rgba(17,17,17,0.24)] sm:rounded-[2rem] sm:px-10 sm:py-16 lg:py-24" {...fadeUp()}>
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple/50 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orange/40 blur-3xl" />
          <div aria-hidden="true" className="float-shape left-8 top-10 hidden h-16 w-16 rounded-[1.2rem] bg-lime/90 sm:block" />
          <h2 className="relative z-10 mx-auto max-w-4xl font-heading text-[2.35rem] font-extrabold leading-[1.04] sm:text-5xl lg:text-6xl">
            More leads. More booked calls. Lower cost per acquisition.
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75 sm:mt-5 sm:text-lg sm:leading-8">
            Turn your ads, content and automation into a system that compounds.
          </p>
          <div className="relative z-10 mt-8">
            <ButtonLink href="#audit">Get Free Growth Audit</ButtonLink>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-ink px-4 pb-8 pt-10 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-xl font-extrabold">SMOTREAM Marketing Agency</p>
            <p className="mt-2 text-sm text-white/60">Client acquisition systems for barbershops and eCommerce brands.</p>
            <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-white/60 sm:flex-row sm:items-center sm:gap-4">
              <a className="transition hover:text-orange" href="mailto:contact@smotream.com">
                contact@smotream.com
              </a>
              <a
                className="transition hover:text-orange"
                href="https://instagram.com/smotream.media"
                rel="noopener noreferrer"
                target="_blank"
              >
                @smotream.media
              </a>
            </div>
          </div>
          <a className="text-sm font-extrabold text-lime" href="#audit">
            Get Free Growth Audit
          </a>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div
        className={`mobile-safe-cta fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream/95 px-3 pt-3 shadow-[0_-12px_40px_rgba(17,17,17,0.12)] backdrop-blur-xl transition duration-300 md:hidden ${
          showMobileCta && !menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <a className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange px-5 text-sm font-extrabold text-white shadow-glow active:scale-[0.99]" href="#audit">
          Get Free Growth Audit
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </main>
    </MotionConfig>
  );
}

