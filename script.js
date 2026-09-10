/* =========================================================
   CHARVEX TECHNOLOGIES
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01 — MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /*
       Close menu when a navigation link
       is clicked.
    */

    const navItems =
        mainNav.querySelectorAll("a");


    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /*
       Close menu when tapping outside it.
    */

    document.addEventListener("click", (event) => {

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}



/* =========================================================
   02 — SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .featured-project, .project-card, .service-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================================================
   03 — HEADER SCROLL EFFECT
   ========================================================= */

const siteHeader =
    document.querySelector(".site-header");


window.addEventListener(
    "scroll",
    () => {

        if (!siteHeader) return;


        if (window.scrollY > 20) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);



/* =========================================================
   04 — CURRENT YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );


yearElements.forEach((element) => {

    element.textContent =
        new Date().getFullYear();

});



/* =========================================================
   05 — IMAGE FALLBACK
   ========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );

        }
    );

});

/* =========================================================
   06 — PROJECT ENQUIRY FORM
   ========================================================= */

const projectForm =
    document.getElementById("projectForm");

const formStatus =
    document.getElementById("formStatus");


if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const submitButton =
                projectForm.querySelector(
                    ".form-submit"
                );


            const originalButtonText =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                "Sending enquiry...";


            if (formStatus) {

                formStatus.textContent =
                    "Sending your project details...";

                formStatus.className =
                    "form-status sending";

            }


            try {

                const formData =
                    new FormData(projectForm);


                const response =
                    await fetch(
                        projectForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed."
                    );

                }


                projectForm.reset();


                if (formStatus) {

                    formStatus.textContent =
                        "✓ Your enquiry has been sent. We'll get back to you soon.";

                    formStatus.className =
                        "form-status success";

                }


                submitButton.innerHTML =
                    "Enquiry Sent ✓";


            } catch (error) {

                console.error(error);


                if (formStatus) {

                    formStatus.textContent =
                        "Something went wrong. Please email charvextechnology@gmail.com directly.";

                    formStatus.className =
                        "form-status error";

                }


                submitButton.innerHTML =
                    originalButtonText;

                submitButton.disabled = false;

            }

        }
    );

}