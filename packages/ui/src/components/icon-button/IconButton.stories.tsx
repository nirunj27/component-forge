import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "IconButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <IconButton variant="primary">IconButton primary</IconButton>
      <IconButton variant="secondary">IconButton secondary</IconButton>
      <IconButton variant="ghost">IconButton ghost</IconButton>
      <IconButton variant="danger">IconButton danger</IconButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <IconButton size="sm">Size sm</IconButton>
      <IconButton size="md">Size md</IconButton>
      <IconButton size="lg">Size lg</IconButton>
    </div>
  ),
};
