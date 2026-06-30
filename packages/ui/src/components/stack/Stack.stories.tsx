import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Stack",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Stack variant="default">Stack default</Stack>
      <Stack variant="compact">Stack compact</Stack>
      <Stack variant="spacious">Stack spacious</Stack>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
