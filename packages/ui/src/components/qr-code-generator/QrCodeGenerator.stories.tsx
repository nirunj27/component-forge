import type { Meta, StoryObj } from "@storybook/react";
import { QrCodeGenerator } from "./QrCodeGenerator";

const meta: Meta<typeof QrCodeGenerator> = {
  title: "Components/QrCodeGenerator",
  component: QrCodeGenerator,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof QrCodeGenerator>;

export const Default: Story = {
  args: {
    value: "",
    disabled: false,
    children: "QrCodeGenerator",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
