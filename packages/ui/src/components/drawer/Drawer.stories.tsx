import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    isOpen: false,
    children: "Drawer",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
