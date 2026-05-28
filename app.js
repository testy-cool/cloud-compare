const PROVIDERS = [
  { id: 'aws', name: 'AWS', color: '#FF9900' },
  { id: 'azure', name: 'Azure', color: '#0078D4' },
  { id: 'gcp', name: 'GCP', color: '#4285F4' },
  { id: 'cloudflare', name: 'Cloudflare', color: '#F6821F' }
];

const DATA = [
  {
    category: 'Compute',
    intro: 'The engines that run your code. Traditional clouds give you VMs you manage yourself. Serverless and containers let you focus on code. Cloudflare runs compute at the edge in 300+ cities. In 2025-2026 they added containers and sandboxes for workloads beyond V8 isolates.',
    services: [
      { name: 'Virtual Machines', sub: 'A computer in someone else\'s data center, rented by the hour', hint: 'Per hour. Free tier: micro instances', desc: 'On-demand virtual servers where you pick CPU, RAM, disk, and OS. Full root access and control. You handle patching, scaling, and availability. Good for legacy apps, custom stacks, workloads needing specific OS configurations.', aws: ['Amazon EC2'], azure: ['Virtual Machines'], gcp: ['Compute Engine'], cloudflare: [] },
      { name: 'GPU / Accelerated Compute', sub: 'VMs with GPUs bolted on, for AI training and number-crunching', hint: '$1-30+/hr depending on GPU', desc: 'Virtual machines with attached GPUs (NVIDIA A100, H100, L4) for parallel processing - AI model training, inference, video rendering, scientific simulation. The hottest and most supply-constrained part of the cloud market.', aws: ['EC2 P5/P4/G6 instances'], azure: ['ND/NC/NV series VMs'], gcp: ['A3/A2/G2 VMs'], cloudflare: [] },
      { name: 'Spot / Preemptible Instances', sub: 'Cheap VMs that can be yanked away with 2 minutes notice', hint: 'Up to 90% off. No guarantees', desc: 'Use spare cloud capacity at massive discounts. The catch: the provider can reclaim your instance on short notice. Excellent for batch processing, CI/CD, ML training with checkpointing. Not for anything that can\'t handle interruption.', aws: ['EC2 Spot Instances'], azure: ['Spot VMs'], gcp: ['Spot VMs'], cloudflare: [] },
      { name: 'Serverless Functions', sub: 'Your code runs when called. No server to babysit.', hint: 'Per invocation. CF Workers: 100K free/day', desc: 'Write a function, upload it, the provider runs it when triggered. Scaling is automatic, billing is per-millisecond. Cloudflare Workers run on V8 isolates at the edge - near-zero cold starts, code runs close to users worldwide.', aws: ['AWS Lambda'], azure: ['Azure Functions'], gcp: ['Cloud Functions'], cloudflare: ['Workers'] },
      { name: 'Stateful Serverless / Workflows', sub: 'Serverless but with memory - it remembers what happened last time', hint: 'Per step/request', desc: 'Regular serverless is stateless. Stateful serverless maintains state or orchestrates multi-step workflows. CF Durable Objects: single-threaded JS classes with persistent storage for real-time collab, chat, games. CF Workflows: durable multi-step execution with automatic retries.', aws: ['Step Functions'], azure: ['Durable Functions'], gcp: ['Workflows'], cloudflare: ['Durable Objects', 'Workflows'] },
      { name: 'Container Orchestration', sub: 'Kubernetes-as-a-service. You still manage the worker nodes.', hint: 'Control plane often free. Nodes cost.', desc: 'Managed Kubernetes for deploying, scaling, and managing containerized apps across clusters. AWS also offers ECS, their simpler alternative to Kubernetes.', aws: ['ECS', 'EKS'], azure: ['AKS'], gcp: ['GKE'], cloudflare: [] },
      { name: 'Serverless Containers', sub: 'Docker, but you don\'t touch any infrastructure', hint: 'Per vCPU-second. Free tiers available', desc: 'Provide a container image, the platform handles provisioning and scaling. Cloudflare added Containers in 2025-2026 for workloads needing full Linux beyond V8 isolates - Python libs, headless browsers, native binaries.', aws: ['AWS Fargate'], azure: ['Container Apps'], gcp: ['Cloud Run'], cloudflare: ['Containers'] },
      { name: 'Container Registry', sub: 'Private Docker Hub for your images', hint: 'Per GB stored', desc: 'Private Docker image repository. Push images here, pull them when deploying. GCP Artifact Registry also handles npm, Maven, Python packages beyond containers.', aws: ['ECR'], azure: ['Container Registry'], gcp: ['Artifact Registry'], cloudflare: [] },
      { name: 'App Platform / PaaS', sub: 'Push code, get a website. That\'s it.', hint: 'Free tier for basic apps', desc: 'Simplest way to deploy a web app. Push code or connect Git, platform builds, deploys, and serves with TLS and auto-scaling. CF Pages is focused on static sites and JAMstack with Workers for server-side logic.', aws: ['App Runner', 'Elastic Beanstalk'], azure: ['App Service'], gcp: ['App Engine'], cloudflare: ['Pages'] },
      { name: 'Edge Compute', sub: 'Code that runs in 300 cities, not one data center', hint: 'Per request', desc: 'Run code at edge locations close to users. Cloudflare pioneered this - their Workers platform is edge-native by default. AWS Lambda@Edge runs at CloudFront locations; CloudFront Functions is lighter-weight.', aws: ['Lambda@Edge', 'CloudFront Functions'], azure: ['Azure Edge Zones'], gcp: ['Distributed Cloud Edge'], cloudflare: ['Workers'] },
      { name: 'Multi-Tenant Compute', sub: 'Let your customers run code on your platform', hint: 'CF Workers for Platforms pricing', desc: 'Build a SaaS product where users deploy custom logic (integrations, scripts, plugins). Provides sandboxed execution per tenant. Used by Shopify to let merchants run custom code at the edge.', aws: [], azure: [], gcp: [], cloudflare: ['Workers for Platforms'] },
      { name: 'Sandboxes', sub: 'On-demand Linux boxes for AI agents to play in', hint: 'Per session', desc: 'Persistent isolated environments with shell, filesystem, and background processes. Spin up in milliseconds for AI agent code execution, browser automation, and interactive dev environments.', aws: [], azure: [], gcp: [], cloudflare: ['Sandboxes'] },
      { name: 'Dynamic Workers', sub: 'V8 isolates spun up on demand, 100x faster than containers', hint: 'Per execution', desc: 'On-demand isolated V8 sandboxes created at runtime. Unlike regular Workers (always deployed), Dynamic Workers are created per-request for AI agent task execution where each task gets its own isolated environment.', aws: [], azure: [], gcp: [], cloudflare: ['Dynamic Workers'] },
      { name: 'Cron / Scheduled Jobs', sub: 'Run this code every Tuesday at 3am', hint: 'Often included with compute', desc: 'Run code on a schedule for background tasks - data cleanup, reports, digest emails, data syncing. CF Workers support cron triggers natively.', aws: ['EventBridge Scheduler'], azure: ['Logic Apps', 'Timer Triggers'], gcp: ['Cloud Scheduler'], cloudflare: ['Workers Cron Triggers'] },
      { name: 'Bare Metal Servers', sub: 'An actual physical server with no virtualization tax', hint: '$$. Monthly commitment', desc: 'Dedicated physical servers - no hypervisor overhead, no noisy neighbors. For maximum performance, specific hardware (GPUs, FPGAs), or compliance requiring physical isolation.', aws: ['EC2 Bare Metal'], azure: ['Bare Metal (SAP)'], gcp: ['Bare Metal Solution'], cloudflare: [] },
    ]
  },
  {
    category: 'Storage',
    intro: 'Object storage is the modern default. Cloudflare R2 charges zero egress fees - you don\'t pay to read your data back out, which can save enormous amounts compared to S3.',
    services: [
      { name: 'Object Storage', sub: 'Infinite file cabinet accessible via HTTP', hint: 'Per GB/mo. CF R2: zero egress fees', desc: 'Store any number of files accessible via HTTP. Designed for eleven-nines durability. CF R2 is S3-compatible (same API) but charges zero egress fees.', aws: ['Amazon S3'], azure: ['Blob Storage'], gcp: ['Cloud Storage'], cloudflare: ['R2'] },
      { name: 'Block Storage', sub: 'SSD in the cloud, attached to one VM', hint: 'Per GB/mo + IOPS', desc: 'High-performance disk volumes attached to VMs. Like a hard drive in the cloud. Essential for databases and anything needing fast random I/O.', aws: ['EBS'], azure: ['Managed Disks'], gcp: ['Persistent Disk'], cloudflare: [] },
      { name: 'File Storage', sub: 'Shared network drive multiple machines can use at once', hint: 'Per GB/mo', desc: 'Managed NFS/SMB file shares multiple machines mount simultaneously. Good for CMS content, shared configs, legacy apps. AWS FSx has options for Windows, Lustre, NetApp, OpenZFS.', aws: ['EFS', 'FSx'], azure: ['Azure Files'], gcp: ['Filestore'], cloudflare: [] },
      { name: 'Archive / Cold Storage', sub: 'Dirt cheap storage for stuff you probably won\'t need again', hint: 'Fractions of a cent/GB. Retrieval costs', desc: 'Extremely cheap for rarely-accessed data - compliance archives, old backups, historical data. Retrieval takes minutes to hours and costs money.', aws: ['S3 Glacier', 'S3 Glacier Deep Archive'], azure: ['Archive Storage'], gcp: ['Archive Storage'], cloudflare: ['R2 Infrequent Access'] },
      { name: 'Edge / Cache Storage', sub: 'Key-value store at the edge for instant lookups', hint: 'CF KV: 100K reads free/day', desc: 'Store small data at the edge for ultra-fast reads - config, feature flags, session tokens. CF Workers KV is globally distributed (eventually consistent). Cache Reserve keeps CDN assets cached longer.', aws: ['CloudFront KeyValueStore'], azure: [], gcp: [], cloudflare: ['Workers KV', 'Cache Reserve'] },
      { name: 'Managed Backup', sub: 'Automated backups so you don\'t lose everything', hint: 'Per GB stored + restore', desc: 'Centralized backup protecting VMs, databases, file systems with automated schedules, retention policies, and cross-region replication.', aws: ['AWS Backup'], azure: ['Azure Backup'], gcp: ['Backup and DR'], cloudflare: [] },
    ]
  },
  {
    category: 'Databases',
    intro: 'Managed databases handle backups, patching, and failover. Cloudflare offers D1 (SQLite at the edge), KV/Durable Objects (NoSQL), Hyperdrive (connection pooling to your existing DB), and Vectorize (vector search for AI).',
    services: [
      { name: 'Managed Relational Database', sub: 'SQL database where someone else handles the maintenance', hint: 'Per hour + storage. Free tiers exist', desc: 'Fully managed MySQL, PostgreSQL, SQL Server. Provider handles backups, patching, failover. CF D1 is serverless SQLite at the edge - simpler and cheaper, for lighter workloads.', aws: ['Amazon RDS', 'Aurora'], azure: ['Azure SQL', 'Database for PostgreSQL', 'Database for MySQL'], gcp: ['Cloud SQL', 'AlloyDB'], cloudflare: ['D1'] },
      { name: 'NoSQL / Document Database', sub: 'Schemaless database for when your data won\'t sit in rows', hint: 'Per read/write or per request', desc: 'Flexible schema, horizontal scalability. CF Workers KV (global, eventually consistent, read-optimized) and Durable Objects (strongly consistent per-object storage).', aws: ['DynamoDB', 'DocumentDB'], azure: ['Cosmos DB'], gcp: ['Firestore', 'Bigtable'], cloudflare: ['Workers KV', 'Durable Objects'] },
      { name: 'In-Memory Cache', sub: 'Database results kept in RAM for microsecond reads', hint: 'Per node-hour', desc: 'Key-value stores in RAM. Most common use: cache database results. Also for session storage, rate limiting, leaderboards. Redis is dominant.', aws: ['ElastiCache'], azure: ['Cache for Redis'], gcp: ['Memorystore'], cloudflare: [] },
      { name: 'Data Warehouse', sub: 'Yell SQL at petabytes of data and get answers', hint: 'Per query (BQ) or per cluster-hour', desc: 'Analytical databases for complex queries over massive datasets. Columnar storage. GCP BigQuery is serverless; Redshift and Synapse need cluster sizing.', aws: ['Amazon Redshift'], azure: ['Synapse Analytics'], gcp: ['BigQuery'], cloudflare: [] },
      { name: 'Vector Database', sub: 'Find similar things by meaning, not keywords. Built for AI.', hint: 'Per dimension stored + per query', desc: 'Stores and searches vector embeddings for semantic search, RAG, recommendations. CF Vectorize integrates with Workers AI for edge-native AI apps.', aws: ['OpenSearch (vector)'], azure: ['AI Search'], gcp: ['Vertex AI Vector Search'], cloudflare: ['Vectorize'] },
      { name: 'Database Connection Pooling', sub: 'Shares DB connections so your serverless functions don\'t exhaust them', hint: 'CF Hyperdrive: per query', desc: 'When many serverless functions connect to a database simultaneously, a pooler reuses a smaller connection pool. CF Hyperdrive pools connections to your PostgreSQL from Workers, also caching queries.', aws: ['RDS Proxy'], azure: [], gcp: ['AlloyDB Auth Proxy'], cloudflare: ['Hyperdrive'] },
      { name: 'Graph Database', sub: 'For data where relationships matter more than rows', hint: 'Per instance-hour', desc: 'Optimized for complex relationships - social networks, fraud detection, knowledge graphs. Native relationship traversal is faster than SQL joins.', aws: ['Amazon Neptune'], azure: ['Cosmos DB (Gremlin API)'], gcp: [], cloudflare: [] },
      { name: 'Time Series Database', sub: 'Optimized for metrics, sensors, and anything with timestamps', hint: 'Per writes ingested + storage', desc: 'Optimized for timestamped data - server metrics, IoT sensors, financial data. Efficient ingestion, compression, time-window queries.', aws: ['Amazon Timestream'], azure: ['Azure Data Explorer'], gcp: ['Cloud Bigtable'], cloudflare: [] },
      { name: 'Managed Kafka', sub: 'Someone else runs Kafka so you don\'t lose sleep over it', hint: 'Per broker-hour. Not cheap', desc: 'Managed Apache Kafka for high-throughput real-time data streaming. Kafka is one of the most complex pieces of infrastructure to self-manage.', aws: ['Amazon MSK'], azure: ['Event Hubs (Kafka-compatible)'], gcp: ['Managed Kafka'], cloudflare: [] },
    ]
  },
  {
    category: 'Networking & CDN',
    intro: 'Cloudflare is fundamentally a network company. DNS, CDN, and DDoS protection are their core business with generous free tiers. Their network spans 300+ cities. They\'ve expanded into enterprise networking (WAN, Magic Transit) and privacy networking (Tunnel, Mesh).',
    services: [
      { name: 'Virtual Private Cloud', sub: 'Your own private network in the cloud', hint: 'Free. NAT/gateways cost extra', desc: 'Isolated virtual network with custom IP ranges, subnets, routing. Almost all cloud resources live inside a VPC. CF Workers VPC connects Workers to your cloud\'s private networks.', aws: ['Amazon VPC'], azure: ['Virtual Network (VNet)'], gcp: ['VPC'], cloudflare: ['Workers VPC'] },
      { name: 'VPC Peering / Transit', sub: 'Connect your private networks together', hint: 'Per GB transferred', desc: 'Connect multiple VPCs in hub-spoke or mesh topologies. Essential for multi-account or multi-region architectures.', aws: ['Transit Gateway', 'VPC Peering'], azure: ['VNet Peering', 'Virtual WAN Hub'], gcp: ['Cloud Router', 'VPC Peering'], cloudflare: [] },
      { name: 'Private Link', sub: 'Access cloud services without touching the internet', hint: 'Per endpoint-hour + per GB', desc: 'Access cloud services over private network paths. Traffic never leaves the cloud provider\'s network. Critical for security and compliance.', aws: ['PrivateLink'], azure: ['Private Link'], gcp: ['Private Service Connect'], cloudflare: [] },
      { name: 'NAT Gateway', sub: 'Lets private servers reach the internet. Surprisingly expensive.', hint: 'Per hour + per GB. Adds up fast', desc: 'Allows private-subnet resources to make outbound connections while remaining unreachable from inbound. A significant cost line item on AWS.', aws: ['NAT Gateway'], azure: ['NAT Gateway'], gcp: ['Cloud NAT'], cloudflare: [] },
      { name: 'DNS', sub: 'Turns example.com into an IP address', hint: 'CF: free. AWS: $0.50/zone/month', desc: 'Managed domain name resolution with high availability. Used for traffic routing, failover, health-checked load balancing. Cloudflare DNS is one of the fastest in the world (1.1.1.1), free for basic use.', aws: ['Route 53'], azure: ['Azure DNS'], gcp: ['Cloud DNS'], cloudflare: ['DNS'] },
      { name: 'DNS Firewall', sub: 'Protects your nameservers from getting DDoS\'d', hint: 'Per query', desc: 'Sits in front of authoritative nameservers to absorb DNS-targeted DDoS, cache responses, and ensure resolution stays available even if nameservers go down.', aws: ['Route 53 Resolver Firewall'], azure: ['DNS Private Resolver'], gcp: [], cloudflare: ['DNS Firewall'] },
      { name: 'Internal / Private DNS', sub: 'Private DNS for resources that shouldn\'t be public', hint: 'Included with VPC/Zero Trust', desc: 'Resolve internal hostnames without exposing them to the public internet. CF Internal DNS simplifies private network management within Zero Trust.', aws: ['Route 53 Private Hosted Zones'], azure: ['Azure Private DNS'], gcp: ['Cloud DNS Private Zones'], cloudflare: ['Internal DNS'] },
      { name: 'CDN', sub: 'Copies of your content cached worldwide for speed', hint: 'CF: free. Others: per GB served', desc: 'Caches content at edge locations worldwide. Cloudflare\'s CDN is their original product - free to start, most extensive global network of any CDN.', aws: ['CloudFront'], azure: ['Azure CDN', 'Front Door'], gcp: ['Cloud CDN'], cloudflare: ['CDN'] },
      { name: 'Load Balancer', sub: 'Spreads traffic so no single server collapses', hint: 'Per hour + per GB. CF: from $5/mo', desc: 'Distributes traffic across servers with health checks, SSL termination, routing rules. AWS ALB (HTTP/L7), NLB (TCP/L4). CF Load Balancing adds geographic steering.', aws: ['ALB', 'NLB', 'CLB'], azure: ['Load Balancer', 'Application Gateway'], gcp: ['Cloud Load Balancing'], cloudflare: ['Load Balancing'] },
      { name: 'DDoS Protection', sub: 'Absorbs the internet\'s rage so your servers don\'t have to', hint: 'CF: free. AWS Shield Adv: $3,000/mo', desc: 'Filters malicious traffic at the network edge. Cloudflare is the industry leader - always-on, free on all plans, has mitigated some of the largest attacks ever recorded.', aws: ['AWS Shield'], azure: ['DDoS Protection'], gcp: ['Cloud Armor'], cloudflare: ['DDoS Protection'] },
      { name: 'Web Application Firewall', sub: 'Your website\'s bouncer, checking every request at the door', hint: 'CF: included on Pro+. AWS: per rule', desc: 'Inspects HTTP traffic and blocks SQL injection, XSS, and OWASP Top 10 attacks. Cloudflare WAF protects millions of websites with auto-updating rulesets.', aws: ['AWS WAF'], azure: ['Azure WAF'], gcp: ['Cloud Armor WAF'], cloudflare: ['WAF'] },
      { name: 'Network Firewall', sub: 'Packet-level filtering for traffic inside your cloud network', hint: 'Per hour + per GB inspected', desc: 'Stateful firewall for traffic within/between VPCs - east-west traffic, not just north-south. Different from WAF (HTTP only). CF Network Firewall covers Magic Transit/WAN customers.', aws: ['Network Firewall'], azure: ['Azure Firewall'], gcp: ['Cloud Firewall'], cloudflare: ['Network Firewall'] },
      { name: 'API Gateway', sub: 'Front door for your APIs with auth and rate limiting', hint: 'Per API call', desc: 'Managed API front door - auth, rate limiting, transformation, routing. CF API Shield focuses on API security (schema validation, anomaly detection, abuse prevention).', aws: ['API Gateway'], azure: ['API Management'], gcp: ['API Gateway', 'Apigee'], cloudflare: ['API Shield', 'API Gateway'] },
      { name: 'Private / Dedicated Connectivity', sub: 'Physical cable from your building to the cloud', hint: 'Port fee + per GB. Weeks to set up', desc: 'Private network connections bypassing the public internet. CF Tunnel is different - a daemon creates encrypted outbound connections without exposing ports.', aws: ['Direct Connect'], azure: ['ExpressRoute'], gcp: ['Cloud Interconnect'], cloudflare: ['Tunnel', 'Network Interconnect'] },
      { name: 'Domain Registration', sub: 'Buy domains at cost, no markup', hint: 'CF: at-cost, cheapest registrar', desc: 'Register and manage domains. Cloudflare Registrar charges exactly what ICANN/registries charge - zero markup.', aws: ['Route 53 Domains'], azure: [], gcp: ['Cloud Domains'], cloudflare: ['Registrar'] },
      { name: 'Smart Routing', sub: 'Finds the fastest path, not just the default one', hint: 'CF Argo: per GB. Saves ~30% latency', desc: 'Optimize network paths beyond what BGP provides. CF Argo Smart Routing uses their private backbone for faster paths, especially for dynamic content.', aws: ['Global Accelerator'], azure: ['Front Door'], gcp: ['Premium Tier Network'], cloudflare: ['Argo Smart Routing'] },
      { name: 'TCP/UDP Proxy', sub: 'DDoS protection for non-HTTP stuff (games, email, SSH)', hint: 'Per GB proxied', desc: 'Proxy non-HTTP protocols through a global network with DDoS protection. CF Spectrum extends protection to any TCP/UDP traffic.', aws: ['NLB', 'Global Accelerator'], azure: ['Azure Load Balancer'], gcp: ['TCP/SSL Proxy LB'], cloudflare: ['Spectrum'] },
      { name: 'Network-Level DDoS (L3/L4)', sub: 'DDoS protection for entire IP ranges, not just websites', hint: 'Enterprise pricing', desc: 'Protects network infrastructure - routers, entire IP ranges. CF Magic Transit puts your IP space behind their network, scrubbing volumetric attacks.', aws: ['Shield Advanced'], azure: ['DDoS Protection Standard'], gcp: ['Cloud Armor'], cloudflare: ['Magic Transit'] },
      { name: 'SD-WAN', sub: 'Software-defined networking between offices, replacing expensive MPLS', hint: 'Per-seat or per-location', desc: 'Replace traditional MPLS circuits with software-defined networking. Cloudflare WAN connects locations through their global network.', aws: ['Cloud WAN'], azure: ['Virtual WAN'], gcp: ['Network Connectivity Center'], cloudflare: ['Cloudflare WAN'] },
      { name: 'Mesh Networking', sub: 'Encrypted connections between everything, everywhere', hint: 'Enterprise feature', desc: 'Post-quantum encrypted mesh connectivity between services, devices, and agents. CF Mesh provides overlay networking without VPN complexity.', aws: ['App Mesh'], azure: [], gcp: [], cloudflare: ['Cloudflare Mesh'] },
      { name: 'Multi-Cloud Networking', sub: 'Manage AWS+Azure+GCP networking from one place', hint: 'Enterprise feature', desc: 'Automate resource discovery and manage infrastructure across multiple public clouds from one dashboard.', aws: [], azure: [], gcp: [], cloudflare: ['Multi-Cloud Networking'] },
      { name: 'China Network', sub: 'CDN and security inside the Great Firewall', hint: 'Enterprise add-on', desc: 'CDN and security in mainland China through local partnership. In-China DNS, DDoS protection, content acceleration.', aws: ['China Regions (Sinnet/NWCD)'], azure: ['Azure China (21Vianet)'], gcp: [], cloudflare: ['China Network'] },
      { name: 'Waiting Room', sub: 'Virtual queue when your site gets slammed. Fair and orderly.', hint: 'CF: from $200/mo. Only CF offers this', desc: 'Virtual queue during traffic spikes. Instead of crashing, excess visitors wait in a fair queue. Cloudflare is the only major provider with a dedicated waiting room.', aws: [], azure: [], gcp: [], cloudflare: ['Waiting Room'] },
      { name: 'BYOIP', sub: 'Use your own IP addresses with the provider\'s network', hint: 'Enterprise feature', desc: 'Bring your own IP address ranges while getting the provider\'s security and performance features.', aws: ['BYOIP'], azure: ['Custom IP Prefix'], gcp: ['BYOIP'], cloudflare: ['BYOIP'] },
      { name: 'SSL for SaaS / Custom Domains', sub: 'Let your SaaS customers use their own domains with HTTPS', hint: 'CF: $2/hostname/mo', desc: 'Automatic SSL certificate provisioning for thousands of customer vanity domains on your SaaS platform.', aws: [], azure: [], gcp: [], cloudflare: ['Cloudflare for SaaS'] },
    ]
  },
  {
    category: 'Security & Identity',
    intro: 'Cloudflare has a full Zero Trust / SASE suite (Access, Gateway, Browser Isolation, CASB, DLP, DEM) replacing corporate VPNs. They also offer AI-specific security (Firewall for AI), email security, and client-side protection. The big three focus on IAM, encryption, and threat detection (GuardDuty, Sentinel, Chronicle).',
    services: [
      { name: 'Identity & Access Management', sub: 'Who can do what. Get this wrong and you\'re on the news.', hint: 'Free. It secures everything else', desc: 'Controls who can do what in your cloud account. #1 cause of breaches when misconfigured. CF Access protects web applications with identity-aware auth, replacing VPNs.', aws: ['IAM'], azure: ['Entra ID (Azure AD)'], gcp: ['Cloud IAM'], cloudflare: ['Access'] },
      { name: 'Key Management', sub: 'Hardware-backed encryption key storage you can\'t accidentally leak', hint: 'Per key/month + per API call', desc: 'Create, store, manage encryption keys. Hardware-backed (HSM). Integrated with other services for transparent encryption at rest.', aws: ['KMS'], azure: ['Key Vault'], gcp: ['Cloud KMS'], cloudflare: [] },
      { name: 'Secrets Management', sub: 'Store passwords and API keys somewhere that isn\'t your code', hint: 'Per secret/mo. CF: free with Workers', desc: 'Securely store and retrieve API keys, database passwords, tokens. Apps fetch at runtime instead of hardcoding. CF Secrets Store is account-level encrypted storage.', aws: ['Secrets Manager'], azure: ['Key Vault'], gcp: ['Secret Manager'], cloudflare: ['Secrets Store'] },
      { name: 'SSL / TLS Certificates', sub: 'HTTPS certificates so browsers trust your site', hint: 'CF: free. AWS ACM: free', desc: 'HTTPS certificate provisioning and management. CF Universal SSL provides free HTTPS for any domain. Keyless SSL lets you use CF without sharing private keys. Geo Key Manager controls where keys are stored.', aws: ['ACM'], azure: ['App Service Certificates'], gcp: ['Certificate Manager'], cloudflare: ['Universal SSL', 'Advanced Certificates', 'Keyless SSL'] },
      { name: 'Zero Trust Network Access', sub: 'Verify every request, trust no network. VPNs are dead.', hint: 'CF: free up to 50 users', desc: 'Replace VPNs with identity-aware per-application access. CF has the most complete offering - Access (app access), Gateway (web filtering), Cloudflare One Client (device agent).', aws: ['Verified Access'], azure: ['Entra Private Access'], gcp: ['BeyondCorp Enterprise'], cloudflare: ['Zero Trust (Access + Gateway + WARP)'] },
      { name: 'Secure Web Gateway', sub: 'Filters everything your employees browse', hint: 'Per-seat pricing', desc: 'Filters all outbound internet traffic. Blocks malicious sites, enforces policies. CF Gateway processes DNS/HTTP at the edge - no backhauling.', aws: [], azure: ['Entra Internet Access'], gcp: [], cloudflare: ['Gateway'] },
      { name: 'Remote Browser Isolation', sub: 'Web browsing happens in the cloud, not on the device', hint: 'Per-seat add-on', desc: 'Runs browsing remotely so malicious content never reaches the device. CF runs it at the edge for low latency.', aws: ['AppStream 2.0'], azure: [], gcp: [], cloudflare: ['Browser Isolation'] },
      { name: 'VPN Client / Device Agent', sub: 'Routes device traffic through the provider\'s network', hint: 'CF WARP: free personal use', desc: 'Client app encrypting device traffic. CF One Client (evolved from WARP/1.1.1.1) is the device agent for their corporate Zero Trust platform.', aws: ['Client VPN'], azure: ['VPN Gateway (P2S)'], gcp: [], cloudflare: ['Cloudflare One Client (WARP)'] },
      { name: 'CASB', sub: 'Scans your SaaS apps for security holes you didn\'t know about', hint: 'Per-seat add-on', desc: 'Scans SaaS applications (Google Workspace, M365, Slack) for data security issues - public file shares, unauthorized integrations, misconfigurations.', aws: [], azure: ['Defender for Cloud Apps'], gcp: [], cloudflare: ['CASB'] },
      { name: 'Data Loss Prevention', sub: 'Catches sensitive data before it leaves your network', hint: 'Per-seat add-on', desc: 'Scans web traffic and SaaS apps for PII, credit cards, sensitive data to prevent exfiltration.', aws: ['Macie'], azure: ['Purview DLP'], gcp: ['DLP API'], cloudflare: ['DLP'] },
      { name: 'Bot Management', sub: 'Tells humans from bots so scrapers and stuffers get blocked', hint: 'CF Turnstile: free. Full: Enterprise', desc: 'Detect and manage automated traffic. CF processes massive global web traffic giving unmatched bot visibility. Turnstile is their free privacy-preserving CAPTCHA alternative.', aws: ['AWS WAF Bot Control'], azure: ['Azure WAF Bot Protection'], gcp: ['reCAPTCHA Enterprise'], cloudflare: ['Bot Management', 'Turnstile'] },
      { name: 'Rate Limiting', sub: 'Limits how fast someone can hit your site', hint: 'CF: 10 free rules', desc: 'Control incoming request rates based on custom rules. Protects against brute force, abuse, API overuse. CF operates at the edge before requests hit origin.', aws: ['AWS WAF Rate Rules'], azure: ['Azure WAF Rate Limiting'], gcp: ['Cloud Armor Rate Limiting'], cloudflare: ['Rate Limiting'] },
      { name: 'Email Security', sub: 'Catches phishing before your inbox does', hint: 'Per-mailbox pricing', desc: 'Protects against phishing, BEC, email malware. CF Email Security uses ML to catch phishing campaigns days before other solutions.', aws: [], azure: ['Defender for Office 365'], gcp: [], cloudflare: ['Email Security'] },
      { name: 'DMARC Management', sub: 'Stops people from sending email as your domain', hint: 'CF: free', desc: 'Protect your email domain from spoofing and brand impersonation. DMARC/SPF/DKIM configuration and monitoring dashboard.', aws: [], azure: [], gcp: [], cloudflare: ['DMARC Management'] },
      { name: 'Client-Side / Page Security', sub: 'Watches third-party scripts on your site for tampering', hint: 'CF: included on Business+', desc: 'Monitors third-party JavaScript for supply-chain attacks (Magecart-style). Detects changes, alerts on malicious behavior, blocks compromised scripts.', aws: [], azure: [], gcp: [], cloudflare: ['Page Shield'] },
      { name: 'Leaked Credentials Detection', sub: 'Checks logins against 15 billion leaked passwords', hint: 'Included with WAF', desc: 'Checks incoming auth requests against a massive database of previously leaked credentials. Alerts or blocks compromised logins.', aws: [], azure: ['Entra ID Protection'], gcp: [], cloudflare: ['Leaked Credentials Detection'] },
      { name: 'Fraud Detection', sub: 'Tracks request patterns to catch account abuse', hint: 'Enterprise feature', desc: 'Sequence rules tracking order and timing of requests via cookies. Identifies credential stuffing, account takeover, and bot-driven fraud.', aws: ['AWS WAF Fraud Control'], azure: [], gcp: [], cloudflare: ['Fraud Detection'] },
      { name: 'Smart Shield', sub: 'Auto-configures origin protection so you don\'t have to', hint: 'Included with CF plans', desc: 'Automated recommendations to protect and optimize your origin server with minimal configuration.', aws: [], azure: [], gcp: [], cloudflare: ['Smart Shield'] },
      { name: 'Geo Key Manager', sub: 'Keep SSL keys in specific countries only, for compliance', hint: 'Enterprise add-on', desc: 'Control geographic location where SSL/TLS private keys are stored. Keys never leave specified regions for data sovereignty compliance.', aws: [], azure: [], gcp: [], cloudflare: ['Geo Key Manager'] },
      { name: 'Security Posture / CSPM', sub: 'Dashboard showing where your security has holes', hint: 'Included with accounts', desc: 'Central dashboard showing security posture across all services. Identifies misconfigurations, vulnerabilities, compliance gaps.', aws: ['Security Hub'], azure: ['Defender for Cloud'], gcp: ['Security Command Center'], cloudflare: ['Security Center'] },
      { name: 'Threat Detection / SIEM', sub: 'ML watching your logs for suspicious activity 24/7', hint: 'Per event (GuardDuty) or per GB (Sentinel)', desc: 'Automated threat detection using ML and threat intelligence. Monitors logs, traffic, API calls. AWS GuardDuty is turned on by most customers. Sentinel and Chronicle are full SIEMs.', aws: ['GuardDuty'], azure: ['Sentinel'], gcp: ['Chronicle (SecOps)'], cloudflare: ['Cloudforce One'] },
      { name: 'Data Localization', sub: 'Control which countries store and process your data', hint: 'Enterprise add-on', desc: 'Control where data is stored and processed for GDPR and regional compliance.', aws: ['Region selection', 'Outposts'], azure: ['Sovereign Clouds'], gcp: ['Assured Workloads'], cloudflare: ['Data Localization Suite'] },
      { name: 'Digital Experience Monitoring', sub: 'See how your employees actually experience your apps', hint: 'Per-seat add-on', desc: 'Monitor device, network, and application health across your Zero Trust deployment. See latency, packet loss, connectivity issues by device/location/ISP.', aws: [], azure: [], gcp: [], cloudflare: ['DEX'] },
    ]
  },
  {
    category: 'AI & Machine Learning',
    intro: 'The big three offer full ML lifecycle. Cloudflare focuses on edge inference (Workers AI), AI app infrastructure (AI Gateway, Vectorize, AI Search), the 2025-2026 agentic stack (Agents SDK, Browser Rendering, Sandboxes), and AI-specific security (Firewall for AI, AI Crawl Control).',
    services: [
      { name: 'ML Platform', sub: 'Build, train, and deploy your own custom models', hint: 'Per compute-hour. Expensive', desc: 'Full machine learning lifecycle - data prep, training, tuning, deployment. Necessary for custom model training.', aws: ['SageMaker'], azure: ['Azure Machine Learning'], gcp: ['Vertex AI'], cloudflare: [] },
      { name: 'AI Model APIs / Inference', sub: 'Call GPT/Claude/Gemini/Llama via API. No ML skills needed.', hint: 'Per token. CF: some models free', desc: 'Access pre-trained models via API - LLMs, image generators, embeddings. CF Workers AI runs open-source models on edge GPUs with low latency.', aws: ['Amazon Bedrock'], azure: ['Azure OpenAI Service', 'Azure AI Services'], gcp: ['Vertex AI (Gemini, Claude, etc.)'], cloudflare: ['Workers AI'] },
      { name: 'AI Gateway / Proxy', sub: 'Proxy between you and AI providers. Caching, logging, fallback.', hint: 'CF: free tier', desc: 'Centralized proxy for AI API calls - caching (avoid duplicate costs), rate limiting, cost controls, provider fallback. CF AI Gateway is the most mature, supporting any provider.', aws: [], azure: ['Azure APIM (AI Gateway)'], gcp: [], cloudflare: ['AI Gateway'] },
      { name: 'AI Search / RAG', sub: 'Upload docs, AI finds answers in them automatically', hint: 'Per query + per doc stored', desc: 'Managed retrieval-augmented generation. Upload documents, service handles chunking, embedding, indexing, retrieval. CF AI Search (formerly AutoRAG) provides fully managed RAG.', aws: ['Bedrock Knowledge Bases'], azure: ['Azure AI Search (RAG)'], gcp: ['Vertex AI Search'], cloudflare: ['AI Search'] },
      { name: 'AI Agents SDK', sub: 'Build AI agents that browse, code, and remember things', hint: 'Pay per Worker execution', desc: 'Build AI-powered agents that persist state, browse the web, execute code, and communicate in real-time. CF Agents SDK integrates with Durable Objects, Browser Rendering, and Workers AI.', aws: [], azure: [], gcp: [], cloudflare: ['Agents SDK'] },
      { name: 'Browser Rendering', sub: 'Headless browsers for AI agents to use the web', hint: 'CF: free tier. Per session after', desc: 'Programmable headless Chromium instances at the edge via Puppeteer-compatible API. For AI agents browsing, screenshot capture, form filling, and web automation.', aws: [], azure: [], gcp: [], cloudflare: ['Browser Rendering'] },
      { name: 'Firewall for AI', sub: 'Catches prompt injection and PII leakage in AI apps', hint: 'Included with WAF', desc: 'Security for LLM-powered apps. Detects prompt injection, PII leakage, toxic content in AI inputs/outputs. Integrated inline with WAF.', aws: ['Bedrock Guardrails'], azure: ['Azure AI Content Safety'], gcp: [], cloudflare: ['Firewall for AI'] },
      { name: 'AI Crawler Control', sub: 'See which AI bots scrape your site and shut them down', hint: 'CF: free', desc: 'Analyze and control how AI companies crawl your site for training data. CF AI Labyrinth generates fake content to waste resources of crawlers ignoring robots.txt.', aws: [], azure: [], gcp: [], cloudflare: ['AI Crawl Control', 'AI Labyrinth'] },
      { name: 'AI Dashboard Co-Pilot', sub: 'AI assistant in the cloud console that helps you configure things', hint: 'Free with account', desc: 'Natural language assistant built into the dashboard. CF Agent Lee troubleshoots issues, adjusts settings, answers questions about your configuration.', aws: ['Amazon Q (for AWS)'], azure: ['Copilot for Azure'], gcp: ['Gemini for Google Cloud'], cloudflare: ['Agent Lee'] },
      { name: 'Artifacts', sub: 'Git-compatible versioned storage for agent code and data', hint: 'Per storage used', desc: 'Store, version, and share filesystem artifacts across Workers, APIs, and git-compatible tools.', aws: ['CodeArtifact'], azure: ['Azure Artifacts'], gcp: ['Artifact Registry'], cloudflare: ['Artifacts'] },
      { name: 'Speech AI', sub: 'Turn speech to text and text to speech', hint: 'Per minute/character', desc: 'Speech-to-text (transcription) and text-to-speech (synthesis). For call centers, accessibility, voice assistants, podcast transcription.', aws: ['Transcribe', 'Polly'], azure: ['Azure Speech'], gcp: ['Speech-to-Text', 'Text-to-Speech'], cloudflare: [] },
      { name: 'Vision AI', sub: 'Image recognition, OCR, and content moderation via API', hint: 'Per image/video processed', desc: 'Analyze images and video - object detection, OCR, content moderation, scene understanding.', aws: ['Rekognition'], azure: ['Azure Computer Vision'], gcp: ['Vision AI', 'Video AI'], cloudflare: [] },
      { name: 'Natural Language Processing', sub: 'Sentiment analysis, entity extraction, and translation', hint: 'Per request', desc: 'Text analysis - sentiment, entity extraction, classification, translation. For processing feedback, documents, and text at scale.', aws: ['Comprehend', 'Translate'], azure: ['Azure Language', 'Translator'], gcp: ['Natural Language AI', 'Translation'], cloudflare: [] },
    ]
  },
  {
    category: 'Developer Tools',
    intro: 'Cloudflare\'s tooling revolves around Wrangler (and newer cf CLI) for Workers, Pages, D1, R2. They added Flagship (edge feature flags) and Secrets Store (account-level encrypted secrets).',
    services: [
      { name: 'CI/CD Pipeline', sub: 'Auto-build, test, and deploy on every code push', hint: 'CF Pages: 500 builds/mo free', desc: 'Automated pipelines triggered by code changes. CF Pages includes built-in CI/CD with preview deployments for every pull request.', aws: ['CodePipeline', 'CodeBuild'], azure: ['Azure DevOps Pipelines'], gcp: ['Cloud Build'], cloudflare: ['Pages (built-in CI/CD)'] },
      { name: 'Infrastructure as Code', sub: 'Define infrastructure in code files instead of clicking consoles', hint: 'Free tools. Pay for what you create', desc: 'Version-controlled, peer-reviewed infrastructure definitions. CF has first-class Terraform and Pulumi providers plus Wrangler config files.', aws: ['CloudFormation', 'CDK'], azure: ['ARM Templates', 'Bicep'], gcp: ['Deployment Manager'], cloudflare: ['Terraform Provider', 'Pulumi Provider'] },
      { name: 'CLI Tool', sub: 'Manage cloud resources from your terminal', hint: 'Free', desc: 'Command-line interface for scripting and automation. CF has both Wrangler (developer platform) and the newer cf CLI (unified across all products).', aws: ['AWS CLI'], azure: ['Azure CLI'], gcp: ['gcloud CLI'], cloudflare: ['Wrangler', 'cf CLI'] },
      { name: 'Feature Flags', sub: 'Toggle features on/off without deploying new code', hint: 'CF Flagship: included with Workers', desc: 'Control rollouts, A/B tests, kill switches. CF Flagship provides feature flags with sub-millisecond edge evaluation, built on KV and Durable Objects.', aws: ['AppConfig Feature Flags'], azure: ['App Configuration'], gcp: [], cloudflare: ['Flagship'] },
      { name: 'Rules Engine', sub: 'Rewrite, redirect, and transform requests at the edge', hint: 'Varies by plan. Some free rules', desc: 'CF Rules replaces deprecated Page Rules - Configuration Rules, Origin Rules, Transform Rules, Redirect Rules, Compression Rules, and Snippets (custom JS at edge).', aws: ['CloudFront Functions'], azure: ['Front Door Rules Engine'], gcp: ['Cloud CDN policies'], cloudflare: ['Rules', 'Snippets'] },
      { name: 'Source Code Repository', sub: 'Git hosting. You\'re probably using GitHub instead.', hint: 'Free or included', desc: 'Managed Git repositories. Most teams use GitHub/GitLab. AWS CodeCommit is deprecated.', aws: ['CodeCommit (deprecated)'], azure: ['Azure Repos'], gcp: ['Cloud Source Repositories'], cloudflare: [] },
      { name: 'Version Management', sub: 'Test config changes in staging before going live', hint: 'Enterprise feature', desc: 'Safely manage config changes with versioning, staging, and rollbacks. CF Version Management tests changes before production promotion.', aws: ['CloudFormation StackSets'], azure: ['Deployment Slots'], gcp: ['Traffic Splitting'], cloudflare: ['Version Management'] },
      { name: 'Tenant / Platform Management', sub: 'Manage customer cloud accounts at scale as an MSP', hint: 'Enterprise/partner feature', desc: 'Provision and manage accounts and services programmatically for MSPs, partners, and platform builders.', aws: ['AWS Organizations'], azure: ['Azure Lighthouse'], gcp: [], cloudflare: ['Tenant'] },
      { name: 'Google Tag Gateway', sub: 'First-party Google tag serving through your domain', hint: 'Enterprise feature', desc: 'Routes Google analytics/advertising tags through your own domain for improved measurement (~11% data uplift) and privacy compliance.', aws: [], azure: [], gcp: [], cloudflare: ['Google Tag Gateway'] },
    ]
  },
  {
    category: 'Monitoring & Operations',
    intro: 'Cloudflare provides edge-specific analytics, Zaraz for third-party script management (runs scripts in the cloud instead of the browser), Log Explorer, and DEX for Zero Trust monitoring.',
    services: [
      { name: 'Monitoring & Metrics', sub: 'Dashboards and alarms for your infrastructure', hint: 'Free tier for basic. Per-metric after', desc: 'Collect and visualize metrics - CPU, latency, error rates, custom metrics. CF provides Web Analytics (privacy-first, no cookies) and product dashboards.', aws: ['CloudWatch'], azure: ['Azure Monitor'], gcp: ['Cloud Monitoring'], cloudflare: ['Analytics', 'Web Analytics'] },
      { name: 'Logging', sub: 'Centralized logs from everything, searchable', hint: 'Per GB ingested. Can get expensive', desc: 'Centralized log collection and analysis. CF Logpush streams logs to your storage/analytics. Log Explorer searches logs in the dashboard.', aws: ['CloudWatch Logs'], azure: ['Log Analytics'], gcp: ['Cloud Logging'], cloudflare: ['Logpush', 'Log Explorer'] },
      { name: 'Tracing', sub: 'Follow one request through 10 microservices to find the bottleneck', hint: 'Per trace sampled', desc: 'Distributed tracing to follow requests through microservices and find where time is spent.', aws: ['X-Ray'], azure: ['Application Insights'], gcp: ['Cloud Trace'], cloudflare: [] },
      { name: 'Cost Management', sub: 'Track where your cloud money goes (and weep)', hint: 'Free', desc: 'Track, analyze, optimize cloud spending. CF pricing is simpler (flat-rate plans) so dedicated cost tools are less needed.', aws: ['Cost Explorer', 'Budgets'], azure: ['Cost Management'], gcp: ['Cost Management'], cloudflare: [] },
      { name: 'Uptime & Health Checks', sub: 'Ping your servers and alert you when they die', hint: 'CF: free. AWS: $0.50/check/mo', desc: 'Monitor endpoint availability from multiple locations. CF Health Checks integrate with load balancer for automatic failover.', aws: ['Route 53 Health Checks'], azure: ['Azure Monitor Availability'], gcp: ['Cloud Monitoring Uptime'], cloudflare: ['Health Checks'] },
      { name: 'Third-Party Script Management', sub: 'Run analytics/chat/ads in the cloud instead of user\'s browser', hint: 'CF Zaraz: free basic', desc: 'CF Zaraz runs third-party tools at the edge instead of in the browser - dramatically improving page speed and privacy. Central dashboard for all marketing/analytics tools.', aws: [], azure: [], gcp: [], cloudflare: ['Zaraz'] },
      { name: 'Network Error Logging', sub: 'Browser reports connectivity failures back to you', hint: 'CF: included', desc: 'Collect browser reports about DNS errors, TCP timeouts, TLS failures before requests reach your server.', aws: [], azure: [], gcp: [], cloudflare: ['Network Error Logging'] },
      { name: 'Resource Tagging', sub: 'Label resources for organization and billing allocation', hint: 'Free (it\'s metadata)', desc: 'Attach key-value metadata to resources for organization, access control, cost allocation.', aws: ['Resource Tags'], azure: ['Resource Tags'], gcp: ['Labels'], cloudflare: ['Resource Tagging'] },
      { name: 'Notifications / Alerting', sub: 'Get alerted about events via email, webhook, PagerDuty', hint: 'Free', desc: 'Define alert thresholds and delivery methods for security events, performance degradation, billing, operations.', aws: ['CloudWatch Alarms', 'SNS'], azure: ['Azure Monitor Alerts'], gcp: ['Cloud Monitoring Alerting'], cloudflare: ['Notifications'] },
      { name: 'Analytics API', sub: 'Query your analytics data programmatically', hint: 'Free with account', desc: 'Programmatic access to analytics data. CF provides GraphQL API for custom dashboards and monitoring integrations.', aws: ['CloudWatch API'], azure: ['Azure Monitor REST API'], gcp: ['Cloud Monitoring API'], cloudflare: ['GraphQL Analytics API'] },
      { name: 'Network Flow Monitoring', sub: 'See traffic patterns in your network', hint: 'Per flow analyzed', desc: 'Visibility into network traffic via flow data (NetFlow/sFlow). CF Network Flow analyzes flow data from your network.', aws: ['VPC Flow Logs'], azure: ['NSG Flow Logs'], gcp: ['VPC Flow Logs'], cloudflare: ['Network Flow'] },
    ]
  },
  {
    category: 'Messaging & Integration',
    intro: 'CF Queues brings message queuing to the edge. They also added Email Service for transactional sending and Realtime (formerly Calls) for video/audio.',
    services: [
      { name: 'Message Queue', sub: 'Send it now, process it later. Decouples everything.', hint: 'Per message. CF Queues: free tier', desc: 'Async message passing between services. CF Queues integrates directly with Workers.', aws: ['SQS'], azure: ['Queue Storage', 'Service Bus'], gcp: ['Pub/Sub'], cloudflare: ['Queues'] },
      { name: 'Event Bus / Streaming', sub: 'Publish events, route to many subscribers with filtering', hint: 'Per event', desc: 'Real-time event routing with fan-out. Streaming services handle high-throughput log aggregation and analytics pipelines.', aws: ['EventBridge', 'Kinesis'], azure: ['Event Grid', 'Event Hubs'], gcp: ['Eventarc', 'Pub/Sub'], cloudflare: [] },
      { name: 'Push Notifications', sub: 'Alert millions of devices at once', hint: 'Per notification. GCP FCM: free', desc: 'Send notifications to mobile, email, SMS, HTTP endpoints at scale.', aws: ['SNS'], azure: ['Notification Hubs'], gcp: ['Firebase Cloud Messaging'], cloudflare: [] },
      { name: 'Email Service', sub: 'Send and receive emails from code', hint: 'Per email. AWS SES: cheap', desc: 'Programmatic email at scale. CF Email Routing handles inbound; Email Service sends transactional emails from Workers.', aws: ['SES'], azure: ['Communication Services'], gcp: [], cloudflare: ['Email Routing', 'Email Service'] },
      { name: 'Real-Time Communication', sub: 'Video and audio calls built into your app', hint: 'Per participant-minute', desc: 'Real-time audio/video infrastructure. CF Realtime (formerly Calls) provides SFU and TURN service at the edge.', aws: ['Chime SDK'], azure: ['Communication Services'], gcp: [], cloudflare: ['Realtime (SFU + TURN)'] },
    ]
  },
  {
    category: 'Analytics & Big Data',
    intro: 'CF expanded into data infrastructure in 2025-2026: Pipelines (real-time ingestion), R2 Data Catalog (Iceberg tables), R2 SQL (serverless query engine). Together with Analytics Engine, they now offer a lightweight data platform at the edge.',
    services: [
      { name: 'Data Warehouse / SQL Analytics', sub: 'SQL over petabytes of data', hint: 'BQ: per TB scanned, free 1TB/mo', desc: 'Complex SQL over massive datasets. BigQuery is serverless; Athena queries S3 directly. CF R2 SQL is a new serverless query engine over R2 data.', aws: ['Amazon Redshift', 'Athena'], azure: ['Synapse Analytics'], gcp: ['BigQuery'], cloudflare: ['R2 SQL'] },
      { name: 'Data Ingestion / Pipelines', sub: 'Pipe real-time data streams into storage', hint: 'Per GB ingested', desc: 'Ingest real-time data, transform with SQL, load into storage. CF Pipelines writes into R2 in Iceberg format.', aws: ['Kinesis Data Firehose', 'Glue'], azure: ['Data Factory'], gcp: ['Dataflow', 'Dataproc'], cloudflare: ['Pipelines'] },
      { name: 'Data Catalog', sub: 'Track what data you have, where, and what shape it\'s in', hint: 'Per object cataloged', desc: 'Metadata management for data lakes. CF R2 Data Catalog provides Iceberg table management and compaction over R2.', aws: ['Glue Data Catalog'], azure: ['Purview'], gcp: ['Dataplex'], cloudflare: ['R2 Data Catalog'] },
      { name: 'Event Analytics', sub: 'Lightweight analytics DB for custom events from your code', hint: 'CF: free tier', desc: 'Write-optimized time-series analytics database. CF Analytics Engine is designed for Workers to write events and query aggregates.', aws: [], azure: [], gcp: [], cloudflare: ['Analytics Engine'] },
      { name: 'Search Service', sub: 'Full-text search with relevance ranking and typo tolerance', hint: 'Per instance-hour or per query', desc: 'Full-text search for app search bars, log analysis, and content search.', aws: ['OpenSearch'], azure: ['AI Search'], gcp: ['Vertex AI Search'], cloudflare: [] },
      { name: 'Business Intelligence', sub: 'Drag-and-drop dashboards for people who don\'t write SQL', hint: 'Per user/month', desc: 'Interactive dashboards and visualizations. Azure Power BI has the largest enterprise BI market share.', aws: ['QuickSight'], azure: ['Power BI'], gcp: ['Looker'], cloudflare: [] },
      { name: 'Internet Intelligence', sub: 'Global internet trends, outages, and attack data from CF\'s network', hint: 'CF Radar: free', desc: 'Public dashboard of global internet trends using Cloudflare\'s massive network data - outages, attacks, traffic patterns, routing.', aws: [], azure: [], gcp: [], cloudflare: ['Radar'] },
    ]
  },
  {
    category: 'Media & Content',
    intro: 'CF Stream (video), Images (image pipeline), and Speed suite (site optimization) are integrated with their CDN for optimal delivery.',
    services: [
      { name: 'Video Streaming / Transcoding', sub: 'Upload, encode, store, and stream video. All-in-one.', hint: 'Per minute stored + delivered', desc: 'Video encoding, storage, and adaptive streaming delivery. CF Stream is all-in-one with a built-in player.', aws: ['MediaConvert', 'MediaLive'], azure: ['Media Services'], gcp: ['Transcoder API'], cloudflare: ['Stream'] },
      { name: 'Image Optimization', sub: 'Resize and compress images on the fly, serve the right format', hint: 'CF: per unique transform', desc: 'Transform images at the edge - resize, compress, convert to WebP/AVIF. CF Images is a complete pipeline; Image Resizing transforms from any origin URL.', aws: ['CloudFront + Lambda@Edge'], azure: ['Azure CDN image rules'], gcp: [], cloudflare: ['Images', 'Image Resizing'] },
      { name: 'Live Media Streaming (MoQ)', sub: 'Sub-second latency live video at scale', hint: 'Varies', desc: 'Media over QUIC for next-generation low-latency live media delivery. CF operates an open protocol relay network.', aws: ['MediaLive'], azure: ['Media Services Live'], gcp: ['Live Stream API'], cloudflare: ['MoQ'] },
      { name: 'WordPress Optimization', sub: 'Serve WordPress from the edge without complex caching config', hint: 'CF APO: $5/mo', desc: 'Automatic HTML caching and optimization for WordPress. Dramatically speeds up sites without configuration.', aws: [], azure: [], gcp: [], cloudflare: ['APO'] },
      { name: 'Site Performance', sub: 'Auto-optimize your site without touching code', hint: 'Included with CF plans', desc: 'Automatic optimizations at the edge - minifying, deferring scripts, early hints, HTTP/3, preloading. Speed Brain predicts which pages users will navigate to next.', aws: [], azure: [], gcp: [], cloudflare: ['Speed Brain', 'Early Hints', 'Auto Minify'] },
    ]
  },
  {
    category: 'Migration',
    intro: 'Tools for moving workloads from on-premises or other clouds. Cloudflare doesn\'t offer migration tools - their platform isn\'t a destination for VMs or traditional databases.',
    services: [
      { name: 'Database Migration', sub: 'Move databases between engines with minimal downtime', hint: 'Per hour (replication instance)', desc: 'Migrate databases between engines or from on-prem to cloud. Handles schema conversion and continuous replication.', aws: ['DMS'], azure: ['Database Migration Service'], gcp: ['Database Migration Service'], cloudflare: [] },
      { name: 'Server / VM Migration', sub: 'Move your on-prem servers to the cloud', hint: 'Free tools. Pay for destination', desc: 'Automated server/VM replication with cutover when ready.', aws: ['Application Migration Service'], azure: ['Azure Migrate'], gcp: ['Migrate to VMs'], cloudflare: [] },
    ]
  },
  {
    category: 'IoT, Web3 & Infrastructure',
    intro: 'Includes IoT platforms, blockchain gateways, branch office hardware, and specialized infrastructure services like public DNS resolvers, time synchronization, randomness beacons, and privacy protocols.',
    services: [
      { name: 'IoT Platform', sub: 'Connect and manage millions of devices', hint: 'Per message + per device', desc: 'Register and manage IoT devices with MQTT/HTTP messaging, device auth, and data processing rules. GCP IoT Core was deprecated in 2023.', aws: ['IoT Core'], azure: ['IoT Hub'], gcp: [], cloudflare: [] },
      { name: 'MQTT Messaging', sub: 'Lightweight pub-sub messaging for IoT devices', hint: 'Per message', desc: 'Managed MQTT broker for IoT communication. CF Pub/Sub provides MQTT at the edge integrated with Workers.', aws: ['IoT Core (MQTT)'], azure: ['Event Grid (MQTT)'], gcp: [], cloudflare: ['Pub/Sub'] },
      { name: 'Web3 / Blockchain Gateways', sub: 'Access Ethereum and IPFS without running your own nodes', hint: 'CF: free tier', desc: 'Gateways to decentralized networks (Ethereum, IPFS) for building Web3 apps without running blockchain infrastructure.', aws: ['Managed Blockchain'], azure: [], gcp: [], cloudflare: ['Web3 Gateways'] },
      { name: 'SASE Hardware Appliance', sub: 'Physical box for branch offices that routes through the cloud', hint: 'Enterprise hardware + subscription', desc: 'Hardware or virtual appliance for branch sites connecting to a Zero Trust / SASE platform. CF One Appliance routes all branch traffic through Cloudflare.', aws: ['Outposts'], azure: ['Azure Stack Edge'], gcp: ['Distributed Cloud Edge'], cloudflare: ['Cloudflare One Appliance'] },
      { name: 'Public DNS Resolver', sub: 'Fast, private DNS for everyone. 1.1.1.1.', hint: 'Free', desc: 'Public recursive DNS resolver for fast, private resolution. CF 1.1.1.1 is one of the fastest, with logs purged within 24 hours.', aws: [], azure: [], gcp: ['Google Public DNS (8.8.8.8)'], cloudflare: ['1.1.1.1'] },
      { name: 'Time Services', sub: 'Accurate clocks for distributed systems and TLS', hint: 'Free', desc: 'NTP, NTS, and Roughtime time synchronization. Accurate time is critical for TLS certificates, DNSSEC, and distributed systems.', aws: ['Amazon Time Sync Service'], azure: [], gcp: [], cloudflare: ['Time Services (NTP/NTS/Roughtime)'] },
      { name: 'Privacy Relay / Proxy', sub: 'Separates user identity from browsing activity', hint: 'Free infrastructure', desc: 'Privacy-preserving proxy protocols. CF Privacy Gateway (OHTTP) and Privacy Proxy (MASQUE) are used by Apple iCloud Private Relay and similar services.', aws: [], azure: [], gcp: [], cloudflare: ['Privacy Gateway', 'Privacy Proxy'] },
      { name: 'Randomness Beacon', sub: 'Provably fair random numbers for lotteries and crypto', hint: 'Free', desc: 'Distributed service providing publicly verifiable, unbiased randomness using the drand protocol.', aws: [], azure: [], gcp: [], cloudflare: ['Randomness Beacon (drand)'] },
      { name: 'Key Transparency', sub: 'Secure public key distribution for E2E encrypted messaging', hint: 'Free infrastructure', desc: 'Ensures encrypted messaging apps use real public keys and not an attacker\'s. CF Key Transparency Auditor serves messaging platforms.', aws: [], azure: [], gcp: [], cloudflare: ['Key Transparency Auditor'] },
    ]
  },
];

