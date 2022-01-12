<template>
  <div id="app">
    <header v-if="userLoggued" class="sticky top-0 w-full shadow-md z-50">
      <!-- Header -->
      <Header />
    </header>
    <main>
      <!-- Main -->
      <router-view />
    </main>
    <footer class="w-full bg-white p-4 relative z-50">
      <!-- Footer -->
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from './views/partials/Header.vue'
import Footer from './views/partials/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      userLoggued: false,
    }
  },
  mounted() {
    // check if user is loggued in with cookie
    this.userLoggued = document.cookie.includes('userId')
  },
}

  /*************************************************************************** /
   *                            CUSTOM SCRITPS                               *
   ***************************************************************************/

  window.addEventListener('DOMContentLoaded', () => {

      // On scroll, the backToTop button is shown or hidden
      window.onscroll = function() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
              backToTop.style.transform = "translateY(-100%)";

              backToTop.addEventListener('click', () => {
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          });
          } else {
              backToTop.style.transform = "translateY(100%)";
          }
        }
      };
  });

  // Create konami code change background image
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiCodeIndex = 0;

  window.addEventListener('keydown', (e) => {
      if (e.keyCode === konamiCode[konamiCodeIndex++]) {
          if (konamiCodeIndex === konamiCode.length) {
              const bodyChange = document.querySelector('body');
              // Change background color infinitively
              setInterval(() => {
                  bodyChange.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
              }, 100);
              // Page scroll top bottom infinitively
              setInterval(() => {
                  window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                  });
              }, 100);
              setInterval(() => {
                  window.scrollTo({
                      top: 100,
                      behavior: 'smooth'
                  });
              }, 150);
              konamiCodeIndex = 0;
          }
      } else {
          konamiCodeIndex = 0;
      }
  });

</script>