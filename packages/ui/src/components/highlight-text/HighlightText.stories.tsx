import type { Meta, StoryObj } from "@storybook/react";
import { HighlightText } from "./HighlightText";

const meta: Meta<typeof HighlightText> = {
  title: "Components/HighlightText",
  component: HighlightText,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof HighlightText>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "HighlightText",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <HighlightText variant="primary">HighlightText primary</HighlightText>
      <HighlightText variant="secondary">HighlightText secondary</HighlightText>
      <HighlightText variant="success">HighlightText success</HighlightText>
      <HighlightText variant="warning">HighlightText warning</HighlightText>
      <HighlightText variant="error">HighlightText error</HighlightText>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <HighlightText size="sm">Size sm</HighlightText>
      <HighlightText size="md">Size md</HighlightText>
      <HighlightText size="lg">Size lg</HighlightText>
    </div>
  ),
};
