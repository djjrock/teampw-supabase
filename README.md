# Modern React + Supabase Starter Template

A production-ready starter template for building secure, multi-tenant SaaS applications with React and Supabase. Features include authentication, organization management, team collaboration, and more.

## Features

- 🔐 Secure Authentication with Magic Links
- 👥 Multi-tenant Organization Support
- 🤝 Team Management & Collaboration
- 🎨 Beautiful UI with Tailwind CSS
- 🔒 Row Level Security with Supabase
- 📱 Responsive Design
- 🌙 Dark Mode Support
- 🚀 Vite for Fast Development

## Prerequisites

- Node.js 18+
- A Supabase account

## Quick Start

1. Create a new Supabase project:
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in your project details
   - Save your project URL and anon key for later

2. Clone and install:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Supabase project URL and anon key:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_APP_NAME=YourAppName
   ```

4. Set up the database:
   - Go to your Supabase project's SQL editor
   - Run the schema creation SQL from `src/lib/supabase/schema.sql`
   - Run the RLS policies from `src/lib/supabase/rls.sql`

5. Configure authentication:
   - In your Supabase project, go to Authentication > URL Configuration
   - Add your local development URL: `http://localhost:5173`
   - Add your production URL when ready
   - Enable Email provider and Magic Links in Auth Providers

6. Start the development server:
   ```bash
   npm run dev
   ```

## Authentication Flow

1. User enters their email address
2. Magic link is sent to email
3. User clicks magic link and is redirected back
4. On first login:
   - Organization is created based on email domain
   - User profile is created
   - User is set as organization owner
5. On subsequent logins:
   - User is added to existing organization based on email domain

## Database Schema

The template includes the following tables:

- \`organizations\` - Multi-tenant organizations
- \`profiles\` - User profiles with organization association
- \`teams\` - Teams within organizations
- \`team_members\` - Team membership and roles
- \`passwords\` - Secure password storage
- \`password_access_logs\` - Audit logs for password access
- \`notifications\` - User notifications

## Row Level Security

The template implements secure RLS policies that:

- Restrict users to their organization's data
- Enforce role-based access control
- Prevent unauthorized data access
- Log all sensitive operations

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Your Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Your Supabase anonymous key | Yes |
| VITE_APP_NAME | Your application name | Yes |

## Deployment

1. Create a production Supabase project
2. Set up your hosting platform (Vercel, Netlify, etc.)
3. Configure environment variables
4. Deploy your application
5. Update Supabase authentication settings with production URL

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.