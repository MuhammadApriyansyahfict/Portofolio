"use strict";

// Tahun footer otomatis.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Animasi saat bagian halaman masuk ke layar.
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05
    }
  );

  document.querySelectorAll(".reveal").forEach((section) => {
    observer.observe(section);
  });
}

// Filter keahlian.
const filterButtons = document.querySelectorAll("[data-filter]");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filter) => {
      const isActive = filter === button;

      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    skillCards.forEach((card) => {
      card.hidden =
        selectedCategory !== "all" &&
        card.dataset.category !== selectedCategory;
    });
  });
});

// Terminal interaktif.
// Terminal ini hanya menampilkan teks, bukan menjalankan perintah sistem.
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");
const terminalForm = document.getElementById("terminal-form");

const commands = {
  help: [
    "Perintah tersedia:",
    "",
    "about     → Kenalan dengan Apri",
    "skills    → Bidang yang ditekuni",
    "education → Pendidikan",
    "hello     → Sapa saya",
    "clear     → Bersihkan terminal"
  ].join("\n"),

  about: [
    "Muhammad Apriyansyah.",
    "",
    "Mahasiswa, pembelajar, dan penjelajah teknologi.",
    "Curious by nature. Building by choice."
  ].join("\n"),

  skills: [
    "Full-Stack Web Development",
    "Junior Software Engineering",
    "UI/UX Design",
    "AI Enthusiast",
    "Cybersecurity & Ethical Hacking",
    "IoT Engineering",
    "Embedded Systems & Firmware Development",
    "Hardware & Electronics Service"
  ].join("\n"),

  education: [
    "Horizon University",
    "Faculty of Information and Computer Technology",
    "Informatics Engineering"
  ].join("\n"),

  hello: [
    "Halo juga! 👋",
    "Terima kasih sudah mampir.",
    "Semoga kita bisa belajar dan membangun sesuatu bersama."
  ].join("\n")
};

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();

  if (!command) {
    return;
  }

  if (command === "clear") {
    terminalOutput.replaceChildren();
    terminalInput.value = "";
    return;
  }

  const prompt = document.createElement("p");
  prompt.className = "terminal-green";
  prompt.textContent =
    "visitor@apri:~$ " + rawCommand.trim();

  const response = document.createElement("p");

  response.textContent = Object.hasOwn(commands, command)
    ? commands[command]
    : "Perintah belum dikenal. Ketik help untuk melihat pilihan.";

  terminalOutput.append(prompt, response);

  // Batasi riwayat agar terminal tetap ringan.
  while (terminalOutput.childElementCount > 60) {
    terminalOutput.firstElementChild.remove();
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  terminalInput.value = "";
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand(terminalInput.value);
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    runCommand(button.dataset.command);
  });
});

// Salin nama.
const copyButton = document.getElementById("copy-name");
const copyStatus = document.getElementById("copy-status");

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("Muhammad Apriyansyah");

    copyStatus.textContent =
      "Nama berhasil disalin. Sampai bertemu!";
  } catch {
    copyStatus.textContent =
      "Silakan salin nama ini: Muhammad Apriyansyah";
  }
});
