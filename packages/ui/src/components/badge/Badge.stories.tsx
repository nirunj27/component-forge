import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="primary">Badge primary</Badge>
      <Badge variant="secondary">Badge secondary</Badge>
      <Badge variant="success">Badge success</Badge>
      <Badge variant="warning">Badge warning</Badge>
      <Badge variant="error">Badge error</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Badge size="sm">Size sm</Badge>
      <Badge size="md">Size md</Badge>
      <Badge size="lg">Size lg</Badge>
    </div>
  ),
};
