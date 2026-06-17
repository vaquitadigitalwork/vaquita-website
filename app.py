from flask import Flask, render_template, request, jsonify, redirect, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import json
import os
import requests

app = Flask(__name__)

# =====================================================
# CACHE CONTROL (BETTER MOBILE + LOADING PERFORMANCE)
# =====================================================

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# =====================================================
# LOAD ENV VARIABLES FROM .env IF PRESENT
# =====================================================

if os.path.exists(".env"):
    try:
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    # Strip whitespace and quotes
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    os.environ[key] = val
        print(">>> [ENV] Successfully loaded variables from .env file")
    except Exception as e:
        print(f">>> [ENV] Warning: Failed to parse .env file: {e}")


# =====================================================
# GOOGLE SHEETS CONNECTION & DIAGNOSTICS
# =====================================================

# =====================================================
# GOOGLE SHEETS CONNECTION
# =====================================================

scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive"
]

sheet = None
client = None
creds = None

try:
    creds_json = os.environ.get("GOOGLE_CREDENTIALS")
    
    if creds_json:
        try:
            # Try parsing as JSON string
            creds_dict = json.loads(creds_json)
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            print(">>> [SHEETS] Loaded credentials from GOOGLE_CREDENTIALS JSON string")
        except json.JSONDecodeError:
            # If not JSON, treat as file path
            if os.path.exists(creds_json):
                try:
                    creds = ServiceAccountCredentials.from_json_keyfile_name(creds_json, scope)
                    print(f">>> [SHEETS] Loaded credentials from file path: {creds_json}")
                except Exception as ex:
                    print(f">>> [SHEETS] ERROR: Failed loading credentials from file path '{creds_json}': {ex}")
            else:
                print(f">>> [SHEETS] ERROR: GOOGLE_CREDENTIALS is not a valid JSON string or file path: {creds_json}")
    else:
    # Check local credentials file
        for filename in ["credentials.json"]:
            print("Checking:", filename)
            print("Exists:", os.path.exists(filename))

            if os.path.exists(filename):
                try:
                    creds = ServiceAccountCredentials.from_json_keyfile_name(
                    filename,
                    scope)

                    print("SUCCESS: Credentials loaded from", filename)
                    break

                except Exception as ex:
                    print("FAILED TO LOAD CREDENTIALS")
                    print(ex)
    
            if os.path.exists(filename):
                try:
                    creds = ServiceAccountCredentials.from_json_keyfile_name(filename, scope)
                    print(f">>> [SHEETS] Loaded credentials from local file: {filename}")
                    break
                except Exception as ex:
                    print(f">>> [SHEETS] ERROR: Failed loading credentials from {filename}: {ex}")

    if creds:
        try:
            print("STEP 1: Authorizing...")
            client = gspread.authorize(creds)

            print("STEP 2: Opening spreadsheet...")
            spreadsheet = client.open("Vaquita Client Leads")

            print("STEP 3: Getting sheet1...")
            sheet = spreadsheet.sheet1

            print(">>> Google Sheets Connected Successfully")

        except Exception as ex:
            import traceback

            print(">>> GOOGLE SHEETS ERROR")
            print(">>> ERROR TYPE:", type(ex).__name__)
            print(">>> ERROR:", ex)

            traceback.print_exc()

            sheet = None

    else:
        print(">>> Google Sheets Connection is Offline (No credentials found). Leads will be saved locally to leads.json")

except Exception as e:
    import traceback

    print(">>> Google Sheets Connection Failed")
    print(">>> ERROR:", str(e))

    traceback.print_exc()

    sheet = None
# =====================================================
# REVIEWS SYSTEM — saves to reviews.json
# =====================================================

REVIEWS_FILE = "reviews.json"


