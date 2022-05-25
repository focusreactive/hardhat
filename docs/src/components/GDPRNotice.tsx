import React from "react";
import { styled } from "linaria/react";
import CookiePopUp from "./CookiePopUp";
import { GDPR } from "../config";
import { loadAnalyticsScript } from "./GDPRNotice.model";

enum gdprStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  UNKNOWN = "unknown",
}

const ITEM_KEY = "GDPR_ACCEPTED";

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 101;
`;

const useGDPR = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const acceptedStatus = (localStorage.getItem(ITEM_KEY) ||
      gdprStatus.UNKNOWN) as gdprStatus;
    if (acceptedStatus === gdprStatus.UNKNOWN) {
      setIsOpen(true);
    }
    if (acceptedStatus === gdprStatus.ACCEPTED) {
      loadAnalyticsScript();
    }
  });

  const handleAccept = () => {
    localStorage.setItem(ITEM_KEY, gdprStatus.ACCEPTED);
    setIsOpen(false);
    loadAnalyticsScript();
  };

  const handleReject = () => {
    localStorage.setItem(ITEM_KEY, gdprStatus.REJECTED);
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
