import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "./CommandPalette";

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  argTypes: {
    activeIndex: { control: "text" },
    collapsed: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {
  args: {
    activeIndex: 0,
    collapsed: false,
    children: "CommandPalette",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
