import type { Meta, StoryObj } from "@storybook/react";
import { OtpVerification } from "./OtpVerification";

const meta: Meta<typeof OtpVerification> = {
  title: "Components/OtpVerification",
  component: OtpVerification,
  tags: ["autodocs"],
  argTypes: {
    code: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof OtpVerification>;

export const Default: Story = {
  args: {
    code: "",
    loading: false,
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
