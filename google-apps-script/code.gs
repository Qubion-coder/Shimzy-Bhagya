// Shimzy & Bhagya — RSVP receiver
// Paste this whole file into Extensions > Apps Script of the RSVP spreadsheet,
// then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).

const SPREADSHEET_ID = '1kevBd5Wg999nSC1B7Swyo35zeplCxKp18Joaidn3Zp0';
const SHEET_NAME = 'RSVP';
const HEADERS = ['Timestamp', 'Name', 'Attending', 'Guests', 'Message', 'Invited As', 'Invitation Link'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // keep simultaneous replies from overwriting each other

    const data = (e && e.parameter) || {};
    const name = clean_(data.fullName, 120);
    if (!name) {
      return json_({ ok: false, error: 'Name is required.' });
    }

    const attending = String(data.attending).toLowerCase() === 'no' ? 'No' : 'Yes';
    const guests = attending === 'Yes' ? Math.min(Math.max(parseInt(data.guests, 10) || 1, 1), 20) : 0;

    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      name,
      attending,
      guests,
      clean_(data.message, 1000),
      clean_(data.invitedAs, 120),
      clean_(data.page, 300),
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'Shimzy & Bhagya RSVP endpoint is running.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#000000')
      .setFontColor('#d4af37');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy hh:mm a');
  }
  return sheet;
}

// Trim, cap length, and stop text being read as a spreadsheet formula
function clean_(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
