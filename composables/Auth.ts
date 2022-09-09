async function loginAplikasiAuth(user, pass, e) {
  $fetch("/api/auth/login", {
    method: "post",
    body: { username: user, password: pass },
  }).then(async (Audt) => {
    setToken(Audt.data.token);
    if (Audt.result == "success" && Audt.data.token != "") {
      $fetch("/api/auth/profil").then(async (Usdt) => {
        if (Usdt.result == "success") {
          setUser(Usdt.data);
          notifikasi(Audt.result, Audt.title);
          navigateTo("/pilihtahun");
        } else {
          notifikasi(Usdt.result, Usdt.title);
        }
      });
    } else {
      notifikasi(Audt.result, Audt.title);
    }
  });
}

function logoutAplikasi() {
  navigateTo("/auth/logout", { replace: true });
}

export { loginAplikasiAuth, logoutAplikasi };
