const HEADER_RESIZE_LISTENER_FLAG = "__headerResizeListenerAdded";

type HeaderGlobal = typeof globalThis & {
    [HEADER_RESIZE_LISTENER_FLAG]?: boolean;
};

export const initHeaderInteractions = () => {
    const root = document.documentElement;
    const themeButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]"),
    );
    const menuButton = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("mobile-menu-icon");
    const closeMenuLinks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-mobile-menu-close]"),
    );

    const getTheme = () => root.dataset.theme || "light";

    const setButtonState = (button: HTMLButtonElement, theme: string) => {
        const moonIcon = button.querySelector<HTMLElement>(
            '[data-theme-toggle-icon="moon"]',
        );
        const sunIcon = button.querySelector<HTMLElement>(
            '[data-theme-toggle-icon="sun"]',
        );

        if (moonIcon) moonIcon.hidden = theme === "dark";
        if (sunIcon) sunIcon.hidden = theme !== "dark";

        const nextLabel =
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        button.setAttribute("aria-label", nextLabel);
        button.setAttribute("title", nextLabel);
    };

    const closeMobileMenu = () => {
        if (!menu || !menuButton || !menuIcon) return;
        menu.dataset.open = "false";
        menuButton.setAttribute("aria-expanded", "false");
    };

    const openMobileMenu = () => {
        if (!menu || !menuButton || !menuIcon) return;
        menu.dataset.open = "true";
        menuButton.setAttribute("aria-expanded", "true");
    };

    themeButtons.forEach((button) => {
        setButtonState(button, getTheme());

        if (button.dataset.themeToggleInitialized === "true") return;
        button.dataset.themeToggleInitialized = "true";

        button.addEventListener("click", () => {
            const nextTheme = getTheme() === "dark" ? "light" : "dark";
            root.dataset.theme = nextTheme;
            root.style.colorScheme = nextTheme;
            localStorage.setItem("theme", nextTheme);
            themeButtons.forEach((themeButton) => {
                setButtonState(themeButton, nextTheme);
            });
        });
    });

    if (menu && menuButton && menuIcon) {
        if (menuButton.dataset.mobileMenuInitialized !== "true") {
            menuButton.dataset.mobileMenuInitialized = "true";
            menuButton.addEventListener("click", () => {
                const isClosed = menu.dataset.open !== "true";
                if (isClosed) {
                    openMobileMenu();
                    return;
                }
                closeMobileMenu();
            });
        }

        closeMenuLinks.forEach((link) => {
            if (link.dataset.mobileMenuLinkInitialized === "true") return;
            link.dataset.mobileMenuLinkInitialized = "true";
            link.addEventListener("click", closeMobileMenu);
        });

        const headerGlobal = globalThis as HeaderGlobal;
        if (!headerGlobal[HEADER_RESIZE_LISTENER_FLAG]) {
            globalThis.addEventListener("resize", () => {
                if (globalThis.innerWidth >= 768) {
                    closeMobileMenu();
                }
            });
            headerGlobal[HEADER_RESIZE_LISTENER_FLAG] = true;
        }
    }
};