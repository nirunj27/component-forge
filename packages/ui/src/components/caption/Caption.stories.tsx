import type { Meta, StoryObj } from "@storybook/react";
import { Caption } from "./Caption";

const meta: Meta<typeof Caption> = {
  title: "Components/Caption",
  component: Caption,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Caption",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Caption variant="primary">Caption primary</Caption>
      <Caption variant="secondary">Caption secondary</Caption>
      <Caption variant="success">Caption success</Caption>
      <Caption variant="warning">Caption warning</Caption>
      <Caption variant="error">Caption error</Caption>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Caption size="sm">Size sm</Caption>
      <Caption size="md">Size md</Caption>
      <Caption size="lg">Size lg</Caption>
    </div>
  ),
};
