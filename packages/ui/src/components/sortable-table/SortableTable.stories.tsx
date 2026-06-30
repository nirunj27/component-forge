import type { Meta, StoryObj } from "@storybook/react";
import { SortableTable } from "./SortableTable";

const meta: Meta<typeof SortableTable> = {
  title: "Components/SortableTable",
  component: SortableTable,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SortableTable>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "SortableTable",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SortableTable variant="default">SortableTable default</SortableTable>
      <SortableTable variant="bordered">SortableTable bordered</SortableTable>
      <SortableTable variant="striped">SortableTable striped</SortableTable>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
