document.addEventListener("DOMContentLoaded", function () {


// Category Filter Functionality for Index Page
function initializeCategoryFilter() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const eventsGrid = document.getElementById('filtered-events-grid');
    
    // Check if we're on the index page with category filter
    if (!categoryTabs.length || !eventsGrid) return;
    
    // Function to filter events by category
    function filterEventsByCategory(category) {
        let filteredEvents;
        
        if (category === 'all') {
            filteredEvents = eventsData.slice(0, 6); // Show first 6 events
        } else {
            filteredEvents = eventsData.filter(event => event.category === category);
        }
        
        renderFilteredEventCards(filteredEvents);
    }
    
    // Function to render filtered event cards
    function renderFilteredEventCards(events) {
        eventsGrid.innerHTML = 
            events.length === 0 
                ? `<div class="col-12"><p class="text-center text-muted">لا توجد فعاليات في هذا التصنيف.</p></div>`
                : events.map(event => `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${event.image}" class="card-img-top" alt="${event.title}">
                            <div class="card-body">
                                <h5 class="card-title">${event.title}</h5>
                                <p class="card-text text-muted">${event.date} - ${event.location}</p>
                                <p class="card-text">${event.description}</p>
                                <span class="badge bg-primary-special">${event.category}</span>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">
                                <a href="event-${event.id}.html" class="btn btn-primary w-100">التفاصيل</a>
                            </div>
                        </div>
                    </div>
                `).join('');
    }
    
    // Add click event listeners to category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => {
                t.classList.remove('active', 'btn-primary');
                t.classList.add('btn-outline-primary');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            // Filter events by selected category
            const category = this.getAttribute('data-category');
            filterEventsByCategory(category);
        });
    });
    
    // Initialize with "All" category
    filterEventsByCategory('all');
}
  const eventsData = [
    {
      id: 1,
      title: "معرض دمشق الدولي الـ 62",
      date: "2025-8-27",
      location: "مديتة المعارض الجديدة",
      category: "معارض",
      image: "./assets/img/event-1/1.jpg",
      description: "تحت شعار سوريا تستقبل الجميع",
    },
    {
      id: 2,
      title: "المؤتمر الدولي الرابع للهندسة الطبية ICBME 2025-Damascus",
      date: "2025-10-14",
      location: "كلية الهندسة الميكانيكية و الكهربائية- جامعة دمشق",
      category: "مؤتمرات",
      image: "./assets/img/event-2/2.png",
      description: "المؤتمر الدولي الرابع للهندسة الطبية الحيوية (الهندسة الطبية ودورها في تطوير الرعاية الصحية).",
    },
    {
      id: 3,
      title: "تكسبو لاند سوريا 2025 - بوابتك نحو المستقبل الرقمي",
      date: "2025-10-17",
      location: "مديتة المعارض الجديدة",
      category: "تقنية",
      image: "./assets/img/event-3/1.png",
      description: "فرصة لا تعوض للمستثمرين والمشاركين لدخول مجال التكنولوجيا في مختلف القطاعات.",
    },
    {
      id: 4,
      title: "معرض موتوريكس إكسبو 2025",
      date: "2025-8-5",
      location: "مديتة المعارض الجديدة",
      category: "سيارات",
      image: "./assets/img/event-4/1.jpg",
      description: "معرض موتوريكس إكسبو 2025 على أرض مدينة المعارض بدمشق، بمشاركة واسعة من أكثر من 37 شركةً محليةً وعربيةً ودوليةً.",
    },
    {
      id: 5,
      title: "معرض “هواجس” في ثقافي أبو رمانة",
      date: "2025-10-13",
      location: "المركز الثقافي أبو رمانة",
      category: "ثقافة",
      image: "./assets/img/event-5/1.jpg",
      description: "تجربة جماعية تجمع بين سبعة فنانين يمثلون مدارس وتقنيات متنوعة.",
    },

  ];
