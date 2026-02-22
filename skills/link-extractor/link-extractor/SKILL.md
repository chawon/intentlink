---
name: link-extractor
description: Analyzes any web service (HTML, README, API Docs) and automatically generates a IntentLink manifest (link.json). Use when a user provides a URL or service description and wants to integrate it into the IntentLink ecosystem.
---

# Skill: Link Extractor (v1.0.1)

## Overview
This skill transforms unstructured web service data into a structured `IntentLink` manifest (`link.json`). It focuses on identifying the service's **Purpose**, **Offers (Capabilities)**, and **Needs (Dependencies)**.

## Workflow
1. **Analyze:** Read the provided URL or text.
2. **Extract Identity:** Define the service's core "Purpose" (why it exists).
3. **Map Offers:** Identify key features as "Intents".
4. **Infer Needs:** Identify both explicit (API keys) and implicit (related services) needs.
5. **Output:** Generate a `link.json` file in the `services/` directory.

## Guidelines
- **Intent-based:** Use action-oriented names for intents (e.g., `process_payment`).
- **AI-Friendly:** Write descriptions that are easy for other AI brokers to reason about.

## Output Schema (Strict Requirement)
Your output JSON **MUST** strictly adhere to the following structure (IntentLink Protocol v0.2.0):

```json
{
  "id": "service-id-kebab-case",
  "protocol_version": "0.2.0",
  "identity": {
    "name": "Service Name",
    "purpose": "A clear description of the service's primary goal."
  },
  "offers": [
    {
      "intent": "action_verb_noun",
      "description": "What this endpoint does.",
      "endpoint": "/api/path",
      "method": "GET | POST",
      "side_effect": "read-only | state-change",
      "auth_type": "none | api_key | bearer | oauth2",
      "interaction_type": "api | ui-web",
      "confidence_score": 0.0 to 1.0
    }
  ],
  "needs": [
    {
      "intent": "required_capability",
      "criticality": "required | optional"
    }
  ]
}
```

## Example
User: "Add OpenWeather to our system."
Skill: [Fetches weather docs] -> [Analyzes intents] -> [Writes services/openweather.json]
