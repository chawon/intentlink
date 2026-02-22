# Contributing to IntentLink

We welcome contributions to the **IntentLink Protocol**! Whether you are a developer, an AI researcher, or a service provider, your input is valuable.

## 📂 Project Structure
- `/services/`: Add your service manifest (`link.json`) here.
- `/skills/`: AI Skills (e.g., `link-extractor`) to parse and generate manifests.
- `/broker/`: The core logic for finding and proposing connections.
- `/runner/`: The execution engine to test connections.
- `/registry/`: Tools for mass discovery and validation.

## 🚀 How to Run Tests
1. **Link Broker:** `node broker/optimized-broker.js`
2. **Link Runner:** `echo "Y" | node runner/link-runner.js examples/book-ship-proposal.json`
3. **Link Connector:** `node connector/link-connector.js examples/book-ship-proposal.json`
4. **Link Validator:** `node validator/link-validator.js services/bookstore.json`

## 🤝 How to Contribute
1. **Fork** this repository.
2. **Create** a new branch (`git checkout -b feature/AmazingFeature`).
3. **Add** your changes (e.g., a new service manifest or an improvement to the Broker).
4. **Run** the validator (`node validator/link-validator.js <your-file>`) to ensure quality.
5. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
6. **Push** to the branch (`git push origin feature/AmazingFeature`).
7. **Open** a Pull Request.

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.
