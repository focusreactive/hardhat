import React from 'react';
import { styled } from 'linaria/react';
import { tm } from '../../themes';

const A = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 28px;
  border-radius: 4px;
  width: fit-content;
  background: ${tm(({ colors }) => colors.accentBackground)};

  &[data-secondary='true'] {
    width: 100%;
    padding: 12px 0;
    border: 1px solid ${tm(({ colors }) => colors.neutral700)};
    text-align: center;
    background: transparent;
    transition: 0.3s;

    &:hover {
      border-color: ${tm(({ colors }) => colors.neutral100)};
      background-color: ${tm(({ colors }) => colors.neutral100)};
    }
  }
`;

type Props = React.PropsWithChildren<{ href: string; secondary: boolean }>;

const CTA = ({ children, href, secondary = false }: Props) => {
  return (
    <A data-secondary={secondary} href={href}>
      {children}
    </A>
  );
};

export default CTA;
