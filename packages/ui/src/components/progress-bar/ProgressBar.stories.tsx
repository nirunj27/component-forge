import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "ProgressBar",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ProgressBar variant="primary">ProgressBar primary</ProgressBar>
      <ProgressBar variant="secondary">ProgressBar secondary</ProgressBar>
      <ProgressBar variant="success">ProgressBar success</ProgressBar>
      <ProgressBar variant="warning">ProgressBar warning</ProgressBar>
      <ProgressBar variant="error">ProgressBar error</ProgressBar>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <ProgressBar size="sm">Size sm</ProgressBar>
      <ProgressBar size="md">Size md</ProgressBar>
      <ProgressBar size="lg">Size lg</ProgressBar>
    </div>
  ),
};
