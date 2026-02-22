---
name: link-extractor
description: Analyzes any web service (HTML, README, API Docs) and automatically generates a Link Protocol manifest (link.json). Use when a user provides a URL or service description and wants to integrate it into the Link Protocol ecosystem.
---

# Skill: Link Extractor (v1.0.0)

## Overview
This skill transforms unstructured web service data into a structured `Link Protocol` manifest. It focuses on identifying the service's **Purpose**, **Capabilities**, and **Dependencies**.

## Workflow
1. **Analyze:** Read the provided URL or text.
2. **Extract Identity:** Define the service's core "Purpose" (why it exists).
3. **Map Capabilities:** Identify key features as "Intents".
4. **Infer Dependencies:** Identify both explicit (API keys) and implicit (related services) needs.
5. **Output:** Generate a `link.json` file in the `services/` directory.

## Guidelines
- **Intent-based:** Use action-oriented names for intents (e.g., `process_payment`).
- **Standardized:** Always adhere to the [SCHEMA.json](../../SCHEMA.json) format.
- **AI-Friendly:** Write descriptions that are easy for other AI brokers to reason about.

## Example
User: "Add OpenWeather to our system."
Skill: [Fetches weather docs] -> [Analyzes intents] -> [Writes services/openweather.json]
