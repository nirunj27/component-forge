import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Toast",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Toast variant="primary">Toast primary</Toast>
      <Toast variant="secondary">Toast secondary</Toast>
      <Toast variant="success">Toast success</Toast>
      <Toast variant="warning">Toast warning</Toast>
      <Toast variant="error">Toast error</Toast>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Toast size="sm">Size sm</Toast>
      <Toast size="md">Size md</Toast>
      <Toast size="lg">Size lg</Toast>
    </div>
  ),
};
