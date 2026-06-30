import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    price: { control: "text" },
    currency: { control: "text" },
    quantity: { control: "text" },
    inStock: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    price: 0,
    currency: "USD",
    quantity: 1,
    inStock: true,
    children: "ProductCard",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
