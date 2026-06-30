import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
  title: "Components/PriceDisplay",
  component: PriceDisplay,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "PriceDisplay",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <PriceDisplay variant="primary">PriceDisplay primary</PriceDisplay>
      <PriceDisplay variant="secondary">PriceDisplay secondary</PriceDisplay>
      <PriceDisplay variant="success">PriceDisplay success</PriceDisplay>
      <PriceDisplay variant="warning">PriceDisplay warning</PriceDisplay>
      <PriceDisplay variant="error">PriceDisplay error</PriceDisplay>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <PriceDisplay size="sm">Size sm</PriceDisplay>
      <PriceDisplay size="md">Size md</PriceDisplay>
      <PriceDisplay size="lg">Size lg</PriceDisplay>
    </div>
  ),
};
