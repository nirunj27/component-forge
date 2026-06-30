import type { Meta, StoryObj } from "@storybook/react";
import { VirtualizedTable } from "./VirtualizedTable";

const meta: Meta<typeof VirtualizedTable> = {
  title: "Components/VirtualizedTable",
  component: VirtualizedTable,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualizedTable>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "VirtualizedTable",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <VirtualizedTable variant="default">VirtualizedTable default</VirtualizedTable>
      <VirtualizedTable variant="bordered">VirtualizedTable bordered</VirtualizedTable>
      <VirtualizedTable variant="striped">VirtualizedTable striped</VirtualizedTable>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
