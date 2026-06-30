import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Alert",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Alert variant="primary">Alert primary</Alert>
      <Alert variant="secondary">Alert secondary</Alert>
      <Alert variant="success">Alert success</Alert>
      <Alert variant="warning">Alert warning</Alert>
      <Alert variant="error">Alert error</Alert>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Alert size="sm">Size sm</Alert>
      <Alert size="md">Size md</Alert>
      <Alert size="lg">Size lg</Alert>
    </div>
  ),
};
