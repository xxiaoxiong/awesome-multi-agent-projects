type Localized = {
  en: string;
  zh: string;
};

type CategoryProfile = {
  purpose: Localized;
  useCases: Localized[];
  evaluation: Localized[];
};

type ProjectLike = {
  name: string;
  project_type: string;
  primary_category: string;
  coordination_pattern: string[];
  primary_language?: string | null;
  license?: string | null;
  self_hosted: boolean;
  status: string;
  last_reviewed_at: string;
  github: {
    stars?: number;
    forks?: number;
    open_issues?: number;
    last_push_at?: string;
    archived: boolean;
  };
};

const categories: Record<string, CategoryProfile> = {
  "frameworks-orchestration": {
    purpose: {
      en: "Provides reusable building blocks for defining agent roles, team topology, delegation, messaging, and execution control.",
      zh: "提供可复用的角色定义、团队拓扑、任务委派、消息传递与执行控制能力。"
    },
    useCases: [
      { en: "Build a custom multi-agent application without implementing the orchestration runtime from scratch.", zh: "在不从零实现编排运行时的情况下构建定制多智能体应用。" },
      { en: "Prototype alternative team structures, handoff rules, and review loops.", zh: "快速验证不同的团队结构、交接规则与审查闭环。" },
      { en: "Standardize how agents, tools, memory, and model providers are connected.", zh: "统一智能体、工具、记忆与模型提供商的接入方式。" }
    ],
    evaluation: [
      { en: "Check whether state, retries, cancellation, and long-running work are durable.", zh: "检查状态、重试、取消与长任务是否具备持久化能力。" },
      { en: "Compare its native team patterns with the topology your application actually needs.", zh: "将其原生团队模式与业务真正需要的协作拓扑进行对照。" },
      { en: "Measure observability, testing support, and the cost of replacing framework abstractions.", zh: "评估可观测性、测试能力以及替换框架抽象的成本。" }
    ]
  },
  "communication-coordination": {
    purpose: { en: "Focuses on how independent agents discover one another, exchange work, route messages, and coordinate state.", zh: "聚焦独立智能体之间的发现、任务交换、消息路由与状态协同。" },
    useCases: [
      { en: "Connect agents implemented by different teams, runtimes, or model stacks.", zh: "连接由不同团队、运行时或模型技术栈实现的智能体。" },
      { en: "Introduce explicit routing, discovery, or interoperability into an existing agent platform.", zh: "为现有智能体平台补充明确的路由、发现或互操作能力。" },
      { en: "Separate communication infrastructure from domain-specific agent logic.", zh: "将通信基础设施与领域智能体逻辑解耦。" }
    ],
    evaluation: [
      { en: "Inspect delivery guarantees, identity, authorization, and failure recovery.", zh: "重点检查消息交付保证、身份、授权与故障恢复。" },
      { en: "Verify protocol compatibility and the maturity of available SDKs.", zh: "验证协议兼容性以及可用 SDK 的成熟度。" },
      { en: "Test behavior under partial failure, duplicate messages, and network delay.", zh: "测试局部故障、重复消息与网络延迟下的行为。" }
    ]
  },
  "memory-knowledge": {
    purpose: { en: "Organizes shared memory or knowledge so multiple agents can reuse facts, decisions, and working context.", zh: "组织共享记忆与知识，使多个智能体能够复用事实、决策和工作上下文。" },
    useCases: [
      { en: "Share durable context across specialist agents and repeated runs.", zh: "在专业智能体与多次运行之间共享持久上下文。" },
      { en: "Track decisions, evidence, and intermediate artifacts produced by a team.", zh: "追踪团队产生的决策、证据与中间产物。" },
      { en: "Reduce repeated retrieval and inconsistent context between agents.", zh: "减少重复检索以及智能体之间的上下文不一致。" }
    ],
    evaluation: [
      { en: "Assess provenance, conflict resolution, retention, and deletion controls.", zh: "评估来源追踪、冲突解决、保留与删除控制。" },
      { en: "Measure retrieval quality when multiple agents write concurrently.", zh: "测量多个智能体并发写入后的检索质量。" },
      { en: "Verify tenant isolation and protection of sensitive working memory.", zh: "验证租户隔离与敏感工作记忆保护。" }
    ]
  },
  "infrastructure-developer-tools": {
    purpose: { en: "Supports development, execution, debugging, or operations of multi-agent systems.", zh: "支撑多智能体系统的开发、执行、调试或运维。" },
    useCases: [
      { en: "Give agent teams a repeatable runtime or development environment.", zh: "为智能体团队提供可重复的运行时或开发环境。" },
      { en: "Add operational controls around distributed or long-running agent work.", zh: "为分布式或长时间运行的智能体任务增加运维控制。" },
      { en: "Improve developer feedback while building and testing team behavior.", zh: "改善多智能体行为开发与测试期间的反馈效率。" }
    ],
    evaluation: [
      { en: "Validate isolation, resource quotas, secrets handling, and auditability.", zh: "验证隔离、资源配额、密钥处理与审计能力。" },
      { en: "Check compatibility with your deployment and model-serving environment.", zh: "检查与现有部署环境及模型服务环境的兼容性。" },
      { en: "Estimate operational complexity beyond the local demonstration.", zh: "评估从本地演示走向实际运行后的运维复杂度。" }
    ]
  },
  "evaluation-benchmarking": {
    purpose: { en: "Supplies tasks, environments, and metrics for measuring collaboration, competition, and emergent multi-agent behavior.", zh: "提供任务、环境与指标，用于测量协作、竞争及涌现式多智能体行为。" },
    useCases: [
      { en: "Compare algorithms or agent policies under reproducible conditions.", zh: "在可复现条件下比较算法或智能体策略。" },
      { en: "Stress-test coordination before applying it to a real system.", zh: "在进入真实系统前对协作机制进行压力测试。" },
      { en: "Create baselines for research, regression testing, or model selection.", zh: "为研究、回归测试或模型选择建立基线。" }
    ],
    evaluation: [
      { en: "Confirm that tasks and metrics match the behavior you want to measure.", zh: "确认任务和指标与真正需要测量的行为一致。" },
      { en: "Check reproducibility, maintained baselines, and environment versioning.", zh: "检查可复现性、基线维护情况与环境版本管理。" },
      { en: "Avoid treating benchmark performance as direct evidence of production fitness.", zh: "不要将基准成绩直接视为生产适用性的证据。" }
    ]
  },
  "observability-safety-governance": {
    purpose: { en: "Makes multi-agent execution inspectable and adds controls for quality, safety, policy, or accountability.", zh: "让多智能体执行过程可检查，并增加质量、安全、策略与问责控制。" },
    useCases: [
      { en: "Trace messages, tool calls, costs, latency, and failures across agents.", zh: "跨智能体追踪消息、工具调用、成本、延迟与失败。" },
      { en: "Evaluate team outputs and compare alternative prompts or topologies.", zh: "评估团队输出，并比较不同提示词或协作拓扑。" },
      { en: "Introduce review, policy, or governance gates into agent workflows.", zh: "在智能体工作流中引入审查、策略或治理门禁。" }
    ],
    evaluation: [
      { en: "Verify trace completeness across asynchronous and delegated work.", zh: "验证异步任务与委派任务中的追踪完整性。" },
      { en: "Assess data retention, redaction, access control, and exportability.", zh: "评估数据保留、脱敏、访问控制与可导出性。" },
      { en: "Test whether evaluation signals correlate with real task quality.", zh: "测试评估信号是否真正反映任务质量。" }
    ]
  },
  "coding-software-engineering": {
    purpose: { en: "Coordinates specialist agents across planning, implementation, review, testing, and software delivery.", zh: "协调规划、实现、审查、测试与软件交付等专业智能体。" },
    useCases: [
      { en: "Decompose a feature or repository task across specialist engineering roles.", zh: "将功能或仓库任务拆解给不同工程角色协作完成。" },
      { en: "Run implementation and independent review or repair loops.", zh: "执行实现与独立审查、修复闭环。" },
      { en: "Explore autonomous or semi-autonomous software delivery workflows.", zh: "探索自主或半自主的软件交付工作流。" }
    ],
    evaluation: [
      { en: "Require repository-grounded tests and inspect the produced patch, not only the final report.", zh: "要求基于仓库的测试，并检查实际补丁，而不只看最终报告。" },
      { en: "Review sandboxing, command permissions, secret access, and rollback.", zh: "检查沙箱、命令权限、密钥访问与回滚机制。" },
      { en: "Measure completion rate, regression rate, token cost, and human review time together.", zh: "综合衡量完成率、回归率、Token 成本与人工审查时间。" }
    ]
  },
  "research-science": {
    purpose: { en: "Uses specialist agents to search literature, analyze evidence, form hypotheses, run workflows, or produce research artifacts.", zh: "利用专业智能体完成文献检索、证据分析、假设形成、研究流程与成果生成。" },
    useCases: [
      { en: "Divide a broad research question into parallel specialist investigations.", zh: "将宽泛研究问题拆为多个并行的专业调查。" },
      { en: "Combine literature, data analysis, critique, and synthesis roles.", zh: "组合文献、数据分析、批判与综合等角色。" },
      { en: "Build reproducible research assistants for a defined scientific domain.", zh: "为明确科学领域构建可复现的研究助手。" }
    ],
    evaluation: [
      { en: "Demand source-level citations and distinguish evidence from generated hypotheses.", zh: "要求来源级引用，并区分证据与生成的假设。" },
      { en: "Use domain experts to evaluate factuality and methodological validity.", zh: "由领域专家评估事实性与方法有效性。" },
      { en: "Check data licensing, reproducibility, and the handling of contradictory evidence.", zh: "检查数据许可、可复现性与矛盾证据处理。" }
    ]
  },
  "finance-trading": {
    purpose: { en: "Assigns market, fundamental, risk, and decision roles to agents for financial analysis or trading experiments.", zh: "将市场、基本面、风险与决策角色分配给智能体，用于金融分析或交易实验。" },
    useCases: [
      { en: "Combine multiple analytical viewpoints into a structured investment memo.", zh: "将多种分析视角汇总为结构化投资备忘录。" },
      { en: "Simulate debate, portfolio decisions, or trading policies.", zh: "模拟辩论、组合决策或交易策略。" },
      { en: "Research how agent teams behave with financial tools and data.", zh: "研究智能体团队结合金融工具与数据后的行为。" }
    ],
    evaluation: [
      { en: "Treat outputs as research, not financial advice or evidence of future returns.", zh: "将输出视为研究材料，而不是投资建议或未来收益证明。" },
      { en: "Check data freshness, survivorship bias, transaction costs, and leakage.", zh: "检查数据时效性、幸存者偏差、交易成本与数据泄漏。" },
      { en: "Require reproducible backtests and human risk controls before any live use.", zh: "实盘前必须具备可复现回测与人工风险控制。" }
    ]
  },
  "data-analytics": {
    purpose: { en: "Coordinates agents that query, inspect, interpret, validate, and communicate data.", zh: "协调负责查询、检查、解释、验证与表达数据的智能体。" },
    useCases: [
      { en: "Split data discovery, analysis, validation, and reporting across roles.", zh: "将数据发现、分析、验证与报告分配给不同角色。" },
      { en: "Generate analyses that include an independent checking stage.", zh: "生成包含独立校验阶段的数据分析。" },
      { en: "Support complex questions spanning databases, code, and narrative output.", zh: "处理横跨数据库、代码与文字报告的复杂问题。" }
    ],
    evaluation: [
      { en: "Verify generated queries, calculations, and source-to-claim lineage.", zh: "验证生成的查询、计算以及从来源到结论的链路。" },
      { en: "Test permissions and row-level access with realistic data boundaries.", zh: "在真实数据边界下测试权限与行级访问控制。" },
      { en: "Measure analytical correctness separately from presentation quality.", zh: "将分析正确性与展示质量分开衡量。" }
    ]
  },
  "enterprise-productivity": {
    purpose: { en: "Applies coordinated agents to business processes, documents, operations, and organizational work.", zh: "将协作式智能体应用于业务流程、文档、运营与组织工作。" },
    useCases: [
      { en: "Automate a bounded workflow that crosses several business roles.", zh: "自动化跨越多个业务角色的有边界工作流。" },
      { en: "Draft, review, and route documents with explicit responsibility.", zh: "以明确职责完成文档起草、审查与流转。" },
      { en: "Coordinate repetitive operational tasks while preserving approvals.", zh: "在保留审批的前提下协调重复性运营任务。" }
    ],
    evaluation: [
      { en: "Map every agent action to business permissions and audit requirements.", zh: "将每个智能体动作映射到业务权限与审计要求。" },
      { en: "Verify integration reliability with the actual systems of record.", zh: "验证与真实记录系统集成时的可靠性。" },
      { en: "Keep human approval for consequential or irreversible actions.", zh: "对高影响或不可逆操作保留人工审批。" }
    ]
  },
  "browser-computer-use": {
    purpose: { en: "Coordinates agents that browse, interpret interfaces, operate applications, and verify computer tasks.", zh: "协调负责浏览、理解界面、操作应用与验证计算机任务的智能体。" },
    useCases: [
      { en: "Separate planning, browser execution, extraction, and verification roles.", zh: "分离规划、浏览器执行、信息提取与验证角色。" },
      { en: "Automate research or repetitive interface workflows across websites.", zh: "自动化跨网站调研或重复界面流程。" },
      { en: "Study reliable computer use with multiple cooperating agents.", zh: "研究多个智能体协作完成可靠计算机操作的方法。" }
    ],
    evaluation: [
      { en: "Test against dynamic pages, authentication, rate limits, and UI changes.", zh: "针对动态页面、身份验证、速率限制与 UI 变化进行测试。" },
      { en: "Require confirmation before purchases, messages, deletion, or account changes.", zh: "购买、发消息、删除或账户变更前必须确认。" },
      { en: "Measure task success from external state, not from an agent's self-report.", zh: "根据外部状态而不是智能体自述衡量任务成功。" }
    ]
  },
  "cybersecurity": {
    purpose: { en: "Coordinates security specialists for analysis, defense, authorized testing, incident work, or cyber simulation.", zh: "协调安全专家智能体完成分析、防御、授权测试、事件处理或网络仿真。" },
    useCases: [
      { en: "Aggregate specialist findings during defensive investigation.", zh: "在防御性调查中汇总多个专业角色的发现。" },
      { en: "Run authorized security exercises in controlled environments.", zh: "在受控环境中开展经授权的安全演练。" },
      { en: "Simulate attackers and defenders for training or research.", zh: "为训练或研究模拟攻击者与防御者。" }
    ],
    evaluation: [
      { en: "Use only on systems and environments where testing is explicitly authorized.", zh: "仅用于已明确授权测试的系统与环境。" },
      { en: "Enforce tool allowlists, isolation, logging, and human approval.", zh: "强制执行工具白名单、隔离、日志与人工审批。" },
      { en: "Validate findings independently before remediation or escalation.", zh: "修复或升级处理前应独立验证安全发现。" }
    ]
  },
  "healthcare-life-sciences": {
    purpose: { en: "Combines clinical, biomedical, administrative, or reviewing roles in healthcare-related workflows.", zh: "在医疗相关流程中组合临床、生物医学、行政或审查角色。" },
    useCases: [
      { en: "Research collaborative reasoning across medical specialties.", zh: "研究跨医学专业的协作推理。" },
      { en: "Assist with bounded documentation or administrative workflows.", zh: "辅助有明确边界的文档或行政流程。" },
      { en: "Compare independent analyses before a human expert decision.", zh: "在人工专家决策前比较多个独立分析。" }
    ],
    evaluation: [
      { en: "Do not use research demonstrations as autonomous clinical decision systems.", zh: "不要将研究演示直接作为自主临床决策系统。" },
      { en: "Require qualified review, privacy controls, and jurisdiction-specific validation.", zh: "必须具备专业人员审查、隐私控制与特定司法辖区验证。" },
      { en: "Evaluate safety on representative data, including rare and adverse cases.", zh: "应使用具有代表性的数据评估安全性，包括罕见与不良案例。" }
    ]
  },
  "education-learning": {
    purpose: { en: "Coordinates teaching, tutoring, assessment, content, and learner-support roles.", zh: "协调教学、辅导、评估、内容与学习支持角色。" },
    useCases: [
      { en: "Provide multiple explanatory or feedback perspectives to a learner.", zh: "为学习者提供多种讲解或反馈视角。" },
      { en: "Separate lesson planning, teaching, practice, and assessment.", zh: "分离课程规划、教学、练习与评估环节。" },
      { en: "Research social and collaborative learning with agents.", zh: "研究基于智能体的社会化与协作学习。" }
    ],
    evaluation: [
      { en: "Check pedagogical alignment, learner level, and factual accuracy.", zh: "检查教学目标一致性、学习者水平与事实准确性。" },
      { en: "Protect learner data and avoid opaque high-stakes grading.", zh: "保护学习者数据，避免不透明的高风险评分。" },
      { en: "Measure learning outcomes rather than content volume alone.", zh: "衡量实际学习效果，而不是只统计内容数量。" }
    ]
  },
  "robotics-embodied-ai": {
    purpose: { en: "Coordinates planning, control, learning, or safety across multiple robots or embodied agents.", zh: "协调多个机器人或具身智能体的规划、控制、学习与安全。" },
    useCases: [
      { en: "Study cooperative navigation, task allocation, or formation control.", zh: "研究协同导航、任务分配或编队控制。" },
      { en: "Train and evaluate policies in simulation before hardware trials.", zh: "在硬件试验前通过仿真训练和评估策略。" },
      { en: "Build research environments for distributed embodied intelligence.", zh: "构建分布式具身智能研究环境。" }
    ],
    evaluation: [
      { en: "Separate simulation results from claims about physical-world reliability.", zh: "区分仿真结果与物理世界可靠性结论。" },
      { en: "Inspect safety constraints, real-time behavior, and communication assumptions.", zh: "检查安全约束、实时行为与通信假设。" },
      { en: "Validate on representative hardware and failure conditions before deployment.", zh: "部署前应在代表性硬件与故障条件下验证。" }
    ]
  },
  "simulation-social-games": {
    purpose: { en: "Models interacting agents in social, economic, strategic, negotiation, or game environments.", zh: "在社会、经济、战略、谈判或游戏环境中模拟相互作用的智能体。" },
    useCases: [
      { en: "Explore emergent behavior under different rules and incentives.", zh: "探索不同规则与激励条件下的涌现行为。" },
      { en: "Run reproducible negotiation, strategy, or social experiments.", zh: "开展可复现的谈判、策略或社会实验。" },
      { en: "Generate synthetic interaction data for analysis or training.", zh: "生成用于分析或训练的合成交互数据。" }
    ],
    evaluation: [
      { en: "Check whether agent assumptions are appropriate for the population being modeled.", zh: "检查智能体假设是否适用于被模拟群体。" },
      { en: "Run sensitivity analysis across prompts, models, seeds, and rules.", zh: "针对提示词、模型、随机种子与规则进行敏感性分析。" },
      { en: "Avoid presenting simulated behavior as direct evidence about real people.", zh: "不要把模拟行为直接当作真实人群的证据。" }
    ]
  },
  "marketing-media-content": {
    purpose: { en: "Combines strategy, creation, editing, review, and production agents for media or content workflows.", zh: "组合策略、创作、编辑、审查与制作智能体完成媒体或内容流程。" },
    useCases: [
      { en: "Coordinate campaign planning and multi-format content production.", zh: "协调营销活动规划与多格式内容生产。" },
      { en: "Introduce independent editing, brand, or compliance review.", zh: "引入独立编辑、品牌或合规审查。" },
      { en: "Prototype repeatable creative production pipelines.", zh: "验证可重复的创意生产流水线。" }
    ],
    evaluation: [
      { en: "Review originality, licensing, factuality, and brand consistency.", zh: "检查原创性、许可、事实性与品牌一致性。" },
      { en: "Keep human approval for public or reputation-sensitive output.", zh: "对公开发布或影响声誉的输出保留人工审批。" },
      { en: "Measure audience outcomes and revision effort, not generation volume alone.", zh: "衡量受众效果与修改成本，而不只看生成数量。" }
    ]
  },
  "legal-compliance": {
    purpose: { en: "Coordinates research, extraction, analysis, checking, and reporting roles for legal or compliance work.", zh: "协调法律或合规工作中的研究、抽取、分析、复核与报告角色。" },
    useCases: [
      { en: "Organize evidence and issues for human legal review.", zh: "为人工法律审查组织证据与问题。" },
      { en: "Run structured due diligence or policy comparison workflows.", zh: "执行结构化尽职调查或政策比较流程。" },
      { en: "Compare independent analyses before producing a draft report.", zh: "在形成报告草案前比较多个独立分析。" }
    ],
    evaluation: [
      { en: "Treat output as assistance, not a substitute for qualified legal advice.", zh: "将输出视为辅助材料，而不是专业法律意见的替代品。" },
      { en: "Require citations, jurisdiction awareness, confidentiality, and human review.", zh: "必须具备引用、司法辖区意识、保密与人工审查。" },
      { en: "Validate every consequential conclusion against primary authority.", zh: "针对权威原始来源验证每项重要结论。" }
    ]
  },
  "customer-service-sales": {
    purpose: { en: "Coordinates routing, specialist knowledge, resolution, and escalation agents in customer-facing workflows.", zh: "协调客户流程中的路由、专业知识、问题解决与升级智能体。" },
    useCases: [
      { en: "Route requests to specialized agents while maintaining shared context.", zh: "在保持共享上下文的同时将请求路由给专业智能体。" },
      { en: "Combine retrieval, action, quality review, and escalation.", zh: "组合检索、执行、质量审查与升级处理。" },
      { en: "Prototype service workflows before integrating production channels.", zh: "在接入生产渠道前验证服务工作流。" }
    ],
    evaluation: [
      { en: "Measure resolution quality, escalation accuracy, latency, and customer effort.", zh: "衡量解决质量、升级准确率、延迟与客户操作成本。" },
      { en: "Protect customer data and constrain account-changing actions.", zh: "保护客户数据，并限制会改变账户状态的操作。" },
      { en: "Test handoffs and recovery when an agent lacks information or authority.", zh: "测试智能体缺少信息或权限时的交接与恢复。" }
    ]
  },
  "general-purpose-products": {
    purpose: { en: "Offers an end-user product centered on assembling or operating reusable teams of agents.", zh: "提供以组装或运行可复用智能体团队为核心的终端产品。" },
    useCases: [
      { en: "Experiment with multi-agent workflows through a packaged interface.", zh: "通过产品化界面体验多智能体工作流。" },
      { en: "Configure reusable teams without building a full orchestration layer.", zh: "无需自建完整编排层即可配置可复用团队。" },
      { en: "Evaluate multi-agent interaction patterns for broader personal or business tasks.", zh: "评估多智能体模式在通用个人或业务任务中的表现。" }
    ],
    evaluation: [
      { en: "Inspect data handling, tool permissions, model costs, and export options.", zh: "检查数据处理、工具权限、模型成本与导出能力。" },
      { en: "Test reliability on your own repeatable tasks rather than a showcase demo.", zh: "使用自己的可重复任务测试可靠性，而不只看演示。" },
      { en: "Check how much of the product remains usable when providers or models change.", zh: "检查模型或提供商变化后产品仍有多少能力可用。" }
    ]
  }
};

