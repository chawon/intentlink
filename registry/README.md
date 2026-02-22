# IntentLink Registry System
> "The Yellow Pages for the Autonomous Web"

This directory contains the core logic for discovering, indexing, and searching IntentLink services.

## 🏗️ Architecture

The Registry operates in a continuous cycle:
1. **Harvest (Discovery):** Crawls web sources (e.g., GitHub Awesome Lists) to find service candidates.
2. **Extract (Analysis):** Uses the `link-extractor` skill to generate `link.json` manifests.
3. **Index (Storage):** Stores validated manifests in the local file system (`index/`).
4. **Broker (Search):** Provides a high-speed search interface for the Broker to find services.

## 📂 Directory Structure

- **`index/`**: The local database. Contains one JSON file per service (e.g., `openweather-api.json`).
- **`seeds/`**: Initial lists of URLs to crawl (e.g., `github-awesome.json`).
- **`awesome-harvester.js`**: The crawler script that parses Markdown lists.
- **`link-registry.js`**: The core library for registering and searching manifests.

## 🔍 Search Logic (v0.7 Optimized)

The Registry uses a **Two-Stage Search Engine** (implemented in `broker/optimized-broker.js`):

1.  **Vector Search (Stage 1):**
    - Fast keyword matching with weightings (Name > Purpose > Intents).
    - Filters down thousands of services to a relevant candidate list.

2.  **Ranking System (Stage 2):**
    - **Match Score (70%):** How well `needs` match `offers`.
    - **Confidence Score (30%):** The quality/reliability of the manifest (from Validator).

## 🚀 Usage

You can interact with the registry via the CLI:

```bash
# 1. Harvest new services from a list
intentlink harvest https://github.com/public-apis/public-apis

# 2. Search the local registry
intentlink match "shipping"
```
