import type { Meta, StoryObj } from "@storybook/react";
import { FullPageLoader } from "./FullPageLoader";

const meta: Meta<typeof FullPageLoader> = {
  title: "Components/FullPageLoader",
  component: FullPageLoader,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof FullPageLoader>;

export const Default: Story = {
  args: {
    isOpen: false,
    children: "FullPageLoader",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
