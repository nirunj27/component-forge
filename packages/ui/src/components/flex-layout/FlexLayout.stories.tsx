import type { Meta, StoryObj } from "@storybook/react";
import { FlexLayout } from "./FlexLayout";

const meta: Meta<typeof FlexLayout> = {
  title: "Components/FlexLayout",
  component: FlexLayout,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof FlexLayout>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "FlexLayout",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <FlexLayout variant="default">FlexLayout default</FlexLayout>
      <FlexLayout variant="compact">FlexLayout compact</FlexLayout>
      <FlexLayout variant="spacious">FlexLayout spacious</FlexLayout>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
