import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from "./AutoComplete";

const meta: Meta<typeof AutoComplete> = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  argTypes: {
    query: { control: "text" },
    placeholder: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {
  args: {
    query: "",
    placeholder: "Search…",
    loading: false,
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
