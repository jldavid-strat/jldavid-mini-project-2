## 🌟 About the project

A full stack blog website created using [Next.js](https://nextjs.org/) to showcase CRUD operations using [Drizzle ORM](https://orm.drizzle.team/) with [Neon Postgres](https://nextjs.org/) and Server Actions while integrating [uiw-react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor) as the Markdown Editor.

### 📱Technologies used:

- **[Next.js](https://nextjs.org/)** for creating static and dynamic page
- **[Tailwind CSS](https://tailwindcss.com/)** for styling components using utility classe
- **[shadcn/ui](https://ui.shadcn.com/)** for accessible UI components to headstart your own component library
- **[uiw-react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor)** to integrate a markdown editor and renderer
- **[Neon Postgres](https://neon.com/)** for an accessible and easy-to-setup database provider
- **[Drizzle ORM](https://orm.drizzle.team/)** for an intuitive query builder for SQL databases 

### ✨Features:
- **Full CRUD functionality** for blogs and comments
- **Dynamic Route Generation** for individual blog pages
- **Implement server actions** to create and update (blogs and commments) directly to the database and revalidate the path so the newly created data is shown immediately
- **Page-dependent metadata** for better SEO and social sharing (i.e Facebook & Twitter)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### 📲 Installation

Follow the instructions below to set-up this application.

1. Clone the github repo
   ```sh
   git clone https://github.com/jldavid-strat/jldavid-mini-project-1.git
   ```
2. Install NPM necessary packages and dependencies
   ```sh
   npm install
   ```
3. Create a `.env` file and setup the environment variables
   ```sh
   DATABASE_URL=''
   ```
5. Run the development server
   ```sh
   npm run dev
   ```
6. Open your browser and visit the site.
   ```sh
   http://localhost:3000
   ```
