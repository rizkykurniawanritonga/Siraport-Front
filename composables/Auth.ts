async function loginAplikasiAuth(user, pass, e) {
  const Audt = await apiKoneksi(
    "/auth/login",
    {
      body: {
        username: user,
        password: pass,
      },
    },
    "POST"
  );
  if (Audt.result == "success" && Audt.data.token != "") {
    const Usdt = await apiKoneksi("/profil", {
      headers: {
        Authorization: `Bearer ${Audt.data.token}`,
      },
    });
    if (Usdt.result == "success") {
      // simpan Firebase Firestore appUsage
      setToken(Audt.data.token);
      setUser(Usdt.data);
      notifikasi(Audt.result, Audt.title);
      navigateTo("/pilihtahun");
    } else {
      notifikasi(Usdt.result, Usdt.title);
    }
  } else {
    notifikasi(Audt.result, Audt.title);
  }
}

function logoutAplikasi() {
  navigateTo("/auth/logout", { replace: true });
}

export { loginAplikasiAuth, logoutAplikasi };
