import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "./SplitButton";

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "SplitButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SplitButton variant="primary">SplitButton primary</SplitButton>
      <SplitButton variant="secondary">SplitButton secondary</SplitButton>
      <SplitButton variant="ghost">SplitButton ghost</SplitButton>
      <SplitButton variant="danger">SplitButton danger</SplitButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <SplitButton size="sm">Size sm</SplitButton>
      <SplitButton size="md">Size md</SplitButton>
      <SplitButton size="lg">Size lg</SplitButton>
    </div>
  ),
};
