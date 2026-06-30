import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from "./PrimaryButton";

const meta: Meta<typeof PrimaryButton> = {
  title: "Components/PrimaryButton",
  component: PrimaryButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "PrimaryButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <PrimaryButton variant="primary">PrimaryButton primary</PrimaryButton>
      <PrimaryButton variant="secondary">PrimaryButton secondary</PrimaryButton>
      <PrimaryButton variant="ghost">PrimaryButton ghost</PrimaryButton>
      <PrimaryButton variant="danger">PrimaryButton danger</PrimaryButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <PrimaryButton size="sm">Size sm</PrimaryButton>
      <PrimaryButton size="md">Size md</PrimaryButton>
      <PrimaryButton size="lg">Size lg</PrimaryButton>
    </div>
  ),
};
