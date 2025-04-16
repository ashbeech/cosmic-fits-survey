# Cosmic Fits Survey

A Next.js application that replicates the Cosmic Fits survey form and forwards responses to an email address using Resend.

## Features

- Responsive survey form with 27 questions
- Form validation
- Email notifications for survey submissions
- Deployed on Vercel

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Resend account (https://resend.io)
- A Vercel account (https://vercel.com)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cosmic-fits-survey.git
cd cosmic-fits-survey
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Copy the example environment file and update it with your Resend API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Resend API key:

```
RESEND_API_KEY=re_yourapikey
```

## Setting Up Resend

1. Create an account on [Resend](https://resend.io)
2. Add and verify your domain (bullish.design)
3. Create an API key from the dashboard
4. Set up the sender email address in the Resend dashboard (survey@bullish.design)
5. Make sure to add the destination email (cosmicfits@bullish.design) to your verified recipients if you're on the free plan

## Local Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Log in to your Vercel account.
3. Create a new project and import your GitHub repository.
4. Configure environment variables in the Vercel project settings:
   - Add `RESEND_API_KEY` with your Resend API key
5. Deploy the project.

### Manual Deployment

If you prefer to deploy from the command line:

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Run the deployment command:

```bash
vercel
```

3. Follow the prompts to link to your Vercel account and project.

4. For production deployment:

```bash
vercel --prod
```

## Project Structure

- `app/` - Next.js app directory (page structure, layout, API routes)
- `components/` - React components
- `public/` - Static assets

## Customization

- To modify the survey questions, edit the `components/SurveyForm.tsx` file
- To change the email template, edit the `app/api/submit-survey/route.ts` file
- To update styling, modify the Tailwind classes or edit `app/globals.css`

## License

This project is licensed under the MIT License.
