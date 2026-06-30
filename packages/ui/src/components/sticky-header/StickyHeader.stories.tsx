import type { Meta, StoryObj } from "@storybook/react";
import { StickyHeader } from "./StickyHeader";

const meta: Meta<typeof StickyHeader> = {
  title: "Components/StickyHeader",
  component: StickyHeader,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StickyHeader>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "StickyHeader",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <StickyHeader variant="default">StickyHeader default</StickyHeader>
      <StickyHeader variant="bordered">StickyHeader bordered</StickyHeader>
      <StickyHeader variant="striped">StickyHeader striped</StickyHeader>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
