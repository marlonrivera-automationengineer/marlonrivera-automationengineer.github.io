MARLON RIVERA ENGINEERING PORTFOLIO — VERSION 16
=================================================

WHAT IS NEW
-----------
Version 16 keeps the complete Version 15 design and adds optional Google Analytics 4 tracking.

Tracked actions:
- Page views
- Project case-study opens
- CV / portfolio PDF opens
- CV / portfolio PDF downloads
- LinkedIn clicks
- Email clicks
- Cambodia and Philippines phone clicks
- Theme button clicks
- Video play and 25% / 75% progress

IMPORTANT
---------
Analytics is OFF by default until you add your own free GA4 Measurement ID.
No ID or password is included in this package.

HOW TO ENABLE GOOGLE ANALYTICS
------------------------------
1. Create a free Google Analytics 4 property and Web data stream.
2. Copy the Measurement ID beginning with G-.
3. Open analytics-config.js using Notepad.
4. Replace:
       G-XXXXXXXXXX
   with your real Measurement ID, for example:
       G-ABC123DE45
5. Save the file.
6. Upload / commit / push the complete Version 16 website to GitHub Pages.
7. Open your live website and visit several pages.
8. In Google Analytics, open Reports > Realtime to confirm your visit.

FILES ADDED
-----------
analytics-config.js  - the only file you need to edit
analytics.js         - loads GA4 and records portfolio actions

SAFE REPLACEMENT
----------------
Copy all Version 16 files into your repository folder, but keep the existing hidden .git folder.

Suggested commit message:
Publish portfolio Version 16 with analytics

NOTE ABOUT DATA
---------------
Google Analytics reports aggregate traffic such as country, city, device, browser, source and page activity. It does not provide the name of an individual visitor. Country and city are estimates and may be affected by VPNs, company networks or privacy settings.
