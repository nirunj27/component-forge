import type { Meta, StoryObj } from "@storybook/react";
import { BackButton } from "./BackButton";

const meta: Meta<typeof BackButton> = {
  title: "Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "BackButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <BackButton variant="primary">BackButton primary</BackButton>
      <BackButton variant="secondary">BackButton secondary</BackButton>
      <BackButton variant="ghost">BackButton ghost</BackButton>
      <BackButton variant="danger">BackButton danger</BackButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <BackButton size="sm">Size sm</BackButton>
      <BackButton size="md">Size md</BackButton>
      <BackButton size="lg">Size lg</BackButton>
    </div>
  ),
};
