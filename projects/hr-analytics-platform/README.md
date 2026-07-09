# HR & People Analytics Warehouse

A governed HR data warehouse that replaced four disconnected spreadsheet systems with one trusted reporting layer — built on Python, dbt, and BigQuery.

## Business Problem
HR, payroll, and facilities data existed across four disconnected local systems in mismatched CSV/JSON/Excel formats, causing silent data drops and conflicting employee metrics.

## What It Does
- Power Automate Desktop lands raw local files into BigQuery on a schedule via a Python loader
- dbt transforms data through a Staging → Intermediate → Marts layered architecture
- Resolves fuzzy-matched office names and unifies mismatched JSON structures into a single employee grain
- Runs 38 dbt tests plus DuckDB validation gates before data reaches the dashboard
- Serves a 12-model star schema to a Power BI reporting layer

## Tech Stack
Python · Power Automate Desktop · BigQuery · dbt · DuckDB · Power BI · Docker

## Key Metrics
- 500 employee records
- 4 source systems unified
- 12 dbt models
- 38 passing tests

## Repository Structure
```
hr-analytics-platform/
├── index.html   # Full case study (this project's live page)
└── README.md    # This file
```

## Links
- Live case study: `index.html`
- Source code: https://github.com/beatrice-wakarima/zeni_hr_analytics

---
Part of the [Beatrice Builds](../../index.html) portfolio.