const coordination: Record<string, Localized> = {
  "role-based": { en: "Specialized agents are assigned distinct responsibilities so work can be divided and reviewed by role.", zh: "通过为专业智能体分配不同职责，实现按角色拆分与复核工作。" },
  hierarchical: { en: "A manager or supervisor delegates work and aggregates results from subordinate agents.", zh: "由管理者或监督智能体委派任务，并汇总下级智能体的结果。" },
  conversational: { en: "Agents coordinate by exchanging conversational messages and updating one another's working context.", zh: "智能体通过对话消息交换并更新彼此工作上下文来协同。" },
  "event-driven": { en: "Events trigger independent handlers or agents, allowing loosely coupled execution.", zh: "由事件触发独立处理器或智能体，实现松耦合执行。" },
  "role-playing": { en: "Agents adopt defined personas or roles to create differentiated viewpoints and behaviors.", zh: "智能体采用明确角色或身份，以形成差异化视角与行为。" },
  "message-driven": { en: "Explicit messages carry tasks, context, or results between cooperating agents.", zh: "通过显式消息在协作智能体之间传递任务、上下文与结果。" },
  "message-passing": { en: "Agents exchange structured messages rather than relying on one shared prompt.", zh: "智能体交换结构化消息，而不是依赖单一共享提示词。" },
  handoffs: { en: "Control and context are transferred from one agent to another when responsibility changes.", zh: "当职责变化时，控制权与上下文从一个智能体交接给另一个智能体。" },
  workflows: { en: "Agent work follows an explicit sequence, graph, or set of state transitions.", zh: "智能体工作遵循明确的步骤、图结构或状态转换。" },
  swarm: { en: "Multiple agents work in a decentralized or dynamically coordinated group.", zh: "多个智能体以去中心化或动态协调方式组成群体执行任务。" },
  marl: { en: "Multiple policies learn or act in a shared environment using multi-agent reinforcement learning.", zh: "多个策略通过多智能体强化学习在共享环境中学习或行动。" },
  simulation: { en: "Agents interact inside a modeled environment so collective behavior can be observed and measured.", zh: "智能体在建模环境中互动，以观察和测量群体行为。" },
  debate: { en: "Agents present competing analyses or critiques before a result is selected or synthesized.", zh: "智能体提出相互竞争的分析或批评，再选择或综合结果。" },
  planning: { en: "Planning agents decompose goals and coordinate the order or allocation of work.", zh: "规划智能体拆解目标，并协调任务顺序或分配。" },
  review: { en: "One or more agents independently inspect another agent's output and request correction.", zh: "一个或多个智能体独立检查其他智能体的输出并提出修正。" },
  competition: { en: "Agents pursue competing objectives or candidate solutions whose outcomes are compared.", zh: "智能体追求相互竞争的目标或候选方案，并比较其结果。" },
  cooperative: { en: "Agents share a goal and coordinate actions or information to improve the joint outcome.", zh: "智能体共享目标，并协调行动或信息以改善共同结果。" },
  "task-solving": { en: "Work is decomposed into agent assignments whose outputs contribute to a shared solution.", zh: "工作被拆为多个智能体任务，其输出共同形成解决方案。" },
  "tool-use": { en: "Specialist agents invoke tools as part of a coordinated execution process.", zh: "专业智能体在协同执行过程中调用工具。" },
  "deep-research": { en: "Research is divided across searching, reading, analysis, verification, and synthesis roles.", zh: "研究过程被拆分为搜索、阅读、分析、验证与综合等角色。" },
  "coding-agents": { en: "Software tasks are distributed among agents responsible for implementation or engineering checks.", zh: "软件任务被分配给负责实现或工程检查的多个智能体。" },
  robotics: { en: "Embodied agents coordinate perception, planning, or action in a physical or simulated environment.", zh: "具身智能体在物理或仿真环境中协调感知、规划与行动。" },
  tracing: { en: "Cross-agent activity is linked into traces so delegation and execution can be inspected.", zh: "将跨智能体活动连接为追踪链路，以检查委派与执行过程。" }
};