// --- UI State ---
let compact = false;
let providerFilter = null;
let allCollapsed = false;

// --- Rendering ---
function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function renderCell(services) {
  if (!services || !services.length) return '<span class="empty">-</span>';
  return services.map(s => `<span class="svc">${s}</span>`).join('');
}

function buildTOC() {
  document.getElementById('toc').innerHTML = DATA.map(c =>
    `<a href="#${slugify(c.category)}" class="toc-link">${c.category}</a>`
  ).join('');
}

function buildProviderFilters() {
  const el = document.getElementById('provider-filters');
  el.innerHTML = PROVIDERS.map(p =>
    `<button class="pf-btn active" data-provider="${p.id}" style="border-color:${p.color};color:${p.color};--bg:${p.color}" onclick="toggleProvider('${p.id}',this)">${p.name}</button>`
  ).join('');
}

function buildContent() {
  document.getElementById('content').innerHTML = DATA.map(cat => {
    const id = slugify(cat.category);
    const rows = cat.services.map(svc => {
      const cells = PROVIDERS.map(p =>
        `<td class="provider-cell" data-provider="${p.id}">${renderCell(svc[p.id])}</td>`
      ).join('');
      const searchText = [svc.name, svc.sub, svc.desc, ...PROVIDERS.flatMap(p => svc[p.id] || [])].join(' ').toLowerCase();
      const hintHTML = svc.hint ? `<span class="billing-hint">${svc.hint}</span>` : '';
      return `<tr data-search="${searchText}" ${PROVIDERS.map(p => `data-has-${p.id}="${(svc[p.id]||[]).length > 0}"`).join(' ')} onclick="this.classList.toggle('expanded')">
        <td>
          <div class="service-name">${svc.name} <span class="expand-indicator">&#9654;</span></div>
          <div class="service-sub">${svc.sub}</div>
          ${hintHTML}
          <div class="service-desc">${svc.desc}</div>
        </td>
        ${cells}
      </tr>`;
    }).join('');

    const headers = PROVIDERS.map(p =>
      `<th class="provider-col"><span class="provider-badge" style="background:${p.color}">${p.name}</span></th>`
    ).join('');
    const introHTML = cat.intro ? `<p class="category-intro">${cat.intro}</p>` : '';

    return `<section class="category" id="${id}">
      <div class="category-header" onclick="toggleCategory(this)">
        <span class="chevron">&#9660;</span>
        <h2>${cat.category}</h2>
      </div>
      ${introHTML}
      <table class="compare-table">
        <thead><tr><th>Service</th>${headers}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`;
  }).join('');
}

