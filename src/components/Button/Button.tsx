import React from "react";
import styled from "styled-components";
import { ButtonAppearanceEnum, IButtonProps } from "./types";

const CustomButton = (props: IButtonProps) => {
  const { url, target, text, appearance } = props;

  if (url) {
    return (
      <Link {...props} as="a" href={url} target={`${target || "_blank"}`}>
        {appearance === "primary-black" ? (
          <Text appearance={appearance}>{text}</Text>
        ) : (
          text
        )}
      </Link>
    );
  }

  return (
    <Button {...props}>
      <Text appearance={appearance}>{text}</Text>
    </Button>
  );
};

CustomButton.defaultProps = {
  appearance: ButtonAppearanceEnum.primaryGold,
};

export default CustomButton;

const Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  font-weight: 400;
  cursor: pointer;
  outline: none;
  
  transition: all ${({ theme }) => theme.transition};
  background: ${({ theme, appearance }) => theme.button[appearance].background};
  background-color: ${({ theme, appearance }) =>
    theme.button[appearance].backgroundColor};
  color: ${({ theme, appearance }) => theme.button[appearance].color};
  padding: ${({ theme, appearance }) => theme.button[appearance].padding};
  font-size: ${({ theme, appearance }) => theme.button[appearance].fontSize};
  border-radius: ${({ theme, appearance }) =>
    theme.button[appearance].borderRadius};
  border: ${({ theme, appearance }) => theme.button[appearance].border};
  border-top: ${({ theme, appearance }) => theme.button[appearance].borderTop};
  border-left: ${({ theme, appearance }) =>
    theme.button[appearance].borderLeft};
  border-right: ${({ theme, appearance }) =>
    theme.button[appearance].borderRight};
  border-bottom: ${({ theme, appearance }) =>
    theme.button[appearance].borderBottom};

  :hover {
    box-shadow: ${({ theme, appearance }) =>
      theme.button[appearance].hoverBoxShadow}
`;

const Link = styled(Button)`
  text-decoration: none;
  font-family: Roboto;

  :hover {
    color: ${({ theme, appearance }) => theme.button[appearance].color};
  }
`;

const Text = styled.span<{ appearance: ButtonAppearanceEnum }>`
  color: ${({ theme, appearance }) =>
    appearance === "primary-black"
      ? "transparent"
      : theme.button[appearance].color};
  -webkit-background-clip: text;
  background-image: linear-gradient(119.69deg, #f4f0ae -0.51%, #e79f4b 104.63%);
  font-family: Roboto;
`;
