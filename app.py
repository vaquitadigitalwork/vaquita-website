from flask import Flask, render_template, request, jsonify, redirect, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import json
import os

app = Flask(__name__)

# =====================================================
# CACHE CONTROL (BETTER MOBILE + LOADING PERFORMANCE)
# =====================================================

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# =====================================================
# GOOGLE SHEETS CONNECTION
# =====================================================

scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive"
]

creds_json = os.environ.get("GOOGLE_CREDENTIALS")

if creds_json:
    creds_dict = json.loads(creds_json)
    creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
    client = gspread.authorize(creds)
    sheet = client.open("Vaquita Client Leads").sheet1
else:
    creds = None
    client = None
    sheet = None




# =====================================================
# REVIEWS SYSTEM — saves to reviews.json
# =====================================================

REVIEWS_FILE = "reviews.json"


def load_reviews():

    if not os.path.exists(REVIEWS_FILE):
        return []

    with open(REVIEWS_FILE, "r") as f:
        return json.load(f)



def save_review(review):

    reviews = load_reviews()

    reviews.insert(0, review)

    with open(REVIEWS_FILE, "w") as f:
        json.dump(reviews, f, indent=2)


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

    if name and text:

        review = {
            "name": name,
            "role": role if role else "Client",
            "rating": max(1, min(5, int(rating))),
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

    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    service = request.form.get("service_type", "").strip()
    amount = request.form.get("amount", "").strip()
    message = request.form.get("message", "").strip()

    date = datetime.now().strftime("%d-%m-%Y %H:%M")

    # SAVE DATA TO GOOGLE SHEET
        # SAVE DATA TO GOOGLE SHEET
    if sheet:
        sheet.append_row([
            name,
            email,
            phone,
            service,
            amount,
            message,
            date
        ])

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
    app.run(debug=True)