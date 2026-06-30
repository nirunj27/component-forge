import type { Meta, StoryObj } from "@storybook/react";
import { SearchSuggestions } from "./SearchSuggestions";

const meta: Meta<typeof SearchSuggestions> = {
  title: "Components/SearchSuggestions",
  component: SearchSuggestions,
  tags: ["autodocs"],
  argTypes: {
    query: { control: "text" },
    placeholder: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchSuggestions>;

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
