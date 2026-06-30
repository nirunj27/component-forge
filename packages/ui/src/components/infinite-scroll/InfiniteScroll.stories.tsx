import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll } from "./InfiniteScroll";

const meta: Meta<typeof InfiniteScroll> = {
  title: "Components/InfiniteScroll",
  component: InfiniteScroll,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

export const Default: Story = {
  args: {
    value: "",
    disabled: false,
    children: "InfiniteScroll",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
