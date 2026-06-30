import type { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from "./DropdownButton";

const meta: Meta<typeof DropdownButton> = {
  title: "Components/DropdownButton",
  component: DropdownButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "DropdownButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <DropdownButton variant="primary">DropdownButton primary</DropdownButton>
      <DropdownButton variant="secondary">DropdownButton secondary</DropdownButton>
      <DropdownButton variant="ghost">DropdownButton ghost</DropdownButton>
      <DropdownButton variant="danger">DropdownButton danger</DropdownButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <DropdownButton size="sm">Size sm</DropdownButton>
      <DropdownButton size="md">Size md</DropdownButton>
      <DropdownButton size="lg">Size lg</DropdownButton>
    </div>
  ),
};
