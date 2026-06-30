import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["elevated","outlined","flat"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "elevated",
    children: "Card",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Card variant="elevated">Card elevated</Card>
      <Card variant="outlined">Card outlined</Card>
      <Card variant="flat">Card flat</Card>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
