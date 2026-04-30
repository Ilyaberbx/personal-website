import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', level: 5 },
      { name: 'C#', level: 5 },
      { name: 'JavaScript', level: 5 },
      { name: 'Solidity', level: 4 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 5 },
      { name: 'Nest.js', level: 4 },
      { name: 'Next.js', level: 4 },
      { name: 'ASP.NET / .NET Core', level: 4 },
      { name: 'REST & WebSockets', level: 5 },
      { name: 'JWT auth', level: 5 },
    ],
  },
  {
    category: 'Web3',
    items: [
      { name: 'Solidity (ERC-20/721, EIP-712)', level: 4 },
      { name: 'ECDSA · Merkle · ZK proofs', level: 4 },
      { name: 'ethers.js / viem / wagmi', level: 5 },
      { name: 'Privy / Turnkey / WalletConnect', level: 4 },
    ],
  },
  {
    category: 'Data',
    items: [
      { name: 'PostgreSQL', level: 5 },
      { name: 'MS SQL', level: 4 },
      { name: 'ClickHouse', level: 4 },
      { name: 'Redis', level: 4 },
      { name: 'DynamoDB', level: 3 },
      { name: 'Kafka · RabbitMQ', level: 3 },
    ],
  },
  {
    category: 'Cloud / DevOps',
    items: [
      { name: 'AWS (CDK)', level: 4 },
      { name: 'Microsoft Azure', level: 4 },
      { name: 'GitHub Actions CI/CD', level: 5 },
      { name: 'Docker', level: 3 },
      { name: 'DigitalOcean', level: 4 },
    ],
  },
  {
    category: 'Tooling & Mobile',
    items: [
      { name: 'React Native / Expo', level: 4 },
      { name: 'Grafana · PagerDuty', level: 4 },
      { name: 'Git · Postman · Swagger', level: 5 },
      { name: 'Jira · Confluence', level: 4 },
    ],
  },
]
