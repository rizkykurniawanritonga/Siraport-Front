async function loginAplikasiAuth(user, pass) {
  return $fetch("/api/auth/login", {
    method: "post",
    body: { username: user, password: pass },
  }).then(async (Audt) => {
    if (Audt.result == "success" && Audt.data.token != "") {
      setToken(Audt.data.token);
      $fetch("/api/auth/profil").then(async (Usdt) => {
        if (Usdt.result == "success") {
          let objaddUsers = {
            rememberPass: pass,
          };
          // obj variabile could be empty or not, it's the same
          const userData = { ...Usdt.data, ...objaddUsers };
          setUser(userData);
          notifikasi(Audt.result, Audt.title);
          navigateTo("/pilihtahun");
        } else {
          notifikasi(Usdt.result, Usdt.title);
        }
      });
    } else {
      notifikasi(Audt.result, Audt.title);
      return false;
    }
  });
}

function logoutAplikasi() {
  return navigateTo({ path: "/auth/logout" }, { replace: true });
}

export { loginAplikasiAuth, logoutAplikasi };
