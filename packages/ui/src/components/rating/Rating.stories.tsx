import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Rating",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Rating variant="primary">Rating primary</Rating>
      <Rating variant="secondary">Rating secondary</Rating>
      <Rating variant="success">Rating success</Rating>
      <Rating variant="warning">Rating warning</Rating>
      <Rating variant="error">Rating error</Rating>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Rating size="sm">Size sm</Rating>
      <Rating size="md">Size md</Rating>
      <Rating size="lg">Size lg</Rating>
    </div>
  ),
};
