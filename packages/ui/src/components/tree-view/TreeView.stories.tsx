import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "TreeView",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <TreeView variant="default">TreeView default</TreeView>
      <TreeView variant="bordered">TreeView bordered</TreeView>
      <TreeView variant="striped">TreeView striped</TreeView>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
