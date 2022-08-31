import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
    // The private keys which are only available within server-side
    // apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase:
        process.env.NODE_ENV == "production"
          ? process.env.API_URL
          : process.env.MODE_API == "IP"
          ? process.env.API_URL_IP
          : process.env.API_URL_DEV,
      mode: process.env.NODE_ENV,
      firebaseConfig: {
        apiKey: "AIzaSyB7lH3etimNlofkLeI2xL28Ua6IthLKBAM",
        authDomain: "siraport.firebaseapp.com",
        databaseURL:
          "https://siraport-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "siraport",
        storageBucket: "siraport.appspot.com",
        messagingSenderId: "915697351395",
        appId: "1:915697351395:web:6001f8d6d26eb643a523d6",
        measurementId: "G-0G55SFKHQJ",
      },
    },
  },
});
