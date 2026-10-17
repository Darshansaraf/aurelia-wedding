/**
 * Google Apps Script backend for the Aurelia wedding site (RSVP).
 *
 * SETUP
 * 1. Create a Google Sheet. Add a tab named exactly:  RSVP
 *    Header row: Timestamp | Name | Email | Phone | Attending | Guests | Events | Blessing | Locale
 * 2. Extensions > Apps Script. Paste this file (replace Code.gs).
 * 3. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the Web App URL and set it as SHEETS_WEBAPP_URL in Vercel env vars.
 */

function doPost(e) {
  var body = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (body.type === 'rsvp') {
    ss.getSheetByName('RSVP').appendRow([
      new Date(),
      body.name || '',
      body.email || '',
      body.phone || '',
      body.attending || '',
      body.guests || '',
      (body.events || []).join(', '),
      body.blessing || '',
      body.locale || '',
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

