import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Label",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Label variant="primary">Label primary</Label>
      <Label variant="secondary">Label secondary</Label>
      <Label variant="success">Label success</Label>
      <Label variant="warning">Label warning</Label>
      <Label variant="error">Label error</Label>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Label size="sm">Size sm</Label>
      <Label size="md">Size md</Label>
      <Label size="lg">Size lg</Label>
    </div>
  ),
};
