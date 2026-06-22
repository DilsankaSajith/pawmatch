export const URGENCY = {
  options: [
    {
      label: 'Life in danger 💔',
      value: 'Urgent',
    },
    {
      label: 'Needs help ASAP 🚨',
      value: 'High',
    },
    {
      label: 'Keep an eye out 👀',
      value: 'Medium',
    },
    {
      label: 'No rush needed 🐢',
      value: 'Low',
    },
  ],
} as const;

export const HEALTH_CONDITION = {
  options: [
    {
      label: 'Happy & Healthy 🐾',
      value: 'Healthy',
    },
    {
      label: 'Getting Better 🌱',
      value: 'Recovering',
    },
    {
      label: 'Requires Attention 🤗',
      value: 'Critical',
    },
  ],
} as const;

export const ADOPTION_STATUS = {
  options: [
    {
      label: 'Available for Adoption 🏡',
      value: 'Ready',
    },
    {
      label: 'Pending Adoption 🕒',
      value: 'Pending',
    },
    {
      label: 'Adopted 🎉',
      value: 'Adopted',
    },
  ],
} as const;
