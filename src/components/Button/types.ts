import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export enum ButtonAppearanceEnum {
  primaryGold = "primary-gold",
  primaryBlack = "primary-black",
  secondary = "secondary",
  gradient = "gradient",
}

export enum ButtonSizeEnum {
  small = "small",
  middle = "middle",
  large = "large",
}

export interface IButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<any>> {
  appearance?: ButtonAppearanceEnum;
  size?: ButtonSizeEnum;
  block?: boolean;
  url?: string;
  target?: string;
  text?: string;
}
