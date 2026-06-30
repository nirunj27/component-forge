import type { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "ToggleButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ToggleButton variant="primary">ToggleButton primary</ToggleButton>
      <ToggleButton variant="secondary">ToggleButton secondary</ToggleButton>
      <ToggleButton variant="ghost">ToggleButton ghost</ToggleButton>
      <ToggleButton variant="danger">ToggleButton danger</ToggleButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <ToggleButton size="sm">Size sm</ToggleButton>
      <ToggleButton size="md">Size md</ToggleButton>
      <ToggleButton size="lg">Size lg</ToggleButton>
    </div>
  ),
};
