import type { Meta, StoryObj } from "@storybook/react";
import { CartBadge } from "./CartBadge";

const meta: Meta<typeof CartBadge> = {
  title: "Components/CartBadge",
  component: CartBadge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof CartBadge>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "CartBadge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <CartBadge variant="primary">CartBadge primary</CartBadge>
      <CartBadge variant="secondary">CartBadge secondary</CartBadge>
      <CartBadge variant="success">CartBadge success</CartBadge>
      <CartBadge variant="warning">CartBadge warning</CartBadge>
      <CartBadge variant="error">CartBadge error</CartBadge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <CartBadge size="sm">Size sm</CartBadge>
      <CartBadge size="md">Size md</CartBadge>
      <CartBadge size="lg">Size lg</CartBadge>
    </div>
  ),
};
