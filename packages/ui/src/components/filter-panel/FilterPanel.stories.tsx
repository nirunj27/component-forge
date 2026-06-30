import type { Meta, StoryObj } from "@storybook/react";
import { FilterPanel } from "./FilterPanel";

const meta: Meta<typeof FilterPanel> = {
  title: "Components/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  argTypes: {
    query: { control: "text" },
    placeholder: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

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
