import type { Meta, StoryObj } from "@storybook/react";
import { SecondaryButton } from "./SecondaryButton";

const meta: Meta<typeof SecondaryButton> = {
  title: "Components/SecondaryButton",
  component: SecondaryButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "SecondaryButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SecondaryButton variant="primary">SecondaryButton primary</SecondaryButton>
      <SecondaryButton variant="secondary">SecondaryButton secondary</SecondaryButton>
      <SecondaryButton variant="ghost">SecondaryButton ghost</SecondaryButton>
      <SecondaryButton variant="danger">SecondaryButton danger</SecondaryButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <SecondaryButton size="sm">Size sm</SecondaryButton>
      <SecondaryButton size="md">Size md</SecondaryButton>
      <SecondaryButton size="lg">Size lg</SecondaryButton>
    </div>
  ),
};
