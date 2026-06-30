import type { Meta, StoryObj } from "@storybook/react";
import { SocialLoginButtons } from "./SocialLoginButtons";

const meta: Meta<typeof SocialLoginButtons> = {
  title: "Components/SocialLoginButtons",
  component: SocialLoginButtons,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButtons>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "SocialLoginButtons",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SocialLoginButtons variant="primary">SocialLoginButtons primary</SocialLoginButtons>
      <SocialLoginButtons variant="secondary">SocialLoginButtons secondary</SocialLoginButtons>
      <SocialLoginButtons variant="ghost">SocialLoginButtons ghost</SocialLoginButtons>
      <SocialLoginButtons variant="danger">SocialLoginButtons danger</SocialLoginButtons>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <SocialLoginButtons size="sm">Size sm</SocialLoginButtons>
      <SocialLoginButtons size="md">Size md</SocialLoginButtons>
      <SocialLoginButtons size="lg">Size lg</SocialLoginButtons>
    </div>
  ),
};
