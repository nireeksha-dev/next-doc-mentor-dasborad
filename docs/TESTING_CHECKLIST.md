# Testing Checklist - NextDoc UK Mentor Dashboard

## Manual Testing Guide

Use this checklist before deploying to production or handing over to stakeholders.

---

## Functional Testing

### Overview Page (`/mentor/overview`)
- [ ] Today's Sessions display correctly
- [ ] Queue counts show accurate numbers (CVPro, InterviewSim+, SponsorMatch, GapMap)
- [ ] Unread messages badge displays count
- [ ] "Join Meet" button opens Google Meet in new tab
- [ ] At-risk mentees section shows risk indicators
- [ ] Quick action buttons (New Session, New Task, Write Note) are clickable
- [ ] Demo data notice visible at bottom

### Earnings Page (`/mentor/earnings`)
- [ ] Summary cards show "This Month", "Next Payout", "Lifetime" correctly
- [ ] Chart renders without horizontal scroll on mobile
- [ ] "Export CSV" button downloads file with timestamp
- [ ] CSV contains all expected columns (Date, Type, Mentor Fee, etc.)
- [ ] "Download Statement" shows coming soon toast
- [ ] "Contact Finance" opens email client (mailto link)
- [ ] Table shows earnings breakdown with correct status badges (Paid/Pending)
- [ ] Footer notice about Stripe fees is visible

### Instagram Page (`/mentor/instagram`)
- [ ] "Join the Program" button opens "Express Interest" modal
- [ ] "Express Interest" modal has "Send Email" button (mailto link)
- [ ] "Read Content Guidelines" link navigates to `/mentor/instagram/guidelines`
- [ ] Feature preview cards (Easy Upload, Track Impact, Earn Extra) link to guidelines sections
- [ ] "Notify Me" button validates email input
- [ ] Invalid email shows error toast
- [ ] Valid email shows success toast and disables input
- [ ] Email submission disables button with "Subscribed ✓" text
- [ ] Compliance footer is visible

### Instagram Guidelines Page (`/mentor/instagram/guidelines`)
- [ ] All sections render correctly (What to Share, What NOT to Share, GMC Guidelines, etc.)
- [ ] Color-coded cards (green for allowed, red for prohibited) display properly
- [ ] "Back to Instagram" link navigates to `/mentor/instagram`
- [ ] Collapsible sections (if implemented) expand/collapse correctly
- [ ] External links (GMC guidance) open in new tab

### Mentees Page (`/mentor/mentees`)
- [ ] Mentee cards display with avatar placeholders
- [ ] Progress indicators (CV Readiness, InterviewSim Band) show correct values
- [ ] Risk badges (High, Medium, Low) have correct colors
- [ ] "Message" button is clickable
- [ ] "Schedule Session" button is clickable
- [ ] Search/filter functionality works (if implemented)

### Tasks Page (`/mentor/tasks`)
- [ ] Task cards display with correct priority badges
- [ ] Due dates are formatted correctly (UK date format)
- [ ] "Mark as Complete" button changes task status
- [ ] Completed tasks move to "Completed" tab or disappear from list
- [ ] Product icons (CVPro, InterviewSim+, etc.) display with correct colors

### Sessions Page (`/mentor/sessions`)
- [ ] Calendar view displays upcoming sessions
- [ ] "Join Meet" button opens Google Meet link
- [ ] "New Session" button opens creation modal
- [ ] Session creation form validates required fields
- [ ] Created sessions appear in calendar

### Messages Page (`/mentor/messages`)
- [ ] Message threads display in left sidebar
- [ ] Unread count badges appear on threads
- [ ] Clicking thread loads conversation
- [ ] Message input allows text entry
- [ ] "Send" button submits message
- [ ] Sent messages appear in conversation instantly

### Analytics Page (`/mentor/analytics`)
- [ ] Charts render without errors
- [ ] Engagement metrics display correct numbers
- [ ] Date range filters work (if implemented)

### Settings Page (`/mentor/settings`)
- [ ] Profile information displays correctly
- [ ] "Legal & Compliance" section shows agreement status
- [ ] "View Agreement" button opens `MentorAgreementModal`
- [ ] "Sign Out" button logs out user
- [ ] Demo data warning is visible

