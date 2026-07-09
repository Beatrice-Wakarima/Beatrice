# Corporate Finance & Operations ELT Pipeline

A multi-domain ELT pipeline turning siloed finance and operations data into one reliable executive reporting source — built on PostgreSQL, Python, and Apache Airflow.

## Business Problem
Financial, budgeting, and operational data was siloed across domains, causing dashboard drift in executive reporting.

## What It Does
- Consolidates 4 Excel sources into a PostgreSQL warehouse
- Runs a 5-layer, 36-block SQL transformation into a conformed star schema
- Maps each transformation layer 1-to-1 to 22 presentation views via a Python view registry
- Orchestrates idempotent, restart-safe loads with Apache Airflow
- Feeds a 6-page Power BI executive dashboard

## Tech Stack
Python · PostgreSQL · Apache Airflow · Power BI · DAX

## Key Metrics
- 4 source systems consolidated
- 36 SQL transformation blocks across 5 modeling layers
- 6-page Power BI dashboard
- Zero duplicate rows on restart

## Repository Structure
```
corporate-finance-elt/
├── index.html   # Full case study (this project's live page)
└── README.md    # This file
```

## Links
- Live case study: `index.html`
- Source code: https://github.com/Beatrice-Wakarima/Spaero-analytics

---
Part of the [Beatrice Builds](../../index.html) portfolio.
