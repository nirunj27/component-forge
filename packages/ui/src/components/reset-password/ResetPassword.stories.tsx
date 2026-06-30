import type { Meta, StoryObj } from "@storybook/react";
import { ResetPassword } from "./ResetPassword";

const meta: Meta<typeof ResetPassword> = {
  title: "Components/ResetPassword",
  component: ResetPassword,
  tags: ["autodocs"],
  argTypes: {
    password: { control: "text" },
    confirmPassword: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ResetPassword>;

export const Default: Story = {
  args: {
    password: "",
    confirmPassword: "",
    loading: false,
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