const typeNotes: Record<string, { strength: Localized; caution: Localized }> = {
  framework: {
    strength: { en: "Useful when you need reusable orchestration primitives and control over the application built on top.", zh: "适合需要复用编排基础能力、同时保留上层应用控制权的团队。" },
    caution: { en: "A framework reduces implementation work but still requires architecture, evaluation, operations, and domain-specific safeguards.", zh: "框架能够减少实现工作，但仍需要自行完成架构、评估、运维与领域安全控制。" }
  },
  application: {
    strength: { en: "Provides a concrete end-to-end workflow that can be studied, adapted, or evaluated against a specific task.", zh: "提供可直接研究、改造或针对具体任务评估的端到端工作流。" },
    caution: { en: "The included workflow and assumptions may be tightly coupled to its demonstration domain or data.", zh: "其工作流与假设可能和演示领域或数据高度耦合。" }
  },
  product: {
    strength: { en: "Offers a packaged user experience for operating multi-agent capabilities with less initial engineering.", zh: "以产品化体验提供多智能体能力，可减少前期工程投入。" },
    caution: { en: "Review which capabilities are truly open source and what depends on hosted services, accounts, or paid providers.", zh: "需要核查哪些能力真正开源，以及哪些依赖托管服务、账户或付费提供商。" }
  },
  platform: {
    strength: { en: "Can centralize construction, execution, and management of multiple agent workflows.", zh: "可以集中管理多个智能体工作流的构建、执行与运营。" },
    caution: { en: "Platform adoption introduces operational and migration cost; validate extensibility and data portability early.", zh: "采用平台会引入运维与迁移成本，应尽早验证扩展性和数据可迁移性。" }
  },
  infrastructure: {
    strength: { en: "Addresses a cross-cutting runtime or operational concern that can support several agent applications.", zh: "解决可服务多个智能体应用的运行时或运维共性问题。" },
    caution: { en: "Infrastructure value depends on integration quality and operational reliability, not only feature breadth.", zh: "基础设施价值取决于集成质量与运行可靠性，而不只是功能数量。" }
  },
  research: {
    strength: { en: "Exposes an implementation that can make a research method easier to inspect, reproduce, and extend.", zh: "提供可检查、复现和扩展研究方法的实现。" },
    caution: { en: "Research code may prioritize experiments over stable APIs, security hardening, documentation, or long-term maintenance.", zh: "研究代码可能优先服务实验，而非稳定 API、安全加固、文档或长期维护。" }
  },
  benchmark: {
    strength: { en: "Provides a structured environment for repeatable comparison and regression measurement.", zh: "提供适合重复比较与回归测量的结构化环境。" },
    caution: { en: "Benchmark validity is bounded by its tasks, metrics, baselines, and simulation assumptions.", zh: "基准有效性受任务、指标、基线与仿真假设限制。" }
  }
};

