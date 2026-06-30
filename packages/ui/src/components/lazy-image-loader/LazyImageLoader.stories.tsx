import type { Meta, StoryObj } from "@storybook/react";
import { LazyImageLoader } from "./LazyImageLoader";

const meta: Meta<typeof LazyImageLoader> = {
  title: "Components/LazyImageLoader",
  component: LazyImageLoader,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LazyImageLoader>;

export const Default: Story = {
  args: {
    loading: false,
    children: "LazyImageLoader",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
