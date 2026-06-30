import type { Meta, StoryObj } from "@storybook/react";
import { ServerPagination } from "./ServerPagination";

const meta: Meta<typeof ServerPagination> = {
  title: "Components/ServerPagination",
  component: ServerPagination,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ServerPagination>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "ServerPagination",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ServerPagination variant="default">ServerPagination default</ServerPagination>
      <ServerPagination variant="bordered">ServerPagination bordered</ServerPagination>
      <ServerPagination variant="striped">ServerPagination striped</ServerPagination>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
