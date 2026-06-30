import type { Meta, StoryObj } from "@storybook/react";
import { WishlistButton } from "./WishlistButton";

const meta: Meta<typeof WishlistButton> = {
  title: "Components/WishlistButton",
  component: WishlistButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof WishlistButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "WishlistButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <WishlistButton variant="primary">WishlistButton primary</WishlistButton>
      <WishlistButton variant="secondary">WishlistButton secondary</WishlistButton>
      <WishlistButton variant="ghost">WishlistButton ghost</WishlistButton>
      <WishlistButton variant="danger">WishlistButton danger</WishlistButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <WishlistButton size="sm">Size sm</WishlistButton>
      <WishlistButton size="md">Size md</WishlistButton>
      <WishlistButton size="lg">Size lg</WishlistButton>
    </div>
  ),
};
