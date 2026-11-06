const events = [
  {id:1,title:"Future of AI Summit",category:"Technology",date:"NOV 18, 2026",time:"10:00 AM – 4:00 PM",venue:"Innovation Hub, Bhubaneswar",description:"Explore how artificial intelligence is changing the world. Hear from technology speakers, discover new ideas, and connect with fellow innovators.",color:"linear-gradient(135deg,#426b83,#8ab5ae)",symbol:"✺"},
  {id:2,title:"The Indie Music Evening",category:"Music",date:"NOV 22, 2026",time:"6:00 PM – 9:00 PM",venue:"Open Air Arena",description:"An evening of live independent music, fresh sounds, and good company. Bring your friends and enjoy local artists on one stage.",color:"linear-gradient(135deg,#8d557d,#d99b91)",symbol:"♫"},
  {id:3,title:"Design Thinking Lab",category:"Workshop",date:"NOV 25, 2026",time:"11:00 AM – 2:00 PM",venue:"Creative Studio, City Centre",description:"A hands-on workshop to learn creative problem solving, rapid ideation, and user-focused design. No prior design experience required.",color:"linear-gradient(135deg,#b17a3d,#e7c17b)",symbol:"✳"},
  {id:4,title:"Campus Connect Meetup",category:"Community",date:"DEC 02, 2026",time:"3:00 PM – 5:00 PM",venue:"University Convention Hall",description:"Meet students, share ideas, build friendships, and find people who are excited about learning and creating together.",color:"linear-gradient(135deg,#547b55,#a5c88a)",symbol:"◎"},
  {id:5,title:"Web Dev Bootcamp",category:"Technology",date:"DEC 08, 2026",time:"9:30 AM – 1:00 PM",venue:"Digital Learning Centre",description:"Get introduced to modern web development through practical activities covering HTML, CSS, JavaScript, and building your first page.",color:"linear-gradient(135deg,#475a9a,#8f9ed5)",symbol:"</>"},
  {id:6,title:"Acoustic Sunday",category:"Music",date:"DEC 13, 2026",time:"5:00 PM – 8:00 PM",venue:"The Garden Stage",description:"Slow down with an intimate acoustic session featuring soulful performances in a relaxed outdoor setting.",color:"linear-gradient(135deg,#9b6849,#d9a77e)",symbol:"♫"},
  {id:7,title:"Photography Walk",category:"Workshop",date:"DEC 16, 2026",time:"7:00 AM – 10:00 AM",venue:"Old Town Meeting Point",description:"Learn to notice light, composition, and interesting details while exploring the city with fellow photography enthusiasts.",color:"linear-gradient(135deg,#507c83,#a3c6c0)",symbol:"◉"},
  {id:8,title:"Community Green Day",category:"Community",date:"DEC 20, 2026",time:"8:00 AM – 12:00 PM",venue:"Central Community Park",description:"Join volunteers for a positive morning of community action, environmental awareness, and meeting neighbours.",color:"linear-gradient(135deg,#66824c,#b4ca79)",symbol:"♧"},
  {id:9,title:"Cybersecurity Essentials",category:"Technology",date:"JAN 05, 2027",time:"10:00 AM – 1:00 PM",venue:"Tech Learning Hall",description:"Understand everyday digital safety, common online threats, and practical steps to protect your accounts and devices.",color:"linear-gradient(135deg,#43536c,#8dabc6)",symbol:"⌘"}
];

const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function renderEvents() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event =>
    (activeCategory === "All" || event.category === activeCategory) &&
    (event.title.toLowerCase().includes(term) || event.description.toLowerCase().includes(term) || event.venue.toLowerCase().includes(term))
  );
  grid.innerHTML = filtered.map(event => `
    <article class="event-card">
      <div class="event-visual" style="background:${event.color}">
        <span class="event-tag">${event.category.toUpperCase()}</span><span class="visual-symbol">${event.symbol}</span>
      </div>
      <div class="event-card-body">
        <span class="event-date">${event.date}</span>
        <h3>${event.title}</h3><p>${event.description}</p>
        <div class="event-meta"><span>◷ ${event.time}</span><span>⌖ ${event.venue}</span></div>
        <div class="event-card-actions">
          <button class="text-button" data-details="${event.id}">View details →</button>
          <button class="register-small" data-register="${event.id}">Register</button>
        </div>
      </div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}
renderEvents();

document.getElementById("filters").addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderEvents();
});
searchInput.addEventListener("input", renderEvents);

const detailsModal = document.getElementById("detailsModal");
const registerModal = document.getElementById("registerModal");
function openModal(modal) { modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function closeModal(modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
function chooseEvent(id) { return events.find(event => event.id === Number(id)); }

grid.addEventListener("click", e => {
  const detailButton = e.target.closest("[data-details]");
  const registerButton = e.target.closest("[data-register]");
  if (detailButton) {
    const event = chooseEvent(detailButton.dataset.details);
    document.getElementById("modalContent").innerHTML = `
      <div class="detail-visual" style="background:${event.color}">${event.symbol}</div>
      <span class="event-date">${event.category.toUpperCase()} · ${event.date}</span>
      <h2 id="modalTitle">${event.title}</h2><p>${event.description}</p>
      <div class="detail-meta">◷ ${event.time}<br>⌖ ${event.venue}</div>
      <button class="button button-primary" id="detailRegister">Register for this event ↗</button>`;
    openModal(detailsModal);
    document.getElementById("detailRegister").addEventListener("click", () => {
      closeModal(detailsModal); showRegistration(event.id);
    });
  }
  if (registerButton) showRegistration(registerButton.dataset.register);
});

function showRegistration(id) {
  const event = chooseEvent(id);
  document.getElementById("selectedEventId").value = event.id;
  document.getElementById("selectedEventName").textContent = event.title + " · " + event.date;
  document.getElementById("registrationForm").hidden = false;
  document.getElementById("successMessage").hidden = true;
  document.getElementById("formError").textContent = "";
  openModal(registerModal);
}
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => {
  closeModal(detailsModal); closeModal(registerModal);
}));
[detailsModal,registerModal].forEach(modal => modal.addEventListener("click", e => {
  if (e.target === modal) closeModal(modal);
}));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(detailsModal); closeModal(registerModal); }
});

document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("formError");
  if (name.length < 2) { error.textContent = "Please enter your full name."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { error.textContent = "Please enter a valid email address."; return; }
  if (!/^\d{10}$/.test(phone)) { error.textContent = "Please enter a 10-digit phone number."; return; }
  const registrations = JSON.parse(localStorage.getItem("gatherlyRegistrations") || "[]");
  registrations.push({name,email,phone,eventId:Number(document.getElementById("selectedEventId").value),registeredAt:new Date().toISOString()});
  localStorage.setItem("gatherlyRegistrations",JSON.stringify(registrations));
  document.getElementById("registrationForm").hidden = true;
  document.getElementById("successMessage").hidden = false;
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("themeToggle").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("navLinks").classList.toggle("show"));
document.querySelectorAll("#navLinks a").forEach(link => link.addEventListener("click", () => document.getElementById("navLinks").classList.remove("show")));
document.getElementById("year").textContent = new Date().getFullYear();
