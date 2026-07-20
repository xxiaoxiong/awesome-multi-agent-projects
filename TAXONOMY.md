# Taxonomy

Every project has one stable primary category and up to four tags. A complete application belongs to its application domain even when it is built with a listed framework. Examples illustrate boundaries; they are not a second copy of the dataset.

## Foundations

| ID | Category | Includes | Excludes / boundary | Example |
|---|---|---|---|---|
| `frameworks-orchestration` | Frameworks & Orchestration | Agent roles, team topology, handoffs, supervisors, task graphs, concurrent execution | A complete vertical application belongs to its application domain | CrewAI |
| `communication-coordination` | Communication & Coordination | Agent protocols, messaging, routing, discovery, negotiation, task exchange | Generic queues or RPC with no agent-specific layer | A2A |
| `memory-knowledge` | Memory & Knowledge | Shared memory and knowledge explicitly designed for agent teams | Generic vector databases and single-agent memory | CAMEL memory abstractions |
| `infrastructure-developer-tools` | Infrastructure & Developer Tools | Runtimes, development workbenches, visual builders, agent-team operations | Generic cloud, model serving, or chat UI | Semantic Workbench |
| `evaluation-benchmarking` | Evaluation & Benchmarking | Multi-agent benchmarks, environments, challenge suites, reproducible evaluation | Generic model benchmarks with no agent interaction | BenchMARL |
| `observability-safety-governance` | Observability, Safety & Governance | Multi-agent traces, evaluation, policy, safety, inspection, governance | Generic logging with no agent-aware structure | AgentOps |

## Applications

| ID | Category | Includes | Excludes / boundary | Example |
|---|---|---|---|---|
| `coding-software-engineering` | Coding & Software Engineering | Teams that plan, code, review, test, or maintain software | A single coding agent using several tools | MetaGPT |
| `research-science` | Research & Science | Literature, hypotheses, experiments, scientific reasoning and reports | Generic web search or one-agent deep research | Robin |
| `finance-trading` | Finance & Trading | Market analysis, debate, risk, portfolio, trading simulation | A framework with one finance example | TradingAgents |
| `data-analytics` | Data & Analytics | Coordinated schema analysis, querying, validation, visualization and reporting | Ordinary text-to-SQL or BI dashboards | DataBuff |
| `enterprise-productivity` | Enterprise & Productivity | Business operations, documents, presentations and organizational automation | Generic workflow builders without agent teams | MultiAgentPPT |
| `browser-computer-use` | Browser & Computer Use | Teams coordinating browsing, navigation, interface actions and synthesis | A single browser agent | OWL |
| `cybersecurity` | Cybersecurity | Defensive analysis, penetration testing, incident response, cyber simulation | Ordinary scanners with an AI summary | Shannon |
| `healthcare-life-sciences` | Healthcare & Life Sciences | Clinical, biomedical and healthcare-administration agent teams | A medical chatbot or generic RAG | Prior Authorization Accelerator |
| `education-learning` | Education & Learning | Teaching, assessment, learner support and instructional content teams | Generic tutoring chatbot | Instructional Agents |
| `robotics-embodied-ai` | Robotics & Embodied AI | Multi-robot coordination, planning, control and embodied teams | Single-robot control without coordination | EGO-Planner-Swarm |
| `simulation-social-games` | Simulation, Social Systems & Games | Social, economic, transport, negotiation, strategy and game simulations | One-agent game bots | Concordia |
| `marketing-media-content` | Marketing, Media & Content | Campaign, audience, media and content-production teams | A single text generator | OpenOcta |
| `legal-compliance` | Legal & Compliance | Legal research, evidence, due diligence, risk and compliance teams | Generic legal document search | Due Diligence Agents |
| `customer-service-sales` | Customer Service & Sales | Request routing, specialist resolution, sales assistance and service operations | One general support bot | Bedrock customer-service sample |
| `general-purpose-products` | General-Purpose Agent Products | Products centered on reusable teams across domains | Framework libraries without a product experience | Eliza |

## Cross-domain decisions

Choose the category that reflects the project's most mature and common use. Use tags for secondary traits such as `swarm`, `self-hosted`, `marl`, or `research`. A project is never duplicated to make categories look fuller. If no category fits, discuss a taxonomy change before changing stable IDs.