// --- Interactions ---
function toggleCategory(header) {
  header.closest('.category').classList.toggle('collapsed');
}

function toggleAllCategories() {
  allCollapsed = !allCollapsed;
  document.querySelectorAll('.category').forEach(s => s.classList.toggle('collapsed', allCollapsed));
  document.getElementById('expand-all').textContent = allCollapsed ? 'Expand all' : 'Collapse all';
}

let allExpanded = false;
function toggleExpandAll() {
  allExpanded = !allExpanded;
  document.querySelectorAll('.compare-table tbody tr').forEach(r => r.classList.toggle('expanded', allExpanded));
  document.getElementById('toggle-view').textContent = allExpanded ? 'Collapse descriptions' : 'Expand all descriptions';
}

function toggleProvider(id, btn) {
  btn.classList.toggle('active');
  applyFilters();
}

function applyFilters() {
  const activeProviders = [...document.querySelectorAll('.pf-btn.active')].map(b => b.dataset.provider);
  document.querySelectorAll('.compare-table tbody tr').forEach(row => {
    if (row.classList.contains('search-hidden')) return;
    if (activeProviders.length === PROVIDERS.length) {
      row.classList.remove('provider-hidden');
      return;
    }
    const hasAny = activeProviders.some(p => row.dataset[`has${p.charAt(0).toUpperCase()+p.slice(1)}`] === 'true');
    row.classList.toggle('provider-hidden', !hasAny);
  });
  updateCategoryVisibility();
}

