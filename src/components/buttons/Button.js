import React from "react"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"
import { darkerRed, donateColor } from "../../config/colors"
import { getTextContrastColor } from "../../utils/colors"
import chroma from "chroma-js"

const colors = {
  musicorum: darkerRed,
  donate: donateColor
}

const sizes = {
  small: tw`px-4`,
  normal: tw`px-4 py-2`,
  big: tw`px-4 py-2`
}

const ButtonWrapper = styled.button`
  ${tw`rounded-md transition flex items-center`}
  ${p => sizes[p.size]}
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  background: ${p => p.color};
  color: ${p => getTextContrastColor(p.color)};
  border: 3px solid transparent;

  &:hover {
    cursor: pointer;
    background: ${p => p.variant === "none" ? "rgba(255, 255, 255, 0.12)" : chroma(p.color).darken(.7).hex()};
  }

  &:focus {
    outline: none;
    background: ${p => p.variant === "none" ? "rgba(255, 255, 255, 0.09)" : chroma(p.color).darken().hex()};
    border: 3px solid ${p => p.variant === "none" ? "rgba(255, 255, 255, 0.2)" : chroma(p.color).brighten(.5).hex()};
  }
`

const IconWrapper = styled.div`
  margin-right: 4px;
  height: 24px;
  overflow: hidden;
`

export default function Button({ size, variant, color, children, icon, buttonStyle, ...other }) {
  const getColor = c => variant === "none" ? "rgba(0, 0, 0, 0)" : colors[c] || c

  return <ButtonWrapper {...other} variant={variant} color={getColor(color)} size={size} style={buttonStyle}>
    {
      icon
        ? <IconWrapper>{icon}</IconWrapper>
        : null
    }
    {children}
  </ButtonWrapper>
}

Button.propTypes = {
  size: PropTypes.oneOf(["small", "normal", "big"]),
  variant: PropTypes.oneOf(["filled", "none", "outlined"]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(["donate", "musicorum"])
  ]),
  icon: PropTypes.element
}

Button.defaultProps = {
  size: "normal",
  style: "filled",
  color: "musicorum"
}


