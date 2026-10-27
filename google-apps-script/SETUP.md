# RSVP → Google Sheet setup

Sheet: https://docs.google.com/spreadsheets/d/1kevBd5Wg999nSC1B7Swyo35zeplCxKp18Joaidn3Zp0/edit

1. Open the sheet, then **Extensions > Apps Script**.
2. Delete everything in `Code.gs` and paste in the contents of `google-apps-script/code.gs`. Save.
3. **Deploy > New deployment**, click the gear icon, choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, approve the permissions (Advanced > Go to project > Allow).
5. Copy the **Web app URL** (ends in `/exec`).
6. Paste it into `RSVP_SCRIPT_URL` in `src/components/RSVPForm.tsx`, then commit and push.

The script creates an `RSVP` tab with these columns on the first reply:
Timestamp | Name | Attending | Guests | Message | Invited As | Invitation Link

To check it's live, open the `/exec` URL in a browser; it should say the endpoint is running.

If you change `code.gs` later: **Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy**.
That keeps the same URL, so the website doesn't need changing.