// Call the function after DOM is loaded
initializeCategoryFilter();


  
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const setIconForTheme = (theme) => {
    themeIcon.classList.remove("bi-moon-stars-fill", "bi-sun-fill");
    if (theme === "dark") {
      themeIcon.classList.add("bi-sun-fill");
    } else {
      themeIcon.classList.add("bi-moon-stars-fill");
    }
  };

  setIconForTheme(document.documentElement.getAttribute("data-bs-theme"));

  themeToggle.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIconForTheme(newTheme);
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById("scroll-to-top");

  window.onscroll = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Dynamic Event Card Rendering
  function renderEventCards(events, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML =
      events.length === 0
        ? `<div class="col-12"><p class="text-center text-muted">لا توجد فعاليات تطابق بحثك.</p></div>`
        : events
            .map(
              (event) => `
                <div class="col">
                    <div class="card h-100">
                        <img src="${event.image}" class="card-img-top" alt="${event.title}">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text text-muted">${event.date} - ${event.location}</p>
                            <p class="card-text">${event.description}</p>
                            <span class="badge bg-primary-special">${event.category}</span>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                             <a href="event-${event.id}.html" class="btn btn-primary w-100">التفاصيل</a>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
  }

  if (document.getElementById("events-grid")) {
    renderEventCards(eventsData.slice(1, 3), "events-grid");
  }

  if (document.getElementById("events-grid-full")) {
    renderEventCards(eventsData, "events-grid-full");
    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", () => {
      const searchTerm = document
        .getElementById("searchInput")
        .value.toLowerCase();
      const category = document.getElementById("categoryFilter").value;
      const date = document.getElementById("dateFilter").value;

      let filteredEvents = eventsData.filter(
        (event) =>
          (!searchTerm ||
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)) &&
          (category === "all" || event.category === category) &&
          (!date || event.date === date)
      );

      renderEventCards(filteredEvents, "events-grid-full");
    });
  }

  // Contact Form Validation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.checkValidity()) {
      const name = document.getElementById("name").value;
      const subject = document.getElementById("subject").value;
      
      // Map subject values to readable text
      const subjectText = {
        'general': 'استفسار عام',
        'event': 'اقتراح فعالية', 
        'partnership': 'شراكة',
        'technical': 'مشكلة تقنية',
        'other': 'أخرى'
      }[subject] || 'استفسار عام';

      // Show custom success alert
      showCustomAlert(`شكرًا لك ${name}!`, `تم استلام رسالتك بنجاح في موضوع "${subjectText}". سنتواصل معك قريبًا.`, 'success');
      this.reset();
      this.classList.remove("was-validated");
    } else {
      // Show custom error alert
      showCustomAlert('خطأ في الإرسال', 'الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح.', 'error');
    }
    this.classList.add("was-validated");
  });
}

// Custom Alert Function
function showCustomAlert(title, message, type) {
  // Remove existing custom alerts
  const existingAlerts = document.querySelectorAll('.custom-alert');
  existingAlerts.forEach(alert => alert.remove());

  // Create alert HTML based on type
  const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
  const iconColor = type === 'success' ? '#28a745' : '#dc3545';

  const alertHTML = `
    <div class="custom-alert ${alertClass}">
      <div class="alert-content">
        <div class="alert-icon">
          <i class="bi ${icon}" style="color: ${iconColor};"></i>
        </div>
        <div class="alert-text">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  `;

  // Add alert to the page
  document.body.insertAdjacentHTML('beforeend', alertHTML);

  // Auto remove after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      const alert = document.querySelector('.custom-alert');
      if (alert) {
        alert.remove();
      }
    }, 5000);
  }
}




  // Page Load Animations
function initializeAnimations() {
    const animatedSections = document.querySelectorAll('.section-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// Call the animation function
initializeAnimations();
  



});


// Add to Calendar Functionality with Custom Modal
function addToCalendar(eventTitle, eventDate, eventLocation) {
    // Create calendar event data
    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours duration
    
    // Format dates for calendar
    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(`فعالية: ${eventTitle} في ${eventLocation}`)}`;
    

    // Create custom modal
    const modalHTML = `
        <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="calendarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-navbar text-white">
                        <h5 class="modal-title" id="calendarModalLabel">
                            <i class="bi bi-calendar-plus"></i> إضافة إلى التقويم
                        </h5>
                        <div><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-4">
                            <i class="bi bi-calendar-event display-4 text-primary-special"></i>
                            <h6 class="mt-3">${eventTitle}</h6>
                            <p class="text-muted">${eventDate} - ${eventLocation}</p>
                        </div>
                        <p class="mb-4">هل تريد اضافة الفعالية إلى التقويم:</p>
                        <div class="d-flex flex-column gap-2">
                            <button class="btn btn-primary-special btn-calendar-option" onclick="openGoogleCalendar('${googleCalendarUrl}')">
                                <i class="bi bi-google"></i> فتح تقويم Google
                            </button>
                            <button class="btn btn-outline-secondary btn-calendar-option" data-bs-dismiss="modal">
                                <i class="bi bi-x-circle"></i> إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('calendarModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize and show modal
    const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
    calendarModal.show();
    
    // Remove modal when hidden
    document.getElementById('calendarModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Open Google Calendar
function openGoogleCalendar(url) {
    window.open(url, '_blank');
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
    modal.hide();
}


// Share Event Functionality
function shareEvent(eventTitle, eventUrl = null) {
    const currentUrl = eventUrl || window.location.href;
    const shareText = `تفضل بمشاهدة فعالية ${eventTitle} على دليل مدينة دمشق`;
    
    // Fallback to custom share modal
    showShareModal(eventTitle, currentUrl, shareText);

}

// Custom Share Modal
function showShareModal(eventTitle, eventUrl, shareText) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-navbar text-white">
                        <h5 class="modal-title" id="shareModalLabel">مشاركة الفعالية</h5>
                        <div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    </div>
                    <div class="modal-body text-center">
                        <h6 class="mb-3">${eventTitle}</h6>
                        <div class="d-flex justify-content-center gap-3 mb-4">
                            <button class="btn btn-outline-success share-option" data-platform="whatsapp">
                                <i class="bi bi-whatsapp"></i> واتساب
                            </button>
                            <button class="btn btn-outline-primary share-option" data-platform="facebook">
                                <i class="bi bi-facebook"></i> فيسبوك
                            </button>
                            <button class="btn btn-outline-info share-option" data-platform="twitter">
                                <i class="bi bi-twitter"></i> تويتر
                            </button>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" value="${eventUrl}" id="shareUrl" readonly>
                            <button class="btn btn-primary" onclick="copyShareUrl()">
                                <i class="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('shareModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize modal
    const shareModal = new bootstrap.Modal(document.getElementById('shareModal'));
    shareModal.show();
    
    // Add event listeners to share buttons
    document.querySelectorAll('.share-option').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            shareToPlatform(platform, eventUrl, shareText);
        });
    });
    
    // Remove modal when hidden
    document.getElementById('shareModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Share to specific platform
function shareToPlatform(platform, url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    
    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Copy share URL to clipboard
function copyShareUrl() {
    const shareUrlInput = document.getElementById('shareUrl');
    shareUrlInput.select();
    document.execCommand('copy');
    
    // Show confirmation
    const originalText = shareUrlInput.nextElementSibling.innerHTML;
    shareUrlInput.nextElementSibling.innerHTML = '<i class="bi bi-check"></i>';
    
    setTimeout(() => {
        shareUrlInput.nextElementSibling.innerHTML = originalText;
    }, 2000);
}