### Legal Agreement Modal
- [ ] Modal opens when triggered from Settings
- [ ] ScrollArea allows scrolling through agreement text
- [ ] Checkbox must be checked before "Accept" button is enabled
- [ ] "Accept" button saves consent (localStorage in Phase 1)
- [ ] Success toast appears after acceptance
- [ ] Modal closes after acceptance
- [ ] "Cancel" button closes modal without saving

---

## Responsive Design Testing

### Mobile (<768px)
- [ ] Sidebar collapses to hamburger menu
- [ ] Cards stack vertically
- [ ] Tables scroll horizontally without breaking layout
- [ ] Buttons are large enough to tap (min 44x44px)
- [ ] Text remains readable (min 16px font size)
- [ ] Charts scale correctly
- [ ] Modals fit screen without vertical scroll

### Tablet (768px - 1024px)
- [ ] 2-column grid layouts work correctly
- [ ] Sidebar remains visible or toggleable
- [ ] Charts maintain aspect ratio
- [ ] Touch targets are appropriately sized

### Desktop (>1024px)
- [ ] 3-4 column grid layouts display correctly
- [ ] Sidebar is always visible
- [ ] Max-width constraints prevent excessive stretching (max-w-7xl)
- [ ] Hover states work on buttons and cards

---

## Cross-Browser Compatibility

Test on:
- [ ] **Chrome** (latest 2 versions)
- [ ] **Firefox** (latest 2 versions)
- [ ] **Safari** (latest 2 versions)
- [ ] **Edge** (latest 2 versions)
- [ ] **Mobile Safari** (iOS 15+)
- [ ] **Chrome Mobile** (Android 12+)

Check for:
- CSS animations work
- Flexbox/Grid layouts render correctly
- Fonts load properly
- Icons display (Lucide React)

---

## Accessibility Testing (WCAG AA)

### Keyboard Navigation
- [ ] Tab order is logical (top to bottom, left to right)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible (2px NHS blue ring)
- [ ] Modal traps focus correctly
- [ ] Escape key closes modals
- [ ] Enter key submits forms

### Screen Reader Testing (NVDA/JAWS)
- [ ] Page title announces correctly
- [ ] Headings are hierarchical (H1 → H2 → H3)
- [ ] Links have descriptive text (not "Click here")
- [ ] Buttons have accessible labels (not just icons)
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Toast notifications are announced (aria-live="polite")

### Color Contrast
- [ ] Text meets 4.5:1 contrast ratio (body text)
- [ ] Headings meet 3:1 contrast ratio (large text)
- [ ] Interactive elements have sufficient contrast in all states (default, hover, focus)
- [ ] Error states are not conveyed by color alone (use icons + text)

### Alternative Text
- [ ] All images have descriptive `alt` attributes
- [ ] Decorative images have `alt=""` (empty string)
- [ ] Icon-only buttons have `aria-label`

---

## Performance Testing

### Lighthouse Scores (Chrome DevTools)
- [ ] **Performance**: >90 (desktop), >80 (mobile)
- [ ] **Accessibility**: 100
- [ ] **Best Practices**: 100
- [ ] **SEO**: >90

### Load Times
- [ ] Initial page load <3 seconds (3G connection)
- [ ] Time to Interactive (TTI) <5 seconds
- [ ] First Contentful Paint (FCP) <2 seconds

### Bundle Size
- [ ] Total bundle size <500KB (gzipped)
- [ ] Check with `npm run build` and inspect `dist/` folder
- [ ] No unused dependencies (check with `npm run lint`)

---

## Security Testing

### Data Validation
- [ ] Email inputs validate format
- [ ] Form fields have max-length restrictions
- [ ] No SQL injection vulnerabilities (parameterized queries on backend)
- [ ] XSS protection (no `dangerouslySetInnerHTML` with user input)

### Authentication
- [ ] JWT tokens expire after 24 hours
- [ ] Expired tokens redirect to login
- [ ] Protected routes require authentication
- [ ] Role-based access control works (mentor role required)

### Sensitive Data
- [ ] No console.log statements with user data in production build
- [ ] API keys not exposed in frontend code
- [ ] Environment variables used correctly

---

## Edge Cases & Error Handling

### Empty States
- [ ] No sessions scheduled shows empty state message
- [ ] No earnings history shows placeholder
- [ ] No mentees assigned shows empty state
- [ ] No unread messages shows "All messages read"

