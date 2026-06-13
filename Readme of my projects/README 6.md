# JavaScript Basic Projects

A collection of **18 beginner-friendly web projects** built with vanilla HTML, CSS, and JavaScript. Each project lives in its own folder and focuses on a single concept — DOM manipulation, browser APIs, form handling, local storage, and more.

No frameworks, no build step, no package manager. Open any `index.html` in your browser and start exploring.

---

https://github.com/Danyal-0276/Javascript-basic-projects.git

## Table of Contents

- [Getting Started](#getting-started)
- [Projects](#projects)
- [Tech Stack](#tech-stack)
- [External APIs](#external-apis)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, or Safari)
- A local development server (recommended) — e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code

### Run a Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Danyal-0276/Javascript-basic-projects.git
   cd Javascript-basic-projects
   ```

2. Open any project folder and launch `index.html`:
   - **Option A:** Right-click `index.html` → Open with your browser
   - **Option B:** Use Live Server and navigate to the project folder

> **Tip:** Some projects (Weather App, QR Code Generator) call external APIs and work best when served over `http://localhost` rather than opened as a `file://` URL.

---

## Projects

| #   | Project                  | Folder                      | Description                                                      | Key Concepts                                     |
| --- | ------------------------ | --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| 1   | **Age Calculator**       | `Age Calculator App/`       | Calculate exact age in years, months, and days from a birth date | Date math, DOM events                            |
| 2   | **Calculator**           | `Calculator/`               | Basic arithmetic calculator with AC and DEL controls             | `eval()`, event listeners                        |
| 3   | **Calculator (v2)**      | `cal/`                      | Calculator with error handling and improved button logic         | Try/catch, input validation                      |
| 4   | **Custom Select Menu**   | `Custom Select Menu/`       | Styled dropdown for social media platforms                       | CSS layout, custom UI _(JS pending)_             |
| 5   | **Form Validation**      | `Form Validation/`          | Contact form with live field validation                          | Regex, real-time feedback                        |
| 6   | **Hide & Show Password** | `Hide & Show password/`     | Toggle password field visibility with an eye icon                | Input `type` switching                           |
| 7   | **Music Player**         | `Music Player/`             | Audio player with play/pause and seek bar                        | HTML5 `<audio>`, progress control                |
| 8   | **Notes App**            | `Notes App/`                | Create, edit, and delete sticky notes                            | `localStorage`, `contenteditable`                |
| 9   | **Password Generator**   | `password gen app/`         | Generate random 12-character secure passwords                    | Randomization, clipboard copy                    |
| 10  | **Password Strength**    | `Password Strength/`        | Real-time weak / medium / strong indicator                       | Regex patterns, CSS states                       |
| 11  | **QR Code Generator**    | `QR Code Gen app/`          | Generate QR codes from any text or URL                           | Third-party QR API                               |
| 12  | **Quiz App**             | `Quiz app/`                 | 5-question multiple-choice quiz with scoring                     | Dynamic DOM, state management                    |
| 13  | **Quote Generator**      | `Quote gen App/`            | Fetch random quotes from a public API                            | `fetch()`, async/await _(UI wiring in progress)_ |
| 14  | **Stopwatch**            | `StopWatch/`                | Start, stop, and reset a digital timer                           | `setInterval`, time formatting                   |
| 15  | **Text to Speech**       | `Text to Speech Converter/` | Convert typed text to spoken audio                               | Web Speech API                                   |
| 16  | **To-Do List**           | `To-Do-List/`               | Add, complete, and remove tasks with persistence                 | `localStorage`, list CRUD                        |
| 17  | **Toast Notifications**  | `Toast Notification/`       | Success, error, and invalid toast messages                       | Dynamic elements, CSS animations                 |
| 18  | **Weather App**          | `Weather app/`              | Search any city and view live weather data                       | `fetch()`, OpenWeatherMap API                    |

---

## Tech Stack

| Layer   | Technology                                  |
| ------- | ------------------------------------------- |
| Markup  | HTML5                                       |
| Styling | CSS3                                        |
| Logic   | Vanilla JavaScript (ES6+)                   |
| Icons   | [Font Awesome](https://fontawesome.com/)    |
| Storage | `localStorage`                              |
| Audio   | HTML5 `<audio>` element                     |
| Speech  | Web Speech API (`SpeechSynthesisUtterance`) |

---

## External APIs

| Project           | API                                                | Documentation                                         |
| ----------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Weather App       | [OpenWeatherMap](https://openweathermap.org/api)   | Requires a free API key in `Weather app/js/script.js` |
| QR Code Generator | [QR Server](https://goqr.me/api/)                  | No key required                                       |
| Quote Generator   | [Quotable](https://github.com/lukePeavey/quotable) | No key required                                       |

---

## Project Structure

```
Javascript-basic-projects/
├── Age Calculator App/
├── Calculator/
├── cal/
├── Custom Select Menu/
├── Form Validation/
├── Hide & Show password/
├── Music Player/
├── Notes App/
├── password gen app/
├── Password Strength/
├── QR Code Gen app/
├── Quiz app/
├── Quote gen App/
├── StopWatch/
├── Text to Speech Converter/
├── To-Do-List/
├── Toast Notification/
├── Weather app/
└── README.md
```

Each project typically follows this layout:

```
Project Name/
├── index.html      # Page structure
├── style.css       # Styles (or css/style.css)
├── script.js       # Logic (or js/script.js)
└── img/ / media/   # Assets (where applicable)
```

---

## Concepts Covered

- **DOM manipulation** — selecting elements, updating content, creating nodes
- **Event handling** — clicks, input, keyboard, form submit
- **Browser APIs** — `localStorage`, `fetch`, Web Speech, HTML5 Audio
- **Form & input** — validation, regex, password toggling
- **Async JavaScript** — `async/await`, API integration
- **UI patterns** — toasts, custom dropdowns, progress bars, timers

---

## Contributing

Contributions are welcome! To add or improve a project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-project`)
3. Commit your changes (`git commit -m "Add my new project"`)
4. Push to your branch (`git push origin feature/my-project`)
5. Open a Pull Request

---

## License

This project is open source and available for learning purposes. Feel free to use, modify, and share the code.

---

<p align="center">
  Built with ❤️ using vanilla JavaScript
  <br />
  <a href="https://github.com/Danyal-0276/Javascript-basic-projects">github.com/Danyal-0276/Javascript-basic-projects</a>
</p>
