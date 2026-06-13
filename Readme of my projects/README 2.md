# Multi-Marketplace Product Scraper

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Browser%20Automation-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/python/)

Scrape product listings from **Amazon**, **Daraz.pk**, and **eBay** across configurable categories, then export everything to a structured **Excel workbook** — no API keys required.

Built with **Python**, **Playwright**, and **pandas**.

---

## Features

https://github.com/Danyal-0276/Ecommerce-website-scappers.git

- **Three marketplaces** — Amazon, Daraz (Pakistan), and eBay in one run
- **Five default categories** — Phones, Laptops, Clothing, Shoes, Books (fully customizable)
- **Browser-based scraping** — Playwright handles dynamic pages; no official APIs needed
- **Editable categories** — change search terms in `categories.json` without touching code
- **Excel export** — multi-sheet workbook (`All`, `Amazon`, `Daraz`, `eBay`)
- **CLI runner** — filter by site, category, or product limit
- **Resilient scraping** — retries, polite delays, partial-failure logging

---

## Table of Contents

- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Output](#output)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Legal Notice](#legal-notice)
- [Roadmap](#roadmap)

---

## How It Works

| Marketplace  | Method     | Data source                                      |
| ------------ | ---------- | ------------------------------------------------ |
| **eBay**     | Playwright | Search result listings                           |
| **Amazon**   | Playwright | Search result listings (fallback: product pages) |
| **Daraz.pk** | Playwright | Search results + product detail pages            |

Each product is normalized to the same schema before export:

| Column         | Description                        |
| -------------- | ---------------------------------- |
| `marketplace`  | `amazon`, `daraz`, or `ebay`       |
| `category`     | Category id from `categories.json` |
| `title`        | Product name                       |
| `price`        | Numeric price                      |
| `currency`     | e.g. `USD`, `PKR`                  |
| `rating`       | Star rating (when available)       |
| `review_count` | Number of reviews                  |
| `url`          | Product link                       |
| `image_url`    | Main image URL                     |
| `seller`       | Seller name (when available)       |
| `scraped_at`   | UTC timestamp                      |

---

## Prerequisites

- **Windows 10/11** (scripts optimized for PowerShell)
- **Python 3.10+** — [python.org/downloads](https://www.python.org/downloads/)
- **Internet connection** (scrapers fetch live marketplace pages)

> On Windows, the setup script uses the `py -3` launcher if `python` is not on your PATH.

---

## Installation

### 1. Open the project folder

```powershell
cd "C:\Users\donib\Documents\Ecommerce webstie"
```

### 2. Create the virtual environment

Run once:

```powershell
.\setup_venv.ps1
```

Or double-click **`setup_venv.bat`**.

This will:

1. Create `.venv/` in the project folder
2. Install dependencies from `requirements.txt`
3. Download Playwright Chromium

### 3. Verify installation

```powershell
.\.venv\Scripts\python.exe run_scrapers.py --list-categories
```

You should see your enabled categories and the default products-per-category limit.

---

## Configuration

### Categories (`categories.json`)

Edit this file to control **what** gets scraped:

```json
{
  "products_per_category": 150,
  "categories": [
    {
      "id": "phones",
      "enabled": true,
      "search_query": "smartphone mobile phone"
    }
  ]
}
```

| Field                   | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `id`                    | Unique category key (used in CLI `--category`) |
| `enabled`               | `false` skips the category without deleting it |
| `search_query`          | Terms sent to each marketplace search          |
| `products_per_category` | Default cap per category per site              |

### Environment (optional)

```powershell
copy .env.example .env
```

| Variable                | Default                  | Description                 |
| ----------------------- | ------------------------ | --------------------------- |
| `EBAY_BASE_URL`         | `https://www.ebay.com`   | eBay regional site          |
| `AMAZON_BASE_URL`       | `https://www.amazon.com` | Amazon regional site        |
| `DARAZ_BASE_URL`        | `https://www.daraz.pk`   | Daraz marketplace           |
| `REQUEST_DELAY_MS`      | `1500`                   | Delay between requests (ms) |
| `PRODUCTS_PER_CATEGORY` | `150`                    | Fallback if not set in JSON |

### Runner defaults (`run_scrapers.py`)

```python
DEFAULT_SITE = "all"       # all | amazon | daraz | ebay
DEFAULT_CATEGORY = None    # e.g. "phones" or None for all
DEFAULT_LIMIT = None       # None = use categories.json
```

---

## Usage

Always use the project virtualenv Python:

```powershell
.\.venv\Scripts\python.exe run_scrapers.py [options]
```

### Common commands

| Command                                           | Description                          |
| ------------------------------------------------- | ------------------------------------ |
| `run_scrapers.py --list-categories`               | Show loaded categories               |
| `run_scrapers.py --site all --limit 10`           | All sites, 10 products per category  |
| `run_scrapers.py --site ebay`                     | eBay only                            |
| `run_scrapers.py --site amazon --category phones` | Amazon phones only                   |
| `run_scrapers.py --site daraz --limit 50`         | Daraz, 50 per category               |
| `run_scrapers.py --headless false`                | Show browser (helps with bot blocks) |

### Recommended workflow

```powershell
# 1. Small test run
.\.venv\Scripts\python.exe run_scrapers.py --site all --limit 10

# 2. Single marketplace
.\.venv\Scripts\python.exe run_scrapers.py --site daraz --limit 50

# 3. Full production run (slow — may take hours)
.\.venv\Scripts\python.exe run_scrapers.py --site all
```

### CLI reference

| Flag                | Values                           | Description                    |
| ------------------- | -------------------------------- | ------------------------------ |
| `--site`            | `all`, `amazon`, `daraz`, `ebay` | Marketplaces to scrape         |
| `--category`        | e.g. `phones`                    | Single category id             |
| `--limit`           | integer                          | Override products per category |
| `--headless`        | `true` / `false`                 | Headless browser mode          |
| `--output`          | file path                        | Custom Excel output path       |
| `--list-categories` | —                                | Print categories and exit      |

---

## Output

Files are written to the **`output/`** directory:

```
output/
├── products_20260519_2251.xlsx   # Timestamped Excel export
├── scraper.log                   # Full run log
└── errors.log                    # Per-site failures (append)
```

### Excel workbook sheets

| Sheet      | Contents              |
| ---------- | --------------------- |
| **All**    | Every scraped product |
| **Amazon** | Amazon rows only      |
| **Daraz**  | Daraz rows only       |
| **eBay**   | eBay rows only        |

---

## Project Structure

```
Ecommerce webstie/
├── .venv/                      # Virtual environment (gitignored)
├── categories.json             # Edit categories here
├── categories.py               # JSON loader and validation
├── config.py                   # Env and paths
├── models.py                   # Product data model
├── run_scrapers.py             # Main entry point
├── setup_venv.ps1              # One-time setup (PowerShell)
├── setup_venv.bat              # One-time setup (double-click)
├── requirements.txt
├── .env.example
├── export/
│   └── excel_writer.py         # pandas to Excel
├── marketplace_scrapers/
│   ├── amazon_scraper.py
│   ├── daraz_scraper.py
│   ├── ebay_scraper.py
│   └── base.py                 # Shared helpers
└── output/                     # Generated files (gitignored)
```

---

## Troubleshooting

**No products scraped / empty Excel**

- Run with a visible browser: `--headless false`
- Lower the limit: `--limit 5`
- Check `output/errors.log` and `output/scraper.log`

**Amazon returns 0 items**

- Amazon often blocks headless bots — use `--headless false`
- Try a different region via `AMAZON_BASE_URL` in `.env`

**eBay returns 0 items**

- Try `--headless false`
- Check if eBay shows a captcha or consent screen

**`python` not found during setup**

- Install Python 3.10+ from [python.org](https://www.python.org/downloads/)
- The setup script falls back to `py -3` on Windows

**Accidental `-3` folder**

- Delete it — your real environment is `.venv` (fixed in current `setup_venv.ps1`)

---

## Legal Notice

> **Important:** Automated scraping may violate the Terms of Service of Amazon, eBay, and Daraz. This project is intended for **personal and educational use only**.
>
> - Do not use scraped data for commercial redistribution
> - Respect rate limits
> - You are responsible for compliance with applicable laws and site policies

---

## Roadmap

- [ ] Resume / checkpoint support for long runs
- [ ] Proxy configuration
- [ ] Additional marketplaces
- [ ] CSV export option

---

## Tech Stack

| Tool                                                        | Role               |
| ----------------------------------------------------------- | ------------------ |
| [Playwright](https://playwright.dev/python/)                | Browser automation |
| [pandas](https://pandas.pydata.org/)                        | Data framing       |
| [openpyxl](https://openpyxl.readthedocs.io/)                | Excel writing      |
| [tenacity](https://github.com/jd/tenacity)                  | Retry logic        |
| [python-dotenv](https://github.com/theskumar/python-dotenv) | Environment config |

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test with `--limit 5` before submitting
4. Open a pull request

If you fix selectors after a marketplace layout change, note which site and page you tested.

---

<p align="center">
  <sub>Made with Python and Playwright · Export to Excel in one command</sub>
</p>
