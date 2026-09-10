import { test, expect } from '@playwright/test';

export async function loginAndGoToBooking(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com');
  await page.getByPlaceholder('you@email.com').fill('ashishs@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Ashish@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
}

test('Event Test', async ({ page }) => {
  await loginAndGoToBooking(page);
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  await expect(page.getByText('Upcoming Events')).toBeVisible();
  await page.getByRole('button', { name: /Add New Event/i }).click();
  await expect(page.getByRole('heading', { name: /\+ New Event/i })).toBeVisible();
  await expect(page.getByText('You can add up to 6 events.')).toBeVisible();
  await page.getByTestId('event-title-input').fill('My first event');
  await page.getByRole('textbox', { name: 'Describe the event…' }).fill('its a test event');
  await page.getByLabel('Category*').selectOption('Concert');
  await page.getByRole('textbox', { name: 'City*' }).fill('Pune');
  await page.getByRole('textbox', { name: 'Venue*' }).fill('wakad');
  await page.getByLabel('Event Date & Time*').fill('2026-08-01T10:00');
  await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('100');
  await page.getByRole('textbox', { name: 'Image URL (optional)' }).fill('myfirstevent.com');
  await page.getByTestId('add-event-btn').click();
  await expect(page.locator('tbody tr').last().locator('td').first()).toContainText(/My ?first ?event/i);
});

test('Event card test', async ({ page }) => {
  const bookings = page.locator('.space-y-4.mb-8 #booking-card');
  const totalSeats = '100';

  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('ashishs@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Ashish@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  await expect(page.getByText('Upcoming Events')).toBeVisible();
  await expect(page.getByRole('img', { name: /My ?first ?event/i })).toBeVisible();
  await page.getByRole('article').filter({ hasText: /My ?first ?event/i }).getByTestId('book-now-btn').click();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Ashish');
  await page.getByTestId('customer-email').fill('wein@yahoo.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9157898272');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByRole('button', { name: 'View Details' }).nth(0).click();
  await page.getByRole('main').getByRole('link', { name: 'My Bookings', exact: true }).click();

  const count = await bookings.count();
  console.log(count);
  const dayCount = Number(totalSeats) - count;
  console.log(dayCount);

  await page.getByTestId('nav-events').click();
  const myEventCard = page.getByRole('article').filter({ hasText: /My ?first ?event/i });
  const seatText = await myEventCard.locator('span.text-xs.font-semibold.text-emerald-600').textContent();
  console.log(seatText);

  /*if (seatText) {
    await expect(seatText).toContain(`${dayCount} seats available`);
  }*/

  await expect(page).toHaveURL(/events/i);
});

test('Single bookings Test', async ({ page }) => {
  await loginAndGoToBooking(page);
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  // Find the World Tech event and start booking
 const eventCard = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'World Tech Summit' }) });
await eventCard.getByRole('link', { name: 'Book Now' }).click();
  // Fill booking form
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Ashish');
  await page.getByTestId('customer-email').fill('ashish.booker@example.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9157898272');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  // Go to My Bookings and verify the latest booking is present
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(/bookings/i);
  await page.getByRole('button', { name: 'View Details' }).nth(0).click();
 await  page.pause()
  const bookref= await page.locator('span.text-gray-900.font-mono').textContent();
  await console.log(bookref);
  await expect(bookref).toContain('W');
  await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });
  await expect(page.getByTestId('refund-result')).toHaveText(/Eligible for refund/);
  await expect(page.getByTestId('refund-result')).toHaveText(/Single-ticket bookings qualify for a full refund/);
  //await expect(page.locator('tbody tr').last().locator('td').first()).toContainText('World Tech Summit');
});

test.only('Group bookings Test', async ({ page }) => {
  await loginAndGoToBooking(page);
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  // Find the World Tech event and start booking
 const eventCard = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'World Tech Summit' }) });
await eventCard.getByRole('link', { name: 'Book Now' }).click();
  // Fill booking form
  await page.locator('button').filter({ hasText: '+' }).dblclick();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Ashish');
  await page.getByTestId('customer-email').fill('ashish.booker@example.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9157898272');

  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  // Go to My Bookings and verify the latest booking is present
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(/bookings/i);
  await page.getByRole('button', { name: 'View Details' }).nth(0).click();
 await  page.pause()
   const tickets = await page.locator('text=Tickets').locator('..').textContent();
   console.log(tickets);
   const ticketCount = Number(tickets?.match(/\d+/)?.[0] || 0);
   console.log(ticketCount);
  const bookref= await page.locator('span.text-gray-900.font-mono').textContent();
  await console.log(bookref);
  await expect(bookref).toContain('W');
  await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });
  await expect(page.getByTestId('refund-result')).toHaveText(/Not eligible for refund/);
  await expect(page.getByTestId('refund-result')).toHaveText(`Not eligible for refund. Group bookings (${ticketCount} tickets) are non-refundable.`);
  //await expect(page.locator('tbody tr').last().locator('td').first()).toContainText('World Tech Summit');
});