import React from "react";
import { styled } from "linaria/react";
import CookiePopUp from "./CookiePopUp";
import { GDPR } from "../config";

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 101;
`;

const useGDPR = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleAccept = () => {
    setIsOpen(false);
  };

  const handleReject = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleAccept,
    handleReject,
  };
};

type Props = {};

const GDPRNotice = (props: Props) => {
  const manageGDPR = useGDPR();

  if (!manageGDPR.isOpen) {
    return null;
  }

  return (
    <Container className="gdpr-notice">
      <CookiePopUp
        {...GDPR}
        onAccept={manageGDPR.handleAccept}
        onReject={manageGDPR.handleReject}
      />
    </Container>
  );
};

export default GDPRNotice;
