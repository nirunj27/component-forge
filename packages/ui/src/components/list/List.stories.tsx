import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "List",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <List variant="default">List default</List>
      <List variant="bordered">List bordered</List>
      <List variant="striped">List striped</List>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
