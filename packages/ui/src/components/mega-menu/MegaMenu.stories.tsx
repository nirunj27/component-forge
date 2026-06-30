import type { Meta, StoryObj } from "@storybook/react";
import { MegaMenu } from "./MegaMenu";

const meta: Meta<typeof MegaMenu> = {
  title: "Components/MegaMenu",
  component: MegaMenu,
  tags: ["autodocs"],
  argTypes: {
    activeIndex: { control: "text" },
    collapsed: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MegaMenu>;

export const Default: Story = {
  args: {
    activeIndex: 0,
    collapsed: false,
    children: "MegaMenu",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
