import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "Avatar",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Avatar variant="default">Avatar default</Avatar>
      <Avatar variant="bordered">Avatar bordered</Avatar>
      <Avatar variant="striped">Avatar striped</Avatar>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
