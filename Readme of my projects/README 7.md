pos-backend API
Backend service for the POS ecosystem, implemented with Express and MongoDB. This project provides core API infrastructure, authentication middleware, error handling, Swagger docs, and feature modules shared by frontend applications.

Purpose
pos-backend is the central API layer for connected frontend projects (POS and Pos-Admin). Its responsibilities include:

request routing and middleware orchestration,
authentication token parsing/verification,
CORS and security hardening,
database connectivity and model-level plugins,
standardized error conversion/handling,
API documentation through Swagger/OpenAPI.
Current Architecture
Core entry and configuration flow:

app.js: app bootstrap, middleware wiring, route registration, and server startup
config/Routes.js: feature route mapping
middlewares/Base.js: base middleware setup and auth exclusions
config/db.js: MongoDB connection and index sync behavior
config/swagger.js: runtime swagger generation/validation and docs exposure
modules/logger.js: centralized logging abstraction
Feature Modules
Feature-first structure lives under features/.

Currently wired route groups include:

/role from features/role/controller/RoleController
The repository also includes OpenAPI YAML docs for broader domains (auth, category, customerProfile, job, order, tailorProfile), indicating a design that supports modular expansion.

Security and Middleware Highlights
Helmet for secure HTTP headers
CORS with configurable origins via CORS_ORIGINS
JWT token verification (JWT_SECRET_KEY)
not-found, error-logging, error-conversion, and final error handler middleware chain
duplicate key and validation normalization for database errors
Environment Variables
Important env vars referenced in code:

PORT
API_HOST
CORS_ORIGINS
JWT_SECRET_KEY
MONGO_URI
REDIS_URL
BASE_PATH
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NODE_ENV
Create a .env file in the project root and define these values per environment.

API Documentation
Swagger is initialized at runtime and exposed at:

/api-docs
/swagger.json
This enables frontend teams to validate available endpoints during integration.

Getting Started
Prerequisites
Node.js 18+
npm 9+
MongoDB instance
(optional) Redis instance
Install
npm install
Run in Development
npm run dev
By default, app startup uses values from .env and listens on configured host/port.

Scripts
npm run dev: start the server via node app.js
npm run typecheck: run TypeScript checks
npm run lint: run ESLint on .js and .ts
npm run format: run Prettier formatting
Connected Repositories
This backend serves two separate frontend applications:

POS: operations and in-store workflow frontend
Pos-Admin: administration and control-panel frontend
Backend acts as the single source of truth for auth, persistence, and business rules.

Operational Notes
Keep CORS origin settings synchronized with deployed frontend URLs.
Ensure JWT secret and database credentials are managed securely.
Expand route registration in config/Routes.js as additional feature modules are promoted from docs to runtime routes.Pos-Admin Frontend
Administrative control-panel frontend for the POS ecosystem, built with Next.js. This project is focused on platform-level management such as client onboarding, plan management, profile/settings, and communication tooling.

Purpose
Pos-Admin is the management interface used by internal/admin users. It is intended to:

manage clients and account-level information,
define and monitor plans/subscriptions,
configure profile/settings and notification preferences,
support communication workflows (email/templates/announcements),
provide a dashboard view for oversight and reporting.
Functional Areas
Major route-level areas currently include:

dashboard: overview and metrics UI
client-management: client listing/details and per-client flows
plan-management: plan administration
(settings)/Profile: profile management
(settings)/email-tempate: communication template management
Notification: notification center
login: authentication entry route
Tech Stack
Next.js 15, React 19, TypeScript
Tailwind CSS 4
MUI and Radix UI components
Framer Motion for UI transitions
React Hook Form
Data Layer Notes
The project has modular utility services under src/lib/util, including:

clientService
plan-api
email-api
profile-api
notifications.api
Several modules currently use mock/simulated delays and example data patterns. This is useful for UI development but should be aligned with real API integrations before production.

Project Structure
src/
app/ # App Router pages, route modules, layouts
components/ # Shared and feature UI components
lib/
util/ # Service/API utility modules
services/ # Supporting service-layer logic
Getting Started
Prerequisites
Node.js 18+
npm 9+
Install
npm install
Run in Development
npm run dev
Default local URL:

http://localhost:3000
Build and Run Production
npm run build
npm run start
Scripts
npm run dev: start local development server
npm run build: create production build
npm run start: start production server
npm run lint: run ESLint
Connected Repositories
This repository is one part of a connected three-project setup:

POS: store/operator-facing frontend
Pos-Admin (this repo): platform/admin-facing frontend
pos-backend: backend API and business logic
Pos-Admin complements POS by handling top-level management workflows that are typically outside the scope of the daily POS operator interface.

Recommended Next Steps
standardize naming and package usage where there are duplicates/typos (for example sooner vs sonner, rechart vs recharts),
formalize environment variables for API endpoints,
document role-based access model between admin and POS users. POS Frontend
Restaurant-facing Point of Sale (POS) web app built with Next.js. This project focuses on operational workflows such as orders, menu control, recipes, customer records, analytics, and store settings.

Purpose
POS is the application used by day-to-day operators and managers. It is designed to:

provide fast access to operational data (orders, menu items, customer details),
support decision-making with dashboard and reporting screens,
centralize in-app configuration (general settings, billing/license, backup, notifications),
integrate with a shared backend API for authentication and business logic.
Core Feature Areas
The app uses App Router route groups and modules for feature separation:

(auth): authentication (login)
(main): dashboard, order-management
(menu-management): category, menu-management, menu-options
(recipes-management): ingredients, recipes-management, recipes-options
(customer-management): customer-detail workflows
(analytics): financial reports/KPI views
(settings): backup, billing-license, general settings, payment, notifications, restaurant management
additional modules such as branches-management
Tech Stack
Next.js 15 (App Router), React 19, TypeScript
Tailwind CSS 4
MUI, Radix UI, Framer Motion
React Hook Form and Zod
Recharts and Nivo for analytics visualizations
API and Environment
API utilities live mainly under src/lib/util with related config/auth helpers under src/lib.

The code currently contains fallback API URLs, including:

http://localhost:8000/api
http://127.0.0.1:8000/api/auth
Use NEXT_PUBLIC_API_URL per environment to avoid mismatch between local/staging/production.

Project Structure
src/
app/ # Pages, route groups, and layouts
components/ # Shared UI components
lib/
hooks/ # Reusable state and data hooks
util/ # API and domain helper modules
Getting Started
Prerequisites
Node.js 18+
npm 9+
Install
npm install
Run in Development
npm run dev
The dev server runs on http://localhost:3001.

Build and Run Production
npm run build
npm run start
Scripts
npm run dev: start local development server (port 3001)
npm run build: create production build
npm run start: start production server
npm run lint: run lint checks
Connected Repositories
This repository is part of a connected 3-project architecture:

POS (this repo): operations-facing frontend
Pos-Admin: platform/admin frontend
pos-backend: API and shared business logic
Typical flow:

user actions happen in POS,
requests are sent to pos-backend,
backend validates auth/rules and returns data,
Pos-Admin manages global/platform-level configuration and oversight.
Maintenance Notes
Some utility files include typo-style names (for example DsahboradApi), which can be normalized to improve maintainability.
The project mixes mock-style utility patterns and real API-style integrations; defining a clear boundary for production behavior is recommended. https://github.com/Danyal-0276/POS-client.git https://github.com/Danyal-0276/POS-Admin.git https://github.com/Danyal-0276/POS-backend.git
