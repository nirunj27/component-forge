import type { Meta, StoryObj } from "@storybook/react";
import { ProductGallery } from "./ProductGallery";

const meta: Meta<typeof ProductGallery> = {
  title: "Components/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

export const Default: Story = {
  args: {
    loading: false,
    children: "ProductGallery",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
