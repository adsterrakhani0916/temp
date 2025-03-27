// مدیریت اسکریپت‌های اصلی اپلیکیشن
document.addEventListener('DOMContentLoaded', () => {
    // فعال‌سازی انیمیشن‌های AOS
    AOS.init({
        duration: 1200,
        once: true
    });

    // مدیریت تغییرات داینامیک صفحه
    const dynamicContentHandler = {
        init() {
            this.setupEventListeners();
        },
        
        setupEventListeners() {
            // مثال: افزودن رویداد به عناصر
            const interactiveElements = document.querySelectorAll('.interactive');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', this.handleInteraction);
                el.addEventListener('mouseleave', this.handleInteractionEnd);
            });
        },

        handleInteraction(event) {
            event.target.classList.add('hover-effect');
        },

        handleInteractionEnd(event) {
            event.target.classList.remove('hover-effect');
        }
    };

    // اجرای مدیریت محتوای داینامیک
    dynamicContentHandler.init();

    // ثبت سرویس ورکر برای PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('سرویس ورکر با موفقیت ثبت شد:', registration);
            })
            .catch(error => {
                console.error('خطا در ثبت سرویس ورکر:', error);
            });
    }

    // مدیریت تم و تنظیمات
    const themeManager = {
        currentTheme: 'light',
        
        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            document.body.classList.toggle('dark-theme');
            this.saveThemePreference();
        },

        saveThemePreference() {
            localStorage.setItem('app-theme', this.currentTheme);
        },

        loadSavedTheme() {
            const savedTheme = localStorage.getItem('app-theme');
            if (savedTheme) {
                this.currentTheme = savedTheme;
                if (savedTheme === 'dark') {
                    document.body.classList.add('dark-theme');
                }
            }
        }
    };

    // بارگذاری تم ذخیره شده
    themeManager.loadSavedTheme();

    // اضافه کردن رویداد تغییر تم (مثال)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => themeManager.toggleTheme());
    }
});

// توابع کمکی و ابزارها
const AppUtils = {
    // تابع برای اعتبارسنجی فرم
    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    },

    // ایجاد اعلان سفارشی
    showNotification(message, type = 'info') {
        const notificationContainer = document.getElementById('notification-container');
        if (notificationContainer) {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show`;
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            notificationContainer.appendChild(notification);
        }
    }
};