### Error States
- [ ] API failure shows user-friendly error message
- [ ] Network offline shows warning banner
- [ ] Invalid form input shows validation error
- [ ] Missing data shows skeleton loaders, not blank screen

### Loading States
- [ ] Skeleton loaders appear during data fetch
- [ ] Button shows loading spinner on click
- [ ] Page transitions smooth (no flash of unstyled content)

---

## User Acceptance Testing Scenarios

### Scenario 1: New Mentor Accepts Agreement
1. Open Settings page
2. Click "View Agreement" in Legal & Compliance section
3. Read agreement (scroll through)
4. Check "I have read..." checkbox
5. Click "Accept and Continue"
6. Verify success toast appears
7. Verify modal closes
8. Verify agreement status shows "Accepted" with timestamp

### Scenario 2: Mentor Expresses Instagram Interest
1. Navigate to Instagram page
2. Click "Join the Program" button
3. Verify "Express Interest" modal opens
4. Read beta onboarding instructions
5. Click "Send Email" button
6. Verify email client opens with pre-filled subject/body
7. Close modal

### Scenario 3: Mentor Exports Earnings CSV
1. Navigate to Earnings page
2. Verify summary cards display amounts
3. Click "Export CSV" button
4. Verify CSV file downloads with timestamp in filename
5. Open CSV in Excel/Google Sheets
6. Verify all columns present (Date, Type, Mentor Fee, etc.)
7. Verify data matches table on page

### Scenario 4: Mentor Subscribes to Instagram Waitlist
1. Navigate to Instagram page
2. Scroll to "Get Early Access" section
3. Enter valid email in input field
4. Click "Notify Me" button
5. Verify success toast appears with email confirmation
6. Verify input and button become disabled
7. Verify button text changes to "Subscribed ✓"

### Scenario 5: Mentor Reviews Content Guidelines
1. Navigate to Instagram page
2. Click "Read Content Guidelines" link
3. Verify navigation to `/mentor/instagram/guidelines`
4. Scroll through all sections
5. Verify color-coded cards (green/red) render correctly
6. Click external link (GMC guidance) - verify opens in new tab
7. Click "Back to Instagram" - verify navigation works

---

## Pre-Production Checklist

### Before Deploying
- [ ] All tests above passed
- [ ] No `console.log` or `debugger` statements
- [ ] Environment variables set in hosting platform
- [ ] `.env.local` not committed to Git (in `.gitignore`)
- [ ] Build succeeds without warnings (`npm run build`)
- [ ] Bundle analyzed for unnecessary dependencies
- [ ] Error tracking configured (Sentry/LogRocket)
- [ ] Analytics installed (Google Analytics/Plausible)
- [ ] Privacy policy and cookie consent implemented

### Legal & Compliance
- [ ] Privacy Policy published and linked
- [ ] Terms of Service published and linked
- [ ] Code of Conduct published
- [ ] GDPR data retention policy defined
- [ ] Cookie consent banner (if using analytics)

### Documentation
- [ ] README.md updated with deployment instructions
- [ ] API_INTEGRATION.md reviewed by backend team
- [ ] Environment variables documented
- [ ] Known issues/limitations documented

---

## Automated Testing (Future Implementation)

### Unit Tests (Vitest + React Testing Library)
```typescript
// Example test structure
describe('Earnings Page', () => {
  it('displays summary cards with mock data', async () => {
    render(<Earnings />);
    await waitFor(() => {
      expect(screen.getByText('£202.40')).toBeInTheDocument();
    });
  });
  
  it('exports CSV when button clicked', async () => {
    render(<Earnings />);
    const exportBtn = screen.getByText('Export CSV');
    fireEvent.click(exportBtn);
    expect(screen.getByText(/CSV Export Complete/)).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)
```typescript
test('Mentor can view earnings and export CSV', async ({ page }) => {
  await page.goto('/mentor/earnings');
  await expect(page.locator('text=£202.40')).toBeVisible();
  
  const downloadPromise = page.waitForEvent('download');
  await page.click('button:has-text("Export CSV")');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/earnings_\d{4}-\d{2}-\d{2}.csv/);
});
```

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Maintained By**: NextDoc UK QA Team
