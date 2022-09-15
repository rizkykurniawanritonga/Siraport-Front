import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    viewport:
      "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Sistem Informasi Realiasi Anggaran pada OPD Biro Umum - Real Time.",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    noscript: [
      {
        children:
          "Aplikasi memerlukan Javascript untuk dapat berjalan, pastikan anda mengupdate versi browser anda ke versi yang terbaru.",
      },
    ],
  },
  css: ["~/assets/scss/app.scss"],
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV == "production"
          ? process.env.API_URL
          : process.env.MODE_API == "IP"
          ? process.env.API_URL_IP
          : process.env.API_URL_DEV,
      mode: process.env.NODE_ENV,
    },
  },
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        /* redis connector options */
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 5, // Defaults to 0
      },
    },
  },
});
