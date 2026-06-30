import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScrollTable } from "./InfiniteScrollTable";

const meta: Meta<typeof InfiniteScrollTable> = {
  title: "Components/InfiniteScrollTable",
  component: InfiniteScrollTable,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteScrollTable>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "InfiniteScrollTable",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <InfiniteScrollTable variant="default">InfiniteScrollTable default</InfiniteScrollTable>
      <InfiniteScrollTable variant="bordered">InfiniteScrollTable bordered</InfiniteScrollTable>
      <InfiniteScrollTable variant="striped">InfiniteScrollTable striped</InfiniteScrollTable>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
