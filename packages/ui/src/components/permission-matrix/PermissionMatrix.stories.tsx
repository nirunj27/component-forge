import type { Meta, StoryObj } from "@storybook/react";
import { PermissionMatrix } from "./PermissionMatrix";

const meta: Meta<typeof PermissionMatrix> = {
  title: "Components/PermissionMatrix",
  component: PermissionMatrix,
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: ["active","inactive","pending"] },
    role: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof PermissionMatrix>;

export const Default: Story = {
  args: {
    status: "active",
    children: "PermissionMatrix",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
