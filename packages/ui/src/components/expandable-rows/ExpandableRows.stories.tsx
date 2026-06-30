import type { Meta, StoryObj } from "@storybook/react";
import { ExpandableRows } from "./ExpandableRows";

const meta: Meta<typeof ExpandableRows> = {
  title: "Components/ExpandableRows",
  component: ExpandableRows,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableRows>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "ExpandableRows",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ExpandableRows variant="default">ExpandableRows default</ExpandableRows>
      <ExpandableRows variant="bordered">ExpandableRows bordered</ExpandableRows>
      <ExpandableRows variant="striped">ExpandableRows striped</ExpandableRows>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
