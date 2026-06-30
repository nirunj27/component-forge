import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "StatusBadge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <StatusBadge variant="primary">StatusBadge primary</StatusBadge>
      <StatusBadge variant="secondary">StatusBadge secondary</StatusBadge>
      <StatusBadge variant="success">StatusBadge success</StatusBadge>
      <StatusBadge variant="warning">StatusBadge warning</StatusBadge>
      <StatusBadge variant="error">StatusBadge error</StatusBadge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <StatusBadge size="sm">Size sm</StatusBadge>
      <StatusBadge size="md">Size md</StatusBadge>
      <StatusBadge size="lg">Size lg</StatusBadge>
    </div>
  ),
};
