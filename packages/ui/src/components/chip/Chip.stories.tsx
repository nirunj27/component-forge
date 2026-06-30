import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    variant: "primary",
    disabled: false,
    children: "Chip",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Chip variant="primary">Chip primary</Chip>
      <Chip variant="secondary">Chip secondary</Chip>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
