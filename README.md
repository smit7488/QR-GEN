# QR Code Generator

A simple and customizable QR Code Generator built with React and Tailwind CSS, featuring dark mode support.

## Features

- Generates QR Codes dynamically
- Fully responsive and mobile-friendly
- Dark mode support (adapts based on system preference)
- Smooth animations and transitions
- Optimized SVG rendering

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/qr-code-generator.git
   ```

2. Navigate to the project folder:

   ```sh
   cd qr-code-generator
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Run the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Click the dark mode toggle to switch themes
3. The QR Code adapts to dark mode automatically

## Code Structure

### Main Components

- `components/DefaultQR.tsx` → Renders the QR code with dynamic dark mode support
- `components/Nav.tsx` → Navigation bar with a dark mode toggle

### Key Technologies

- React – UI framework
- Tailwind CSS – Styling and dark mode support
- Lucide Icons – Lightweight SVG icons
- Next.js (optional) – For server-side rendering support

## Dark Mode Support

The QR Code dynamically updates its colors based on user preferences.

- Uses Tailwind's `dark:` class to switch styles
- Ensures smooth transitions for a polished user experience
- Implements CSS variables for wider compatibility

## Configuration

### Customize Colors

Modify the default colors in `tailwind.config.js`:

```js
module.exports = {
  darkMode: "class", // Ensures class-based dark mode
  theme: {
    extend: {
      colors: {
        qrLight: "#E8E8E8",
        qrDark: "#ffffff"
      }
    }
  }
};
```

## License

This project is open-source under the MIT License. Feel free to use and modify it.

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository  

2. Create a new branch:

   ```sh
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```sh
   git commit -m "Added new feature"
   ```

4. Push to GitHub:

   ```sh
   git push origin feature-name
   ```
