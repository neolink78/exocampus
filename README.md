## Memory card game

## Tech Stack

The technologies used include:

 - Typescript : For readability and maitainability
 - Next.js : Required for this project
 - Axios : Used for efficient and easy to manage HTTP requests
 - TailwindCSS : CSS framework used for rapid and responsive UI design
 - Shadcn : Library used to import various pre-styled components
 - I18n : For translations
 - Next-themes : For light/dark mode
 - Python : Required for this project
 - PostgreSQL : Reliable, scalable and strong relational database support 
 - FastApi : ORM to simplify database queries, schemas migrations and security

    

 ## Installation & Running the Project
 
 ### Prerequisites
 - Docker and Docker Compose installed on your machine.

 ### Setup
 
 1. Clone the repository:

 ```bash
 git clone git@github.com:neolink78/exocampus.git
 cd exocampus
 ```
 2. Create a .env file in the root, frontend and backend folders with required environment variables you can find in the .env.sample. file

3. In the frontend part, run
 ```bash
 npm run build
 ```
    
 3. Build and start all services with Docker Compose
    
 ```bash
 docker-compose up --build
 ```

This will start:

The backend API on http://localhost:8000

The frontend on http://localhost:3000

A PostgreSQL database accessible on port 5432




