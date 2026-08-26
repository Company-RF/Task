// ============================================
// تبديل الوضع الداكن / الفاتح - مشترك بين كل الصفحات
// ============================================
(function () {
    const root = document.documentElement;
    const STORAGE_KEY = "site-theme";

    function applyTheme(theme) {
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }
        updateToggleButtons(theme);
    }

    function updateToggleButtons(theme) {
        document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
            btn.innerHTML = theme === "dark"
                ? '<i class="bi bi-sun-fill"></i> الوضع الفاتح'
                : '<i class="bi bi-moon-stars-fill"></i> الوضع الداكن';
        });
    }

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) { /* تجاهل إن لم يتوفر التخزين */ }
    }

    // تطبيق السمة المحفوظة عند تحميل الصفحة
    const saved = getSavedTheme() ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(saved);

    document.addEventListener("DOMContentLoaded", () => {
        updateToggleButtons(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
        document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const isDark = root.getAttribute("data-theme") === "dark";
                const next = isDark ? "light" : "dark";
                applyTheme(next);
                saveTheme(next);
            });
        });
    });
})();