function titleFromSlug(value: string): string {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function localized(value: Localized, lang: string): string {
  return lang === "zh" ? value.zh : value.en;
}

export function buildProjectProfile(project: ProjectLike, lang: string) {
  const zh = lang === "zh";
  const category = categories[project.primary_category] ?? categories["general-purpose-products"];
  const type = typeNotes[project.project_type] ?? typeNotes.application;
  const coordinationDetails = project.coordination_pattern.map((pattern) => ({
    name: titleFromSlug(pattern),
    description: localized(coordination[pattern] ?? {
      en: `${titleFromSlug(pattern)} is recorded as a coordination characteristic in this project's reviewed taxonomy.`,
      zh: `${titleFromSlug(pattern)} 是该项目在策展审核中记录的一项协作特征。`
    }, lang)
  }));

  const adoptionFacts = [
    project.self_hosted
      ? (zh ? "项目被记录为支持自托管，可在采用前进一步核查模型、存储与外部服务依赖。" : "Recorded as self-hostable; verify model, storage, and external service dependencies before adoption.")
      : (zh ? "项目未被记录为完整自托管方案，需要核查托管服务或外部平台依赖。" : "Not recorded as fully self-hostable; inspect hosted-service or external-platform dependencies."),
    project.primary_language
      ? (zh ? `主要实现语言为 ${project.primary_language}，应结合团队技术栈评估二次开发和维护成本。` : `The primary implementation language is ${project.primary_language}; assess extension and maintenance cost against your team's stack.`)
      : (zh ? "主要实现语言尚未记录，采用前应从仓库结构确认其核心运行时。" : "The primary implementation language is not recorded; inspect the repository runtime before adoption."),
    project.license
      ? (zh ? `当前记录的许可证为 ${project.license}；正式使用前仍应核对仓库中的完整许可证文本与依赖许可证。` : `The recorded license is ${project.license}; confirm the repository's full license text and dependency licenses before formal use.`)
      : (zh ? "许可证元数据尚未记录完整，正式使用前需要完成许可证核查。" : "License metadata is incomplete and should be verified before formal use.")
  ];

  const statusNote: Record<string, Localized> = {
    active: { en: "The project was active at the latest editorial review, but release cadence and issue health should still be checked.", zh: "最近一次编辑审核时项目处于活跃状态，但仍应检查发布节奏与问题维护情况。" },
    experimental: { en: "The project is classified as experimental; expect changing APIs, incomplete workflows, or limited operational hardening.", zh: "该项目被归类为实验性项目，可能存在 API 变化、流程不完整或工程加固有限等情况。" },
    inactive: { en: "The project is classified as inactive; use it mainly as a reference unless maintenance has resumed.", zh: "该项目被归类为不活跃，除非维护已经恢复，否则更适合作为参考实现。" },
    archived: { en: "The repository is archived and should be treated as historical reference material rather than a maintained dependency.", zh: "仓库已归档，应将其视为历史参考，而不是持续维护的依赖。" }
  };

  return {
    purpose: localized(category.purpose, lang),
    useCases: category.useCases.map((item) => localized(item, lang)),
    evaluation: category.evaluation.map((item) => localized(item, lang)),
    coordinationDetails,
    strengths: [
      localized(type.strength, lang),
      project.coordination_pattern.length > 1
        ? (zh ? `项目明确呈现 ${project.coordination_pattern.length} 类协作特征，适合用来比较不同机制如何组合。` : `The project exposes ${project.coordination_pattern.length} recorded coordination characteristics, making their combination easier to examine.`)
        : (zh ? "协作模式较为聚焦，便于理解其核心多智能体机制。" : "Its focused coordination profile makes the central multi-agent mechanism easier to inspect."),
      project.self_hosted
        ? (zh ? "支持自托管这一属性有利于代码审查、内部实验与数据边界控制。" : "Its self-hosting classification supports code inspection, internal experiments, and tighter data boundaries.")
        : (zh ? "产品化或托管依赖可能降低初始使用门槛。" : "A packaged or hosted dependency may reduce initial setup effort.")
    ],
    cautions: [
      localized(type.caution, lang),
      localized(statusNote[project.status] ?? statusNote.experimental, lang),
      zh ? "多智能体效果高度依赖模型、提示词、工具、数据与评估方法，需要用真实任务重新验证。" : "Multi-agent results depend heavily on models, prompts, tools, data, and evaluation design; revalidate with representative tasks."
    ],
    adoptionFacts,
    researchBasis: [
      zh ? "官方 GitHub 仓库及其公开元数据" : "Official GitHub repository and public metadata",
      zh ? "项目官方主页或文档（如已提供）" : "Official project website or documentation when available",
      zh ? "仓库中可验证的多智能体机制与项目定位" : "Repository-verifiable multi-agent mechanism and project scope",
      zh ? "本站统一分类、状态与采用维度" : "This directory's normalized taxonomy, status, and adoption dimensions"
    ],
    reviewedAt: project.last_reviewed_at
  };
}
