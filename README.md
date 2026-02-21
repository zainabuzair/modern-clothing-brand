Modern Studio | E-Commerce Design Task
1. Project Overview
A responsive, data-driven e-commerce platform built for a premium clothing brand. This project focuses on a minimalist "luxury streetwear" aesthetic combined with a seamless, functional shopping experience.

2. Key Features
Dynamic Product Rendering: Products are loaded via a JSON-structured array, allowing for easy updates and scalability.

State Persistence: Utilizes localStorage to save cart items and quantities, ensuring the user's bag remains intact even after a page refresh.

Smart Cart Logic: Includes quantity increment/decrement controls and automatic price calculations.

Product Personalization: Integrated size selector (S, M, L, XL) with validation to prevent "size-less" orders.

Robust Validation: Contact form features real-time Regular Expression (Regex) validation for email formats and character length checks.

3. Design Decisions
Typography: Used the Inter font family for its high legibility and modern, neutral feel.

Visual Style: Employed Glassmorphism (frosted glass effect) on the navigation bar to maintain a sense of depth while scrolling.

Responsiveness: Used a "Mobile-First" approach with CSS Grid.

Desktop: 3-4 column grid.

Tablet: 2-column grid.

Mobile: 1-column stack.

4. Technical Stack
HTML5: Semantic structure for SEO and accessibility.

CSS3: Custom properties (variables), Flexbox, and Grid for the layout.

JavaScript (Vanilla): DOM manipulation, Event Listeners, and Web Storage API.

5. How to Run
Clone or download the repository.

Open index.html in any modern web browser.

To test the cart, select a size on a product and click "Add to Bag."