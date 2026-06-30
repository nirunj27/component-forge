import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPassword } from "./ForgotPassword";

const meta: Meta<typeof ForgotPassword> = {
  title: "Components/ForgotPassword",
  component: ForgotPassword,
  tags: ["autodocs"],
  argTypes: {
    email: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPassword>;

export const Default: Story = {
  args: {
    email: "",
    loading: false,
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
