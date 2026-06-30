import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationChart } from "./OrganizationChart";

const meta: Meta<typeof OrganizationChart> = {
  title: "Components/OrganizationChart",
  component: OrganizationChart,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationChart>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "OrganizationChart",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