function updateCategoryVisibility() {
  document.querySelectorAll('.category').forEach(section => {
    const visible = section.querySelectorAll('tbody tr:not(.hidden):not(.search-hidden):not(.provider-hidden)');
    section.classList.toggle('hidden', visible.length === 0);
  });
}

function setupSearch() {
  const input = document.getElementById('search');
  const counter = document.getElementById('search-count');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;
    document.querySelectorAll('.compare-table tbody tr').forEach(row => {
      const match = !q || row.getAttribute('data-search').includes(q);
      row.classList.toggle('search-hidden', !match);
      if (match && !row.classList.contains('provider-hidden')) visible++;
      if (match && q) highlightMatches(row, q); else clearHighlights(row);
    });
    updateCategoryVisibility();
    counter.textContent = q ? `${visible} result${visible !== 1 ? 's' : ''}` : '';
  });
}

function highlightMatches(row, q) {
  clearHighlights(row);
  const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const idx = node.textContent.toLowerCase().indexOf(q);
    if (idx === -1) return;
    const frag = document.createDocumentFragment();
    if (idx > 0) frag.appendChild(document.createTextNode(node.textContent.slice(0, idx)));
    const mark = document.createElement('mark');
    mark.textContent = node.textContent.slice(idx, idx + q.length);
    frag.appendChild(mark);
    const after = node.textContent.slice(idx + q.length);
    if (after) frag.appendChild(document.createTextNode(after));
    node.parentNode.replaceChild(frag, node);
  });
}

function clearHighlights(row) {
  row.querySelectorAll('mark').forEach(m => {
    m.parentNode.replaceChild(document.createTextNode(m.textContent), m);
    m.parentNode.normalize();
  });
}

// --- Init ---
buildTOC();
buildProviderFilters();
buildContent();
setupSearch();
document.getElementById('toggle-view').addEventListener('click', toggleExpandAll);
document.getElementById('expand-all').addEventListener('click', toggleAllCategories);

// Update sticky header offset
function updateStickyOffset() {
  const h = document.querySelector('.toolbar').offsetHeight;
  document.documentElement.style.setProperty('--toolbar-h', h + 'px');
  document.querySelectorAll('.compare-table thead th').forEach(th => th.style.top = h + 'px');
  document.querySelectorAll('.category-header').forEach(el => el.style.scrollMarginTop = (h + 8) + 'px');
}
updateStickyOffset();
window.addEventListener('resize', updateStickyOffset);