def load_reviews():

    if not os.path.exists(REVIEWS_FILE):
        return []

    try:
        with open(REVIEWS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []



def save_review(review):

    reviews = load_reviews()

    reviews.insert(0, review)

    with open(REVIEWS_FILE, "w") as f:
        json.dump(reviews, f, indent=2)


@app.route("/api/reviews")
def api_reviews():
    return jsonify(load_reviews())



# =====================================================
# ADVANCED VAQUITA CHATBOT TRAINING
# =====================================================


def get_vaquita_reply(message):

    text = message.lower().strip()

    # =================================================
    # GREETINGS
    # =================================================

    if any(word in text for word in [
        "hi",
        "hello",
        "hey",
        "hii",
        "good morning",
        "good evening",
        "good afternoon"
    ]):

        return """
👋 Welcome to Vaquita Digital Solutions

We help businesses, startups, creators, and freelancers grow professionally online.

Our Main Services:

🌐 Website Design & Development
📈 Digital Marketing
💼 Freelancing Guidance
🎨 Branding & UI Design
🚀 Business Growth Support

Please tell us how we can help you today.
"""

    # =================================================
    # WEBSITE DEVELOPMENT
    # =================================================

    elif any(word in text for word in [
        "website",
        "web design",
        "web development",
        "landing page",
        "portfolio website",
        "business website",
        "wordpress",
        "responsive",
        "ui ux",
        "frontend",
        "backend"
    ]):

        return """
🌐 Vaquita Website Development Services

We create premium and modern websites for:

✔ Businesses
✔ Startups
✔ Personal Brands
✔ Freelancers
✔ Agencies
✔ Online Stores

Website Features:

• Responsive Mobile Design
• Modern UI/UX
• Fast Loading Speed
• SEO Optimization
• Professional Animations
• Contact Forms
• WhatsApp Integration
• Admin Panels
• Secure Hosting Support

Technologies We Use:

• HTML CSS JavaScript
• Flask Python
• WordPress
• React
• Bootstrap

We design websites that look professional and help your business grow online.
"""

    # =================================================
    # DIGITAL MARKETING
    # =================================================

    elif any(word in text for word in [
        "marketing",
        "digital marketing",
        "seo",
        "instagram",
        "facebook ads",
        "google ads",
        "promotion",
        "brand growth",
        "social media",
        "advertising"
    ]):

        return """
📈 Vaquita Digital Marketing Services

We help businesses grow online using professional marketing strategies.

Services Include:

✔ Instagram Growth
✔ SEO Optimization
✔ Google Ads
✔ Social Media Management
✔ Brand Promotion
✔ Content Creation
✔ Business Reach Improvement
✔ Audience Targeting
✔ Marketing Strategy

Benefits:

🚀 More Customers
🚀 Better Online Presence
🚀 Higher Engagement
🚀 Increased Sales
🚀 Strong Brand Identity

Our goal is to help your business grow professionally.
"""

    # =================================================
    # FREELANCING
    # =================================================

    elif any(word in text for word in [
        "freelance",
        "freelancer",
        "upwork",
        "fiverr",
        "client",
        "gig",
        "remote work"
    ]):

        return """
💼 Freelancing Guidance by Vaquita

We help students and beginners start freelancing professionally.

We Guide You In:

✔ Fiverr Setup
✔ Upwork Setup
✔ Portfolio Building
✔ Pricing Strategy
✔ Getting Clients
✔ Profile Optimization
✔ Personal Branding
✔ Communication Skills
✔ Freelance Business Growth

Perfect For:

• Students
• Beginners
• Designers
• Developers
• Content Creators

We help you build a professional freelancing career step by step.
"""

    # =================================================
    # PRICING
    # =================================================

    elif any(word in text for word in [
        "price",
        "pricing",
        "cost",
        "budget",
        "charges",
        "fee",
        "payment"
    ]):

        return """
💰 Vaquita Pricing Information

Our pricing depends on:

✔ Project Type
✔ Features Required
✔ Delivery Time
✔ Design Complexity
✔ Marketing Requirements

We provide:

🌐 Website Packages
📈 Marketing Packages
💼 Freelance Guidance Plans

Benefits:

• Professional Quality
• Flexible Pricing
• Client-Friendly Packages
• Custom Solutions

Please visit our Pricing page or contact our team for a custom quotation.
"""

    # =================================================
    # CONTACT
    # =================================================

    elif any(word in text for word in [
        "contact",
        "phone",
        "email",
        "whatsapp",
        "instagram",
        "support"
    ]):

        return """
📞 Contact Vaquita Digital Solutions

You can contact us through:

✔ Website Contact Form
✔ WhatsApp
✔ Instagram
✔ Email Support

Our team usually responds quickly to all client requests.

Please leave your details and requirements and our team will contact you shortly.
"""

    # =================================================
    # PORTFOLIO
    # =================================================

    elif any(word in text for word in [
        "portfolio",
        "projects",
        "works",
        "samples",
        "previous work"
    ]):

        return """
🎨 Vaquita Portfolio

We have worked on:

✔ Business Websites
✔ Startup Landing Pages
✔ Personal Brand Websites
✔ Freelance Portfolios
✔ UI/UX Designs
✔ Marketing Projects

Our designs focus on:

🚀 Modern Appearance
🚀 Professional Branding
🚀 User Experience
🚀 Business Growth

Please visit the Portfolio section to explore our latest work.
"""

    # =================================================
    # SEO
    # =================================================

    elif any(word in text for word in [
        "seo",
        "ranking",
        "google ranking",
        "search engine"
    ]):

        return """
🔍 SEO Services by Vaquita

We help improve your website visibility on Google.

Our SEO Services Include:

✔ Keyword Optimization
✔ Website Speed Optimization
✔ Technical SEO
✔ Content Optimization
✔ Mobile Optimization
✔ Local SEO

Benefits:

🚀 Better Google Ranking
🚀 More Website Traffic
🚀 More Leads
🚀 More Customers
"""

    # =================================================
    # BUSINESS GROWTH
    # =================================================

    elif any(word in text for word in [
        "business",
        "startup",
        "grow",
        "brand",
        "company"
    ]):

        return """
🚀 Business Growth Solutions

Vaquita helps businesses build a strong online presence.

We support:

✔ Startups
✔ Small Businesses
✔ Personal Brands
✔ Freelancers
✔ Agencies

Our solutions combine:

🌐 Website Development
📈 Digital Marketing
🎨 Branding
💼 Growth Strategies

We focus on real business growth with professional digital solutions.
"""

    # =================================================
    # THANK YOU
    # =================================================

    elif any(word in text for word in [
        "thank",
        "thanks",
        "thank you"
    ]):

        return """
😊 You're Welcome

Thank you for contacting Vaquita Digital Solutions.

We are always happy to help you grow your business professionally.
"""

    # =================================================
    # DEFAULT REPLY
    # =================================================

    else:

        return """
🤖 Vaquita AI Assistant

I can help you with:

🌐 Website Development
📈 Digital Marketing
💼 Freelancing Guidance
🎨 Branding & UI Design
🚀 Business Growth
💰 Pricing Information
📞 Contact Support

Please ask your question in detail so I can assist you better.
"""


# =====================================================
# ROUTES
# =====================================================
print("FINAL SHEET OBJECT =", sheet)
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


@app.route("/pricing")
def pricing():
    return render_template("pricing.html")


@app.route("/testimonials")
def testimonials():
    reviews = load_reviews()
    return render_template("testimonials.html", reviews=reviews)


@app.route("/faq")
def faq():
    return render_template("faq.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


# =====================================================
# SUBMIT REVIEW — saves to reviews.json
# =====================================================

@app.route("/submit-review", methods=["POST"])
def submit_review():

    name = request.form.get("name", "").strip()
    role = request.form.get("role", "").strip()
    rating = request.form.get("rating", "5").strip()
    text = request.form.get("text", "").strip()
    try:
        rating_value = max(1, min(5, int(rating)))
    except Exception:
        rating_value = 5

    if name and text:

        review = {
            "name": name,
            "role": role if role else "Client",
            "rating": rating_value,
            "text": text,
            "date": datetime.now().strftime("%d %b %Y"),
            "avatar": name[0].upper()
        }

        save_review(review)

    return redirect(url_for("testimonials") + "?submitted=1#submit")


# =====================================================
# CHATBOT API
# =====================================================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "")

    bot_reply = get_vaquita_reply(user_message)

    return jsonify({
        "reply": bot_reply
    })



@app.route("/submit-contact", methods=["POST"])
def submit_contact():
    # 1. Parse fields from form data OR JSON request
    if request.is_json:
        data = request.get_json() or {}
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        phone = data.get("phone", "").strip()
        service = data.get("service_type", "").strip() or data.get("service", "").strip()
        amount = str(data.get("amount", "")).strip()
        message = data.get("message", "").strip()
    else:
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        phone = request.form.get("phone", "").strip()
        service = request.form.get("service_type", "").strip()
        amount = request.form.get("amount", "").strip()
        message = request.form.get("message", "").strip()

    date = datetime.now().strftime("%d-%m-%Y %H:%M")
    if not name:
        return jsonify({
        "status": "error",
        "message": "Name is required"
    }), 400

    if not email:
        return jsonify({
        "status": "error",
        "message": "Email is required"
    }), 400
    print(f"\n>>> [CONTACT ROUTE] Processing new submission for: {email} at {date}")

    lead_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "service": service,
        "amount": amount,
        "message": message,
        "date": date
    }

    # 2. FAIL-SAFE: Append to local leads.json
    local_saved = False
    try:
        leads = []
        if os.path.exists("leads.json"):
            with open("leads.json", "r", encoding="utf-8") as f:
                leads = json.load(f)
        leads.append(lead_data)
        with open("leads.json", "w", encoding="utf-8") as f:
            json.dump(leads, f, indent=2)
        local_saved = True
        print(f">>> [CONTACT ROUTE] Lead successfully backed up to local database: leads.json")
    except Exception as e:
        print(f">>> [CONTACT ROUTE] WARNING: Local backup failed: {e}")

    # 3. DIRECT METHOD: Append row to Google Sheets via gspread
    sheet_success = False
    sheet_error = ""
    if sheet:
        try:
            sheet.append_row([
                name,
                email,
                phone,
                service,
                amount,
                message,
                date
            ])
            sheet_success = True
            print(f">>> [CONTACT ROUTE] Lead successfully saved to Google Sheets via gspread")
        except Exception as e:
            sheet_error = str(e)
            print(f">>> [CONTACT ROUTE] ERROR: Direct Google Sheets append failed: {e}")
    else:
        print(">>> [CONTACT ROUTE] Direct Google Sheets connection is offline (no sheet object)")

    # 4. WEBHOOK METHOD: POST to Google Apps Script Webhook
    webhook_success = False
    webhook_error = ""
    webhook_url = os.environ.get("GOOGLE_SHEET_WEBHOOK_URL")
    
    if webhook_url:
        try:
            print(f">>> [CONTACT ROUTE] Dispatching webhook to Apps Script: {webhook_url}")
            response = requests.post(
                webhook_url,
                json=lead_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            if response.status_code in [200, 201]:
                webhook_success = True
                print(f">>> [CONTACT ROUTE] Webhook successfully completed (Status: {response.status_code})")
            else:
                webhook_error = f"Status {response.status_code}: {response.text}"
                print(f">>> [CONTACT ROUTE] ERROR: Webhook endpoint returned status {response.status_code}")
        except Exception as e:
            webhook_error = str(e)
            print(f">>> [CONTACT ROUTE] ERROR: Webhook dispatch failed: {e}")

    # 5. AJAX RESPONSE NEGOTIATION
    if request.headers.get("Accept") == "application/json" or request.is_json:
        return jsonify({
            "status": "success" if (local_saved or sheet_success or webhook_success) else "error",
            "message": "Form submitted successfully.",
            "diagnostics": {
                "local_saved": local_saved,
                "sheet_success": sheet_success,
                "sheet_error": sheet_error,
                "webhook_success": webhook_success,
                "webhook_error": webhook_error
            }
        })

    return f"""
    <!DOCTYPE html>
    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta name="viewport"
            content="width=device-width, initial-scale=1.0">

      <title>Vaquita | Message Submitted</title>

      <style>

        * {{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }}

        body {{

          font-family: Arial, sans-serif;

          background:
            linear-gradient(
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.08)
            ),
            url('/static/bg.jpg');

          background-size: cover;
          background-position: center;
          background-attachment: fixed;

          display: flex;
          justify-content: center;
          align-items: center;

          min-height: 100vh;

          padding: 20px;
        }}

        .box {{

          width: 100%;
          max-width: 650px;

          padding: 40px;

          border-radius: 26px;

          background: rgba(255,255,255,0.15);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border: 1px solid rgba(255,255,255,0.25);

          box-shadow:
            0 10px 40px rgba(0, 94, 255, 0.18),
            inset 0 1px 1px rgba(255,255,255,0.35);

          text-align: center;

          color: #07172f;

          animation: fadeUp 0.8s ease;
        }}

        @keyframes fadeUp {{
          from {{
            opacity: 0;
            transform: translateY(30px);
          }}

          to {{
            opacity: 1;
            transform: translateY(0);
          }}
        }}

        h2 {{
          font-size: 38px;
          margin-bottom: 18px;
          color: #005eff;
        }}

        p {{
          margin-top: 14px;
          font-size: 17px;
          line-height: 1.8;
          color: #0f172a;
        }}

        strong {{
          color: #003b91;
        }}

        .success-icon {{
          font-size: 70px;
          color: #005eff;
          margin-bottom: 18px;
        }}

        .btn {{

          display: inline-block;

          margin-top: 30px;

          text-decoration: none;

          background:
            linear-gradient(
              135deg,
              #005eff,
              #4da6ff
            );

          color: white;

          padding: 14px 26px;

          border-radius: 12px;

          font-weight: 600;

          transition: 0.3s ease;
        }}

        .btn:hover {{
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,94,255,0.25);
        }}

        @media (max-width: 768px) {{

          .box {{
            padding: 28px 22px;
          }}

          h2 {{
            font-size: 28px;
          }}

          p {{
            font-size: 15px;
          }}

          .btn {{
            width: 100%;
          }}

        }}

      </style>

    </head>

    <body>

      <div class="box">

        <div class="success-icon">
          ✓
        </div>

        <h2>
          Thank You, {name}!
        </h2>

        <p>
          Your request has been submitted successfully.
        </p>

        <p>
          Our Vaquita team will contact you shortly.
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>

        <p>
          <strong>Phone:</strong> {phone}
        </p>

        <p>
          <strong>Selected Service:</strong> {service}
        </p>

        <p>
          <strong>Budget / Amount:</strong> ₹{amount}
        </p>

        <p>
          <strong>Message:</strong> {message}
        </p>

        <a href="/" class="btn">
          Back To Home
        </a>

      </div>

    </body>

    </html>
    """


# =====================================================
# AFTER REQUEST
# =====================================================

@app.after_request
def add_header(response):

    response.headers['Cache-Control'] = 'no-store'

    return response



if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )