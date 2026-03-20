// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Validating contact form (Example)
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger animation when stats section is in view
    let statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") {
        currentPage = "index.html";
    }

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        let linkPage = link.getAttribute("href");
        if (linkPage && linkPage.startsWith("/")) {
            linkPage = linkPage.substring(1);
        }

        // special case for index handling locally without slash
        if (linkPage === "" || linkPage === "#") {
            linkPage = "index.html";
        }

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});



// contact 

function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        company: document.getElementById("company").value.trim() || "N/A",
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        service: document.getElementById("service").value,
        message: document.getElementById("message").value.trim()
    };
}

// 📱 WhatsApp Button
const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
        const form = document.getElementById("contactForm");
        // Trigger HTML validation warning if fields are missing
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = getFormData();

        const whatsappMessage = `
🔧 *New Inquiry from Website*

👤 Name: ${data.name}
🏢 Company: ${data.company}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
⚙ Service: ${data.service}

📝 Message:
${data.message}
`;

        const whatsappNumber = "919890158854";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(url, "_blank");
    });
}

// 📧 Email Button
const emailBtn = document.getElementById("emailBtn");
if (emailBtn) {
    emailBtn.addEventListener("click", function () {
        const form = document.getElementById("contactForm");
        // Trigger HTML validation warning if fields are missing
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = getFormData();

        // Show loading state on button
        const originalText = emailBtn.innerHTML;
        emailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        emailBtn.disabled = true;

        const emailMessage = `
🔧 New Inquiry from Website

👤 Name: ${data.name}
🏢 Company: ${data.company}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
⚙ Service: ${data.service}

📝 Message:
${data.message}
`;

        // Send Email via Web3Forms (Pure JS, No Backend)
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                // 👉 Get your free access key from https://web3forms.com/
                access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",

                name: data.name,
                email: data.email, // ensures you can hit 'reply' to their email directly
                subject: "New Website Inquiry - " + data.name,
                message: emailMessage,

                // Add your cc email below
                cc: "purchasing@rahulindustries.in"
            }),
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    alert("Email sent successfully!");
                    form.reset();
                } else {
                    console.log(response);
                    alert("Something went wrong! Please check console.");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong!");
            })
            .finally(() => {
                // Restore button
                emailBtn.innerHTML = originalText;
                emailBtn.disabled = false;
            });
    });
}

// smooth scrooling 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
