(function ($) {
        "use strict";
            var WidgetScrollSequenceHandler = function($scope, $) { 
                let is_editable = elementorFrontend?.isEditMode();
                let fullscreenmenu = $scope[0].querySelector(".wkit-fullscreen-menu-main");
let menuToggle = fullscreenmenu.querySelector(".wkit-fullscreen-menu-toggle");
let menu = fullscreenmenu.querySelector(".w-fscreen-menu");
let links = fullscreenmenu.querySelectorAll(".fscreen-link-container");
let socialLinks = fullscreenmenu.querySelectorAll(".w-fscreen-menu-socials a");
let fscreenHeader = fullscreenmenu.querySelector(".wkit-fscreen-header");  
let isAnimating = false;
let mnuMainLink = fullscreenmenu.querySelector(".mnu-main-link");
let mnuOpened = fullscreenmenu.querySelector(".mnu-opened");
let menuToggleEl = fullscreenmenu.querySelector(".wkit-fullscreen-menu-toggle");

gsap.registerPlugin(CustomEase);
CustomEase.create(
    "hop",
    "M0, 0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
);

gsap.set(links, { y: 30, opacity: 0 });
gsap.set(socialLinks, { y: 30, opacity: 0 });
gsap.set(".wkit-email-template", { y: 30, opacity: 0, scale: 0.95 });
gsap.set(".fscreen-video-wrapper", {
  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
});
gsap.set(menu, {
  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  pointerEvents: "none"
});
gsap.set(fscreenHeader, { opacity: 1 });  

let getCrtUrl = window.location.href;
let navLink = fullscreenmenu.querySelectorAll('.fscreen-link');
navLink.forEach((el) => {
    let getlink = el.getAttribute('href');
    if(getlink){
        if(getCrtUrl.includes(getlink) && getlink != '#'){
            el.classList.add('active');
        }
    }
});
menuToggle.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const openMenu = menuToggle.classList.contains("closed");

    menuToggle.classList.toggle("closed", !openMenu);
    menuToggle.classList.toggle("opened", openMenu);
    document.body.style.overflow = openMenu ? "hidden" : "";

    // Immediately hide toggle button
    gsap.set(menuToggle, { opacity: 0, pointerEvents: "none" });

    if (openMenu) {

gsap.set(mnuMainLink, { opacity: 0 });
gsap.set(mnuOpened, { opacity: 0 });

        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => (isAnimating = false),
        });

        tl.to(menu, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "hop",
        }, 0);

        tl.to(links, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
        }, 0.6);

        tl.to(".wkit-email-template", {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
        }, 0.6);

        tl.to(socialLinks, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
        }, 0.6);

        tl.to(".fscreen-video-wrapper", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
        }, 0.4);

        tl.to(mnuOpened, {
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
        }, 0.8);
        tl.to(mnuMainLink, {
            opacity: 0,
            duration: 0.6,
        }, 0);
        // Delay re-show of toggle button
        tl.to(menuToggle, {
            opacity: 1,
            pointerEvents: "auto",
            stagger: 0.05,
            duration: 0.6,
        }, 0.8);

        tl.set(menu, { pointerEvents: "auto" }, ">");
    } else {
        // CLOSE MENU
        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
                gsap.set(menu, {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                });
                gsap.set(links, { y: 30, opacity: 0 });
                gsap.set(".wkit-email-template", { y: 30, opacity: 0, scale: 0.95 });
                gsap.set(socialLinks, { y: 30, opacity: 0 });
                gsap.set(".fscreen-video-wrapper", {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                });
                menu.style.pointerEvents = "none";
                isAnimating = false;
            },
        });

        tl.to(mnuOpened, {
            opacity: 0,
            duration: 0.3,
        }, 0);
        tl.to(mnuMainLink, {
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
        }, 0.5);
        tl.to(menu, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.2,
            ease: "hop",
        }, 0);

        // Delay re-show of toggle button on close
        tl.to(menuToggle, {
            opacity: 1,
            pointerEvents: "auto",
            stagger: 0.05,
            duration: 0.6,
        }, 0.5);
    }
});
  
            };	
        $(window).on('elementor/frontend/init', function () {
          elementorFrontend.hooks.addAction('frontend/element_ready/wb-59j2u825.default', WidgetScrollSequenceHandler);
        });
    })(jQuery);