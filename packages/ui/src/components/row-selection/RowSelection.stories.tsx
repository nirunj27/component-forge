import type { Meta, StoryObj } from "@storybook/react";
import { RowSelection } from "./RowSelection";

const meta: Meta<typeof RowSelection> = {
  title: "Components/RowSelection",
  component: RowSelection,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RowSelection>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "RowSelection",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <RowSelection variant="default">RowSelection default</RowSelection>
      <RowSelection variant="bordered">RowSelection bordered</RowSelection>
      <RowSelection variant="striped">RowSelection striped</RowSelection>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
