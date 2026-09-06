<script lang="ts">
  import { IconSize } from "$shared/icons";
  import { ArrowRight, Gamepad2 } from "@lucide/svelte";
  import type { Component } from "svelte";

  interface Particle {
    left: string;
    top: string;
    sizeClass: string;
    colorClass: string;
    animationClass: string;
    delay: string;
    duration: string;
  }

  interface Props {
    href: string;
    title: string;
    kicker?: string;
    meta?: string;
    Icon?: Component;
  }

  let { href, title, kicker = "Game Hub", meta, Icon = Gamepad2 }: Props = $props();

  // Static particle field: positions are decorative only (aria-hidden).
  // Visibility + drift are driven purely by daisyUI / Tailwind group-hover utilities.
  const particles: Particle[] = [
    {
      left: "8%",
      top: "72%",
      sizeClass: "size-1.5",
      colorClass: "bg-primary",
      animationClass: "animate-ping",
      delay: "0s",
      duration: "1.8s",
    },
    {
      left: "16%",
      top: "28%",
      sizeClass: "size-1",
      colorClass: "bg-secondary",
      animationClass: "animate-pulse",
      delay: "0.2s",
      duration: "2.2s",
    },
    {
      left: "26%",
      top: "64%",
      sizeClass: "size-2",
      colorClass: "bg-accent",
      animationClass: "animate-ping",
      delay: "0.6s",
      duration: "2.6s",
    },
    {
      left: "34%",
      top: "22%",
      sizeClass: "size-1",
      colorClass: "bg-primary",
      animationClass: "animate-pulse",
      delay: "0.1s",
      duration: "1.6s",
    },
    {
      left: "44%",
      top: "76%",
      sizeClass: "size-1.5",
      colorClass: "bg-secondary",
      animationClass: "animate-bounce",
      delay: "0.4s",
      duration: "2s",
    },
    {
      left: "54%",
      top: "30%",
      sizeClass: "size-1",
      colorClass: "bg-accent",
      animationClass: "animate-ping",
      delay: "0.9s",
      duration: "2.4s",
    },
    {
      left: "63%",
      top: "68%",
      sizeClass: "size-2",
      colorClass: "bg-primary",
      animationClass: "animate-pulse",
      delay: "0.3s",
      duration: "2.8s",
    },
    {
      left: "72%",
      top: "24%",
      sizeClass: "size-1.5",
      colorClass: "bg-secondary",
      animationClass: "animate-ping",
      delay: "0.7s",
      duration: "1.9s",
    },
    {
      left: "80%",
      top: "62%",
      sizeClass: "size-1",
      colorClass: "bg-accent",
      animationClass: "animate-bounce",
      delay: "0.5s",
      duration: "2.1s",
    },
    {
      left: "88%",
      top: "34%",
      sizeClass: "size-1.5",
      colorClass: "bg-primary",
      animationClass: "animate-pulse",
      delay: "1s",
      duration: "2.5s",
    },
    {
      left: "92%",
      top: "78%",
      sizeClass: "size-1",
      colorClass: "bg-secondary",
      animationClass: "animate-ping",
      delay: "0.15s",
      duration: "2.3s",
    },
    {
      left: "48%",
      top: "48%",
      sizeClass: "size-1",
      colorClass: "bg-accent",
      animationClass: "animate-pulse",
      delay: "0.8s",
      duration: "1.7s",
    },
  ];
</script>

<a
  {href}
  class="group card bg-base-100 border-base-300 hover:border-primary/50 hover:shadow-primary/10 focus-visible:outline-primary relative block overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:transform-none"
  aria-label="{title} — Explore Tunes"
>
  <!-- Ambient glow blob -->
  <div
    aria-hidden="true"
    class="bg-primary/20 group-hover:bg-primary/30 pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-3xl transition-all delay-75 duration-700 group-hover:scale-150 motion-reduce:transition-none"
  ></div>
  <div
    aria-hidden="true"
    class="bg-secondary/10 group-hover:bg-secondary/20 pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full blur-3xl transition-all delay-150 duration-700 group-hover:scale-125 motion-reduce:transition-none"
  ></div>

  <!-- Ghost typography backdrop -->
  <div
    aria-hidden="true"
    class="text-base-content/5 group-hover:text-primary/10 pointer-events-none absolute -bottom-4 left-4 z-0 text-7xl leading-none font-black tracking-tighter whitespace-nowrap uppercase transition-all duration-700 select-none group-hover:-translate-x-2 motion-reduce:transition-none sm:text-8xl"
  >
    {title}
  </div>

  <!-- Particle field (typography-adjacent sparkle layer, hover-revealed) -->
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
    {#each particles as particle (particle.left + particle.top)}
      <span
        class="absolute rounded-full opacity-0 transition-all duration-700 group-hover:-translate-y-4 group-hover:opacity-100 motion-reduce:transition-none {particle.sizeClass} {particle.colorClass} {particle.animationClass} motion-reduce:animate-none"
        style="left: {particle.left}; top: {particle.top}; animation-delay: {particle.delay}; animation-duration: {particle.duration};"
      ></span>
    {/each}
  </div>

  <!-- Shine sweep -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[450%] motion-reduce:hidden"
  ></div>

  <div class="card-body relative z-10 gap-3 p-6 sm:p-8">
    <div class="flex flex-wrap items-center gap-2">
      {#if Icon}
        <span
          class="border-base-300 bg-base-200 group-hover:border-primary/40 group-hover:text-primary inline-flex rounded-xl border p-2.5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 motion-reduce:transition-none"
        >
          <Icon size={IconSize.Large} />
        </span>
      {/if}
      {#if meta}
        <span class="badge badge-ghost group-hover:badge-outline transition-colors duration-500">{meta}</span>
      {/if}
    </div>

    <p
      class="text-base-content/60 group-hover:text-secondary text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 group-hover:tracking-[0.45em]"
    >
      {kicker}
    </p>

    <h2
      class="card-title group-hover:text-primary text-3xl font-black tracking-tight text-balance transition-all duration-500 group-hover:translate-x-1 motion-reduce:transition-none sm:text-4xl"
    >
      {title}
    </h2>

    <!-- Animated underline -->
    <div
      aria-hidden="true"
      class="from-primary to-secondary h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-32 motion-reduce:transition-none"
    ></div>

    <div class="card-actions mt-2 items-center justify-between gap-2">
      <span
        class="group-hover:text-primary text-sm font-bold tracking-wide uppercase transition-all duration-500 group-hover:tracking-widest"
      >
        Explore Tunes
      </span>
      <span
        class="btn btn-primary btn-sm btn-circle group-hover:shadow-primary/30 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110 group-hover:shadow-lg motion-reduce:transition-none"
        aria-hidden="true"
      >
        <ArrowRight
          size={IconSize.Medium}
          class="transition-transform duration-500 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
    </div>
  </div>
</a>
