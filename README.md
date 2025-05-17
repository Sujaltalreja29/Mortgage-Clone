# Better Mortgage Clone

This project is a simplified recreation of the Better Mortgage website, developed as part of a frontend developer screening assignment. It focuses on clean UI, responsive design, and core mortgage-related functionality using React, TypeScript, React Router, Redux, and Tailwind CSS.

## 🌐 Live Demo

[View Live Demo](https://mortgage-clone.vercel.app)

## 🛠️ Technologies Used

- **React 18** with TypeScript and functional components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** as the build tool and development environment

## 📋 Features

### Home Page
- Visually engaging hero section with animated elements
- Interactive card section with tabs for different content types
- Responsive design that works beautifully on all device sizes
- Call-to-action buttons leading to appropriate sections

### About Page
- Clean, informative layout with company information
- Interactive sections with scroll reveal animations
- Team member cards with hover effects
- Statistics section with animated counters
- Company values and mission statement

### Mortgage Calculator
- Interactive calculator with real-time updates
- Visual breakdown of monthly payments with colored segments
- Adjustable inputs for home price, down payment, interest rate, etc.
- Responsive design that maintains usability on mobile devices
- "Copy estimate link" feature for sharing calculator results

### Start Page
- Personalized welcome with virtual mortgage specialist
- Interactive option selection for different mortgage needs
- Multi-step application form with validation
- Success feedback and confirmation after submission
- Supportive information about the mortgage process

## 🚀 Getting Started

### Prerequisites
- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sujaltalreja29/Mortgage-Clone.git
cd mortgage-clone
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
src/
  ├── components/       # Reusable UI components
  │   ├── Footer.tsx
  │   ├── Layout.tsx
  │   └── Navbar.tsx
  ├── pages/            # Page components
  │   ├── Home.tsx
  │   ├── About.tsx
  │   ├── MortgageCalculator.tsx
  │   └── Start.tsx
  ├── redux/            # Redux store and slices
  │   ├── store.ts
  │   └── calculatorSlice.ts
  ├── hooks/            # Custom React hooks
  │   └── useAppDispatch.ts
  ├── styles/           # CSS and styling files
  │   └── index.css
  ├── App.tsx           # Main app component with routes
  └── main.tsx          # Entry point
```

## 💡 Key Implementation Details

### State Management
- Used Redux Toolkit for managing calculator state
- Local component state for form handling and UI interactions

### Responsive Design
- Mobile-first approach with Tailwind's responsive utility classes
- Custom breakpoints for optimal viewing on all devices
- Flexible layouts that adjust to different screen sizes

### Accessibility
- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Sufficient color contrast

### Performance Optimizations
- Lazy loading of page components
- Optimized images
- Efficient re-rendering with proper React patterns

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 📝 Notes and Challenges

During the development of this project, I focused on creating a clean, responsive UI that closely resembles the original Better Mortgage website while implementing core functionality.

Some interesting challenges I encountered:

1. **Calculator Logic**: Implementing accurate mortgage calculations required understanding financial formulas and ensuring they were correctly applied in the code.

2. **Responsive Design**: Creating a layout that works well on both mobile and desktop required careful planning and testing.

3. **Form Validation**: Providing helpful error messages and a smooth user experience when validating forms.

4. **Animation Timing**: Finding the right balance for animations to enhance rather than distract from the user experience.


## 🙏 Acknowledgements

- Design inspiration from [Better Mortgage](https://better-take-home.vercel.app/)
- Icons from [Heroicons](https://heroicons.com/)
- Stock photos from [Unsplash](https://unsplash.com/)

---

Created by Sujal Talreja as part of a frontend developer screening assignment.