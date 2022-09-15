<template>
  <div class="authentication-bg min-vh-100">
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="d-flex flex-column min-vh-100 px-3 pt-4">
        <div class="row justify-content-center my-auto">
          <div class="mb-4 pb-2">
            <NuxtLink
              to="/"
              class="flex justify-center auth-logo animate__animated animate__faster animate__fadeInUp"
            >
              <img
                src="~/assets/images/logopemprovsu.png"
                alt=""
                style="width: 140px"
              />
            </NuxtLink>
          </div>
          <slot />
        </div>
        <!-- end row -->
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center p-4">
              <p>
                © SIRAPORT. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by
                <NuxtLink to="https://www.biroumumsumut.id"
                  >Biro Umum Setdaprovsu</NuxtLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end container -->
  </div>
</template>
