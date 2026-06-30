import type { Meta, StoryObj } from "@storybook/react";
import { RecentSearches } from "./RecentSearches";

const meta: Meta<typeof RecentSearches> = {
  title: "Components/RecentSearches",
  component: RecentSearches,
  tags: ["autodocs"],
  argTypes: {
    query: { control: "text" },
    placeholder: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RecentSearches>;

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
