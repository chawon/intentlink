# IntentLink: The Active Web for AI Agents
> "Static Hyperlinks connect pages; IntentLink connects purposes via link.json."

This project introduces a new paradigm for autonomous service discovery and integration in the age of AI agents. It moves beyond manual API plumbing toward a self-evolving web ecosystem.

## 📦 Installation (Link Extractor Skill)
Give your Gemini CLI the power to extract intents from any web service.

1. **Download:** Get the latest `.skill` file from [GitHub Releases](https://github.com/chawon/intentlink/releases/latest).
2. **Install:** Run the following command in your terminal:
   ```bash
   gemini skills install ./path/to/link-extractor-v1.0.0.skill
   ```
3. **Activate:** Reload your skills:
   ```bash
   /skills reload
   ```

## 🚀 Key Concepts
1. **IntentLink Protocol:** A lightweight, intent-based framework centered around `link.json` that describes a service's *Purpose* and *Capabilities*.
2. **IntentLink Extractor (Skill):** A specialized AI skill that analyzes legacy web documentation and automatically generates `link.json` "Digital Twins."
3. **IntentLink Broker:** An intelligent intermediary that reasons about service goals to propose non-obvious, high-value connections.

## 🏆 Proven Success (IntentLink v0.2.0 Milestones)
- **Autonomous Extraction:** Successfully converted the OpenWeatherMap API using the `IntentLink Extractor`.
- **Semantic Matching:** Connected 'Bookstore' to 'GitHub' using the `IntentLink Broker`.
- **Cross-AI Interoperability:** Verified across Gemini & Codex with the `IntentLink` specifications.

## 🗺️ Roadmap: The Journey to v1.0
- **[NEXT] v0.8: IntentLink Connector (Auto-Code Generation)** - Generating integration code based on `Connection Proposals`.
- **[PLANNED] v0.9: IntentLink Observer & Multi-Modal** - Support for `ui-web`, `deep-link`, and real-time health monitoring.

## 📚 Standards & Best Practices
- **[INTENTLINK_PROTOCOL.md](./INTENTLINK_PROTOCOL.md):** The core definition.
- **[SCHEMA.json](./SCHEMA.json):** The formal JSON Schema.
- **[BEST_PRACTICES.md](./BEST_PRACTICES.md):** Guidelines for discovery and security.
- **[AI_BROKER_SPEC.md](./AI_BROKER_SPEC.md):** The behavioral contract for AI brokers.

---
*Created with IntentLink - Connecting Intentions, Not Just URLs.*
