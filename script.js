
      (function () {
        "use strict";

        /**
         * Preloader
         */
        window.addEventListener("load", function () {
          const preloader = document.getElementById("preloader");
          if (preloader) {
            setTimeout(function () {
              preloader.style.opacity = "0";
              preloader.style.visibility = "hidden";
              setTimeout(function () {
                preloader.style.display = "none";
              }, 500);
            }, 1000);
          }
        });

        /**
         * Easy selector helper function
         */
        const select = (el, all = false) => {
          el = el.trim();
          if (all) {
            return [...document.querySelectorAll(el)];
          } else {
            return document.querySelector(el);
          }
        };

        /**
         * Easy event listener function
         */
        const on = (type, el, listener, all = false) => {
          let selectEl = select(el, all);
          if (selectEl) {
            if (all) {
              selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
              selectEl.addEventListener(type, listener);
            }
          }
        };

        /**
         * Easy on scroll event listener
         */
        const onscroll = (el, listener) => {
          el.addEventListener("scroll", listener);
        };

        /**
         * Navbar links active state on scroll
         */
        let navbarlinks = select("#navbar .scrollto", true);
        const navbarlinksActive = () => {
          let position = window.scrollY + 200;
          navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
              position >= section.offsetTop &&
              position <= section.offsetTop + section.offsetHeight
            ) {
              navbarlink.classList.add("active");
            } else {
              navbarlink.classList.remove("active");
            }
          });
        };
        window.addEventListener("load", navbarlinksActive);
        onscroll(document, navbarlinksActive);

        /**
         * Scrolls to an element with header offset
         */
        const scrollto = (el) => {
          let header = select("#header");
          let offset = header.offsetHeight;

          if (!header.classList.contains("header-scrolled")) {
            offset -= 16;
          }

          let elementPos = select(el).offsetTop;
          window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth",
          });
        };

        /**
         * Toggle .header-scrolled class to #header when page is scrolled
         */
        let selectHeader = select("#header");
        let selectTopbar = select("#topbar");
        if (selectHeader) {
          const headerScrolled = () => {
            if (window.scrollY > 100) {
              selectHeader.classList.add("header-scrolled");
              if (selectTopbar) {
                selectTopbar.classList.add("topbar-scrolled");
              }
            } else {
              selectHeader.classList.remove("header-scrolled");
              if (selectTopbar) {
                selectTopbar.classList.remove("topbar-scrolled");
              }
            }
          };
          window.addEventListener("load", headerScrolled);
          onscroll(document, headerScrolled);
        }

        /**
         * Mobile nav toggle
         */
        on("click", ".mobile-nav-toggle", function (e) {
          select("#navbar").classList.toggle("navbar-mobile");
          this.classList.toggle("bi-list");
          this.classList.toggle("bi-x");
        });

        /**
         * Scroll with ofset on links with a class name .scrollto
         */
        on(
          "click",
          ".scrollto",
          function (e) {
            if (select(this.hash)) {
              e.preventDefault();

              let navbar = select("#navbar");
              if (navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile");
                let navbarToggle = select(".mobile-nav-toggle");
                navbarToggle.classList.toggle("bi-list");
                navbarToggle.classList.toggle("bi-x");
              }
              scrollto(this.hash);
            }
          },
          true
        );

        /**
         * Scroll with ofset on page load with hash links in the url
         */
        window.addEventListener("load", () => {
          if (window.location.hash) {
            if (select(window.location.hash)) {
              scrollto(window.location.hash);
            }
          }
        });

        /**
         * Initiate glightbox
         */
        const glightbox = GLightbox({
          selector: ".glightbox",
          touchNavigation: true,
          loop: true,
          autoplayVideos: true,
        });

        /**
         * Back to top button
         */
        let backtotop = select(".back-to-top");
        if (backtotop) {
          const toggleBacktotop = () => {
            if (window.scrollY > 100) {
              backtotop.classList.add("active");
            } else {
              backtotop.classList.remove("active");
            }
          };
          window.addEventListener("load", toggleBacktotop);
          onscroll(document, toggleBacktotop);
        }

        /**
         * Initialize AOS (Animate On Scroll)
         */
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });

        /**
         * Initialize PureCounter
         */
        document.addEventListener("DOMContentLoaded", function () {
          if (typeof PureCounter !== "undefined") {
            new PureCounter({
              duration: 2,
              delay: 10,
              once: true,
              legacy: false,
            });
          }
        });

        /**
         * Appointment Form Submission
         */
        document
          .getElementById("appointmentForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();

            // Show success popup
            document.getElementById("successPopup").style.display = "flex";

            // In a real application, you would send data to a server here
            console.log("Appointment form submitted:", {
              name: this.name.value,
              email: this.email.value,
              phone: this.phone.value,
              date: this.date.value,
              age: this.age.value,
              doctor: this.doctor.value,
              message: this.message.value,
            });
          });

        // Close appointment popup
        document
          .getElementById("closePopup")
          .addEventListener("click", function () {
            document.getElementById("successPopup").style.display = "none";
            document.getElementById("appointmentForm").reset();
          });

        /**
         * Contact Form Submission
         */
        document
          .getElementById("contactForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();

            // Show contact popup
            document.getElementById("contactPopup").style.display = "flex";

            // In a real application, you would send data to a server here
            console.log("Contact form submitted:", {
              name: this.name.value,
              email: this.email.value,
              subject: this.subject.value,
              message: this.message.value,
            });
          });

        // Close contact popup
        document
          .getElementById("closeContactPopup")
          .addEventListener("click", function () {
            document.getElementById("contactPopup").style.display = "none";
            document.getElementById("contactForm").reset();
          });

        /**
         * Newsletter Form Submission
         */
        document
          .getElementById("newsletterForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();

            // Show newsletter popup
            document.getElementById("newsletterPopup").style.display = "flex";

            // In a real application, you would send data to a server here
            console.log("Newsletter subscription:", {
              email: this.email.value,
            });

            // Reset form
            this.reset();
          });

        // Close newsletter popup
        document
          .getElementById("closeNewsletterPopup")
          .addEventListener("click", function () {
            document.getElementById("newsletterPopup").style.display = "none";
          });

        /**
         * Close popups when clicking outside
         */
        window.addEventListener("click", function (e) {
          const popups = ["successPopup", "contactPopup", "newsletterPopup"];
          popups.forEach((popupId) => {
            const popup = document.getElementById(popupId);
            if (popup && e.target === popup) {
              popup.style.display = "none";
              if (popupId === "successPopup")
                document.getElementById("appointmentForm").reset();
              if (popupId === "contactPopup")
                document.getElementById("contactForm").reset();
            }
          });
        });

        /**
         * Add typing effect to hero section (optional enhancement)
         */
        const typedTextSpan = document.querySelector(".typed-text");
        if (typedTextSpan) {
          const textArray = [
            "Healthcare",
            "Wellness",
            "Medical Support",
            "Treatment",
          ];
          const typingDelay = 100;
          const erasingDelay = 100;
          const newTextDelay = 1000;
          let textArrayIndex = 0;
          let charIndex = 0;

          function type() {
            if (charIndex < textArray[textArrayIndex].length) {
              typedTextSpan.textContent +=
                textArray[textArrayIndex].charAt(charIndex);
              charIndex++;
              setTimeout(type, typingDelay);
            } else {
              setTimeout(erase, newTextDelay);
            }
          }

          function erase() {
            if (charIndex > 0) {
              typedTextSpan.textContent = textArray[textArrayIndex].substring(
                0,
                charIndex - 1
              );
              charIndex--;
              setTimeout(erase, erasingDelay);
            } else {
              textArrayIndex++;
              if (textArrayIndex >= textArray.length) textArrayIndex = 0;
              setTimeout(type, typingDelay + 1100);
            }
          }

          // Start typing effect on page load
          setTimeout(type, newTextDelay + 250);
        }

        /**
         * Add scroll animation to elements
         */
        function revealOnScroll() {
          const reveals = document.querySelectorAll(".reveal");

          for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
              reveals[i].classList.add("active");
            } else {
              reveals[i].classList.remove("active");
            }
          }
        }

        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll(); // Initial check
      })();


