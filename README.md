# Training Application Form

## Tech Stack
- React
- Next.js
- Tailwind CSS, shadcn/ui
- Vercel
- Playwright

## Getting Started
```bash
npm run dev
```
Open http://localhost:3000 in your browser

## Test
```bash
npm run test
```

## Features
- All Fields are required. Submit button is disabled if there's any blank field.
- Validate input data with Zod. Display error messages below each field if validation fails. 
- Fetch holiday data from the API and disable national holidays in the calendar.
- Implement an image uploader which supports drag-and-drop uploads.
- Display a notice and hide time slots if a user selects an observance holiday.
- Handle submitted data via Server Action. Redirect to the complete page when submission is successful.
- Catch errors using `error.tsx`
