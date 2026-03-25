import Image from "next/image";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Heading from "@/components/heading";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  MapPin,
  Shield,
  Sparkles,
  PawPrint,
  Camera,
  Users,
  Star,
  ChevronRight,
  WifiOff,
  BarChart3,
  Stethoscope,
  ClipboardCheck,
  Code2,
  AlertTriangle,
} from "lucide-react";

const Page = () => {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100/50 -z-10" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-300/15 rounded-full blur-3xl -z-10" />

        <MaxWidthWrapper className="pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/60 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-200/50 mb-6 backdrop-blur-sm">
                <Sparkles className="size-4" />
                <span>AI-Assisted Rescue &amp; Adoption</span>
              </div>

              <Heading className="!text-5xl sm:!text-6xl lg:!text-7xl !leading-[1.1] !tracking-tight">
                Rescue,{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                    Rehome,
                  </span>
                </span>
                <br />
                & Reunite
              </Heading>

              <p className="mt-6 max-w-lg text-lg text-zinc-600 leading-relaxed">
                Sri Lanka&apos;s intelligent platform for stray animal
                management. Report strays with photos &amp; GPS, let AI classify
                urgency, and connect animals with shelters and loving homes — all
                in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "!text-base !px-8 !py-6 !rounded-xl gap-2 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300",
                  })}
                >
                  Get Started
                  <ArrowRight className="size-5" />
                </Link>

                <Link
                  href="/report/upload"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "!text-base !px-8 !py-6 !rounded-xl gap-2 border-brand-200 text-brand-700 hover:bg-brand-50 transition-all duration-300",
                  })}
                >
                  <Camera className="size-5" />
                  Report a Stray
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="size-10 rounded-full ring-2 ring-white bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center"
                    >
                      <PawPrint className="size-4 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    Trusted by{" "}
                    <span className="font-semibold text-zinc-700">500+</span>{" "}
                    citizens &amp; shelters
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image Grid */}
            <div className="relative lg:pl-8">
              <div className="relative grid grid-cols-2 gap-4">
                {/* Main image */}
                <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 ring-1 ring-black/5">
                  <Image
                    src="/hero-dog.png"
                    alt="Happy golden retriever puppy"
                    width={700}
                    height={400}
                    className="w-full h-[300px] md:h-[350px] object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Secondary images */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                  <Image
                    src="/hero-cat.png"
                    alt="Cute orange kitten"
                    width={350}
                    height={250}
                    className="w-full h-[180px] md:h-[200px] object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                  <Image
                    src="/hero-rescue.png"
                    alt="Happy rescued dog"
                    width={350}
                    height={250}
                    className="w-full h-[180px] md:h-[200px] object-cover"
                  />
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-2xl shadow-xl p-4 ring-1 ring-black/5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Heart className="size-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zinc-900">1,200+</p>
                    <p className="text-sm text-zinc-500">Animals Rescued</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Capabilities Bar ── */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10">
        <MaxWidthWrapper>
          <p className="text-center text-sm font-medium text-zinc-400 uppercase tracking-wider mb-8">
            One intelligent platform for stray animal rescue
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[
              { icon: AlertTriangle, label: "AI Urgency Triage" },
              { icon: MapPin, label: "GPS Reporting" },
              { icon: BarChart3, label: "Hotspot Analytics" },
              { icon: WifiOff, label: "Offline Support" },
              { icon: Code2, label: "Developer APIs" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-zinc-400"
              >
                <Icon className="size-5" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Problem Section ── */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-brand-25">
        <MaxWidthWrapper>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-600 ring-1 ring-rose-100 mb-4">
                <AlertTriangle className="size-4" />
                The Problem
              </div>
              <Heading className="!text-3xl sm:!text-4xl">
                Stray Animal Management in Sri Lanka is{" "}
                <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                  Broken
                </span>
              </Heading>
              <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
                Thousands of stray animals roam Sri Lanka&apos;s streets with no
                centralized system to track, manage, or rehome them. Citizens
                have nowhere to report, shelters operate in silos, and adoption
                remains a manual, fragmented process.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  stat: "No",
                  label: "Centralized Reporting System",
                  color: "text-rose-500",
                },
                {
                  stat: "Fragmented",
                  label: "Citizen-Shelter Communication",
                  color: "text-amber-500",
                },
                {
                  stat: "Manual",
                  label: "Adoption Processes",
                  color: "text-orange-500",
                },
                {
                  stat: "Zero",
                  label: "Data-Driven Decision Making",
                  color: "text-red-500",
                },
              ].map(({ stat, label, color }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 shadow-sm"
                >
                  <p className={`text-2xl font-bold ${color} mb-1`}>{stat}</p>
                  <p className="text-sm text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Features Section ── */}
      <section className="py-24 md:py-32">
        <MaxWidthWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 mb-4">
              <PawPrint className="size-4" />
              Core Features
            </div>
            <Heading className="!text-3xl sm:!text-4xl">
              Everything Needed for{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Animal Rescue
              </span>
            </Heading>
            <p className="mt-4 text-lg text-zinc-500">
              AI-powered tools for reporting, managing, and adopting stray
              animals — built for low-resource environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Stray Reporting System",
                description:
                  "Report stray animals with photos, GPS location, and descriptions. AI automatically classifies urgency — Urgent, High, Average, or Low.",
                color: "#3b82f6",
                bg: "bg-blue-50",
              },
              {
                icon: Sparkles,
                title: "AI Urgency Classification",
                description:
                  "Powered by Gemini API, our AI analyzes images and text to triage reports by severity, ensuring the most critical cases get immediate attention.",
                color: "#8b5cf6",
                bg: "bg-violet-50",
              },
              {
                icon: Stethoscope,
                title: "Pet Profile Management",
                description:
                  "Create detailed pet profiles tracking health, vaccinations, behavior, and adoption readiness. Manage listings for shelters and volunteers.",
                color: "#10b981",
                bg: "bg-emerald-50",
              },
              {
                icon: ClipboardCheck,
                title: "Adoption Workflow",
                description:
                  "End-to-end adoption pipeline — browse pets, submit applications, admin review, and status notifications until the pet finds a forever home.",
                color: "#f59e0b",
                bg: "bg-amber-50",
              },
              {
                icon: BarChart3,
                title: "Hotspot Heatmaps",
                description:
                  "Identify abandonment hotspots with interactive heatmaps. Data-driven analytics help shelters allocate resources where they're needed most.",
                color: "#f43f5e",
                bg: "bg-rose-50",
              },
              {
                icon: WifiOff,
                title: "Offline Capability",
                description:
                  "Submit reports without internet connection. Data is saved locally and auto-syncs when you're back online — built for low-bandwidth areas.",
                color: "#6991d2",
                bg: "bg-brand-50",
              },
            ].map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="group relative rounded-2xl bg-white p-8 ring-1 ring-gray-100 hover:ring-brand-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`size-14 rounded-2xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="size-7" style={{ color }} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">{description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ChevronRight className="size-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── How It Works Section ── */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-brand-25 to-white relative overflow-hidden">
        <div className="absolute top-40 -right-20 w-72 h-72 bg-brand-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" />

        <MaxWidthWrapper>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 mb-4">
              <Heart className="size-4" />
              How It Works
            </div>
            <Heading className="!text-3xl sm:!text-4xl">
              From Street to{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Safe Home
              </span>
            </Heading>
            <p className="mt-4 text-lg text-zinc-500">
              Whether you&apos;re a citizen reporting a stray, a volunteer, or a
              shelter admin — PawMatch streamlines the entire rescue pipeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

            {[
              {
                step: "01",
                title: "Report with Photo & GPS",
                description:
                  "Spot a stray? Snap a photo, tag the GPS location, and submit a report — even offline. It auto-syncs when you reconnect.",
                icon: Camera,
              },
              {
                step: "02",
                title: "AI Triages & Matches",
                description:
                  "Our AI classifies urgency (Urgent / High / Average / Low) and matches the report with nearby shelters and existing lost-pet listings.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Shelter Manages & Adopts",
                description:
                  "Shelters receive reports, create pet profiles, track health & vaccinations, and process adoption applications through a streamlined workflow.",
                icon: Heart,
              },
            ].map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="relative text-center">
                <div className="inline-flex items-center justify-center size-32 rounded-full bg-white shadow-lg ring-1 ring-brand-100 mb-8 mx-auto relative z-10">
                  <div className="size-24 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                    <Icon className="size-10 text-brand-600" />
                  </div>
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold rounded-full size-8 flex items-center justify-center ring-4 ring-white z-20">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                  {title}
                </h3>
                <p className="text-zinc-500 max-w-xs mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── User Roles Section ── */}
      <section className="py-24 md:py-32">
        <MaxWidthWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 mb-4">
              <Users className="size-4" />
              Built for Everyone
            </div>
            <Heading className="!text-3xl sm:!text-4xl">
              One Platform,{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Many Roles
              </span>
            </Heading>
            <p className="mt-4 text-lg text-zinc-500">
              PawMatch serves everyone in the animal rescue ecosystem — from
              concerned citizens to shelter administrators and developers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: "Public Citizen",
                description:
                  "Spot and report stray animals with photos and GPS. Track your reports and see the impact you're making in your community.",
                icon: Camera,
                color: "#3b82f6",
                bg: "bg-blue-50",
              },
              {
                role: "Adopter",
                description:
                  "Browse available pets, get AI-powered recommendations, submit adoption applications, and track your application status.",
                icon: Heart,
                color: "#f43f5e",
                bg: "bg-rose-50",
              },
              {
                role: "Volunteer",
                description:
                  "Help manage pet profiles, upload photos, update health records, and support shelters with day-to-day operations.",
                icon: Users,
                color: "#10b981",
                bg: "bg-emerald-50",
              },
              {
                role: "Shelter Admin",
                description:
                  "Manage your shelter's animals, review adoption applications, track health & vaccinations, and access hotspot analytics.",
                icon: Shield,
                color: "#f59e0b",
                bg: "bg-amber-50",
              },
              {
                role: "Developer",
                description:
                  "Access PawMatch APIs — Text Similarity, Data Structuring, and Hotspot Analytics — with API key generation and docs.",
                icon: Code2,
                color: "#8b5cf6",
                bg: "bg-violet-50",
              },
            ].map(({ role, description, icon: Icon, color, bg }) => (
              <div
                key={role}
                className="group rounded-2xl bg-white p-8 ring-1 ring-gray-100 hover:ring-brand-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`size-14 rounded-2xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="size-7" style={{ color }} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {role}
                </h3>
                <p className="text-zinc-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-brand-25 to-white">
        <MaxWidthWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 mb-4">
              <Star className="size-4" />
              Testimonials
            </div>
            <Heading className="!text-3xl sm:!text-4xl">
              Stories That{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Warm Hearts
              </span>
            </Heading>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Kumari Perera",
                role: "Pet Adopter, Colombo",
                quote:
                  "I found my dog Bella through PawMatch's AI recommendations. The adoption workflow was so smooth — from application to approval, everything was transparent and quick.",
                stars: 5,
              },
              {
                name: "Arjun Fernando",
                role: "Rescue Volunteer, Kandy",
                quote:
                  "The reporting tool is a lifesaver. I can photograph strays and submit reports even when I'm in areas with poor connectivity. It syncs automatically when I get back online.",
                stars: 5,
              },
              {
                name: "Nadia Jayasinghe",
                role: "Shelter Manager, Galle",
                quote:
                  "The hotspot heatmaps changed how we allocate our rescue teams. We can now prioritize areas with the highest concentration of strays. The urgency AI is incredibly accurate.",
                stars: 5,
              },
            ].map(({ name, role, quote, stars }) => (
              <div
                key={name}
                className="group relative rounded-2xl bg-white p-8 ring-1 ring-gray-100 hover:ring-brand-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-semibold text-sm">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{name}</p>
                    <p className="text-sm text-zinc-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-20 bg-gradient-to-r from-brand-700 via-brand-800 to-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptLTQgOHYyaC0ydi0yaDJ6bTAgLTR2MmgtMnYtMmgyek0yMCAzNHYyaC0ydi0yaDJ6bTAtNHYyaC0ydi0yaDJ6bTEyLTEydjJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,200+", label: "Animals Rescued" },
              { value: "5,000+", label: "Strays Reported" },
              { value: "150+", label: "Partner Shelters" },
              { value: "10K+", label: "Active Community Members" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading">
                  {value}
                </p>
                <p className="text-brand-200 text-sm md:text-base">{label}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-50/50 to-brand-100/30 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl -z-10" />

        <MaxWidthWrapper>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 mb-8">
              <PawPrint className="size-10 text-brand-600" />
            </div>

            <Heading className="!text-3xl sm:!text-4xl lg:!text-5xl">
              Ready to Make a{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Difference?
              </span>
            </Heading>

            <p className="mt-6 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Every stray deserves a chance. Join PawMatch and be part of Sri
              Lanka&apos;s movement for smarter, more compassionate animal
              rescue.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/sign-up"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "!text-base !px-10 !py-6 !rounded-xl gap-2 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300",
                })}
              >
                Join PawMatch
                <ArrowRight className="size-5" />
              </Link>

              <Link
                href="/report/upload"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "!text-base !px-10 !py-6 !rounded-xl gap-2 border-brand-200 text-brand-700 hover:bg-brand-50 transition-all duration-300",
                })}
              >
                Report a Stray
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-gray-50/50 py-16">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-semibold">
                Paw<span className="text-brand-700">Match</span>
              </Link>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
                AI-powered stray animal rescue &amp; adoption platform for Sri
                Lanka. Built for communities, shelters, and developers.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">
                Platform
              </p>
              <ul className="space-y-3">
                {[
                  "Report a Stray",
                  "Browse Pets",
                  "Adopt",
                  "Dashboard",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-500 hover:text-brand-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">
                Resources
              </p>
              <ul className="space-y-3">
                {["API Documentation", "Analytics", "FAQ", "Support"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-zinc-500 hover:text-brand-600 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">
                Company
              </p>
              <ul className="space-y-3">
                {["About", "Shelters", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-500 hover:text-brand-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} PawMatch. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-zinc-400">
              Made with{" "}
              <Heart className="size-4 fill-rose-500 text-rose-500 mx-1" /> for
              Sri Lanka&apos;s animals
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </>
  );
};

export default Page;
