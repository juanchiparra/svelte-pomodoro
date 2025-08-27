# svelte-pomodoro
A minimalist Pomodoro timer designed with a pixel art aesthetic built with SvelteKit and TypeScript

⚠️ Building in public:  This Pomodoro is currently in its initial phase, and what is being published is only its first version, far from the desired result.

Demo: [https://juanchiparra.github.io/svelte-pomodoro/](https://juanchiparra.github.io//svelte-pomodoro/)

![pomodoro](/pomodoro.png)

## Features
- Pomodoro timer: A simple, customizable timer to manage your work and break sessions
- Easy configuration: Quickly set the duration for work periods and breaks to fit your workflow
- Minimalist and responsive design: A clean, pixel-art style interface that adapts to any screen
- Keyboard shortcuts: Start, pause, and reset the timer using your keyboard 
- Visual progress tracking: A clear progress bar shows you exactly where you are in your cycle
- Accessibility: Designed with accessibility in mind, including ARIA support for screen readers

### For future upgrade
- Default styles: Predefined style themes for a quick visual change
- Sound notifications: Add optional sounds to indicate the status of the timer
- Documentation: Improve the usage instructions and add more detailed internal code comments

## Project structure
```
pomodoro/
├── src/
│  ├── lib/
│  │  ├── components/
│  │  └── styles/
│  ├── routes/
│  ├── app.html
│  └── app.d.ts
├── static/
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts

```

## Getting started
```bash
# Clone this repository
git clone https://github.com/juanchiparra/svelte-pomodoro.git
cd svelte-pomodoro
    
## Install the dependencies
npm install
    
## Start the development server
npm run dev
```

## Commands
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`
- `npm run check:watch`
- `npm run deploy`

## Contributions
Contributions are welcome! If you encounter a problem or have an idea to improve the project, open an issue or send a pull request.
