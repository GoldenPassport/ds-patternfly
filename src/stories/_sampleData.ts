export interface ProcessInstance {
  id: string;
  name: string;
  status: "Running" | "Completed" | "Suspended" | "Aborted";
  startedAt: string;
  description: string;
}

export const processInstances: ProcessInstance[] = [
  {
    id: "PI-1001",
    name: "Loan approval — A. Tanaka",
    status: "Running",
    startedAt: "2026-05-08 09:14",
    description:
      "Awaiting credit-bureau response. Last touched by underwriter L. Wong.",
  },
  {
    id: "PI-1002",
    name: "Customer onboarding — Acme Corp",
    status: "Suspended",
    startedAt: "2026-05-07 16:02",
    description: "Suspended pending KYC document upload.",
  },
  {
    id: "PI-1003",
    name: "Invoice dispute — INV-88421",
    status: "Completed",
    startedAt: "2026-05-06 10:48",
    description: "Resolved with partial credit; closed by R. Patel.",
  },
  {
    id: "PI-1004",
    name: "Vendor onboarding — Helios Ltd",
    status: "Running",
    startedAt: "2026-05-09 08:00",
    description: "In compliance review.",
  },
  {
    id: "PI-1005",
    name: "Refund request — ORD-55102",
    status: "Aborted",
    startedAt: "2026-05-05 14:21",
    description: "Aborted: duplicate of PI-1006.",
  },
];
