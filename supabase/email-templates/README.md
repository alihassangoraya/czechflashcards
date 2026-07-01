# Czech Flashcards Email Templates

Production email surfaces should use a verified sending domain, branded HTML, plain-text fallbacks, and one clear call to action.

## Auth Templates

Use the files in `auth/` inside Supabase Dashboard -> Authentication -> Email Templates.

Supabase variables used:

- `{{ .ConfirmationURL }}`: one-time auth action link.
- `{{ .Email }}`: recipient email address.
- `{{ .SiteURL }}`: configured site URL.

Templates:

- `auth/confirm-signup.*`: account creation and email confirmation.
- `auth/reset-password.*`: forgot password and password reset.
- `auth/change-email.*`: confirm a requested email address change.

## Lifecycle Templates

Use the files in `lifecycle/` with a transactional email sender such as Resend, SendGrid, Postmark, or Supabase Edge Functions plus SMTP.

Application variables expected:

- `{{user_name}}`
- `{{app_url}}`
- `{{unsubscribe_url}}`
- `{{cards_due}}`
- `{{daily_goal}}`
- `{{streak_days}}`
- `{{reminder_time}}`

Templates:

- `lifecycle/daily-reminder.*`: scheduled daily study reminder.
- `lifecycle/streak-protection.*`: reminder before the daily streak window closes.
- `lifecycle/review-due.*`: due card notification.

## Production Checklist

- Verify the sending domain and configure SPF, DKIM, and DMARC.
- Use a sender like `Czech Flashcards <hello@your-domain.com>`.
- Set Supabase Auth redirect URLs for production, localhost, and mobile deep links.
- Keep auth links short-lived and never include secrets in query strings.
- Include plain-text fallbacks for every HTML email.
- Add unsubscribe links to non-auth lifecycle emails.
- Track delivery, bounce, complaint, and unsubscribe events before scaling reminders.
- Send lifecycle email only after explicit user opt-in in settings.
