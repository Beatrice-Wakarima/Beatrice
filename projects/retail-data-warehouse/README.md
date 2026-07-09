# Retail Sales Analytics & Data Warehouse

A Dockerized ELT pipeline that turns messy retail transaction data into a validated, dimensional PostgreSQL warehouse, orchestrated by Apache Airflow and gated by an automated pytest suite.

## Business Problem
Retail transactional CSVs had a 17.6% customer telemetry gap, product description drift, and silent lookup mapping errors — corrupting downstream revenue metrics.

## What It Does
- Extracts raw retail CSVs on an Airflow-scheduled DAG
- Loads to a PostgreSQL staging layer, kept in a separate instance from Airflow's own metadata database
- Transforms into a star schema (7 analytical mart views) via SQL
- Validates every run with a dedicated pytest suite and runtime SQL data-quality gates
- Serves results through a Flask/Chart.js dashboard and a Power BI (`.pbit`) template

## Tech Stack
Python · PostgreSQL · Apache Airflow · Docker · Docker Compose · pytest · Power BI

## Key Metrics
- 7 mart views
- 17.6% telemetry gap resolved (flagged, not dropped)
- Full pytest validation coverage
- Single-command Docker deployment

## Repository Structure
```
retail-data-warehouse/
├── index.html       # Full case study (this project's live page)
├── architecture.md  # Architecture diagram & pipeline breakdown
└── README.md        # This file
```

## Links
- Live case study: `index.html`
- Source code: https://github.com/Beatrice-Wakarima/pet_retail_pipeline

---
Part of the [Beatrice Builds](../../index.html) portfolio.
