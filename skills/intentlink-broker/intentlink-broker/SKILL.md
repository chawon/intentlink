---
name: intentlink-broker
description: The intelligent intermediary for the IntentLink ecosystem. Finds services matching a user's intent and generates connection proposals between them based on the IntentLink Protocol.
---

# Skill: IntentLink Broker (v1.0.0)

## Overview
This skill acts as the "Brain" of the IntentLink ecosystem. It reasons about service manifests (`link.json`) to discover, match, and connect services based on **Intent** and **Purpose**, not just keywords.

## Capabilities

### 1. Match Intent
Finds services that best match a vague user goal.
- **Input:** "I need to ship a package" or "Find a weather service"
- **Process:** Performs vector/semantic search on the Registry.
- **Output:** A ranked list of services with `Match Score` and `Confidence Score`.

### 2. Propose Connection
Generates a technical connection plan between two services.
- **Input:** `source_service_id`, `target_service_id`
- **Process:** Analyzes `needs` vs `offers`, identifies `side_effect`, and assesses `risks`.
- **Output:** A structured `Connection Proposal` JSON (adhering to `AI_BROKER_SPEC.md`).

## Usage Guidelines
- **Always check Trust & Safety:** When proposing a connection, explicitly list any `state-change` risks.
- **Prioritize Quality:** Use `confidence_score` to favor well-documented services over vague ones.
- **Explain "Why":** Always provide a `logic.reason` for why this connection makes sense.

## Example
User: "Connect my Bookstore to a shipping service."
Skill:
1. `match_intent("shipping")` -> Finds `flash-ship`.
2. `propose_connection("global-books", "flash-ship")` -> Generates proposal with API steps and auth requirements.
