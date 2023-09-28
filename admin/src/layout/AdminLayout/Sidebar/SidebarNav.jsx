import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faFileLines,
  faStar,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBug,
  faCalculator,
  faChartPie,
  faChevronUp,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionContext,
  Badge,
  Button,
  Nav,
  useAccordionButton,
} from "react-bootstrap";
import classNames from "classnames";
import Link from "next/link";

const SidebarNavItem = (props) => {
  const { icon, children, href } = props;

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? (
            <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const SidebarNavTitle = (props) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

const SidebarNavGroupToggle = (props) => {
  // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
  const { activeEventKey } = useContext(AccordionContext);
  const { eventKey, icon, children, setIsShow } = props;

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  useEffect(() => {
    setIsShow(activeEventKey === eventKey);
  }, [activeEventKey, eventKey, setIsShow]);

  return (
    <Button
      variant="link"
      type="button"
      className={classNames(
        "rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none",
        {
          collapsed: !isCurrentEventKey,
        }
      )}
      onClick={decoratedOnClick}
    >
      <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
      {children}
      <div className="nav-chevron ms-auto text-end">
        <FontAwesomeIcon size="xs" icon={faChevronUp} />
      </div>
    </Button>
  );
};

const SidebarNavGroup = (props) => {
  const { toggleIcon, toggleText, children } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      as="li"
      bsPrefix="nav-group"
      className={classNames({ show: isShow })}
    >
      <SidebarNavGroupToggle
        icon={toggleIcon}
        eventKey="0"
        setIsShow={setIsShow}
      >
        {toggleText}
      </SidebarNavGroupToggle>
      <Accordion.Collapse eventKey="0">
        <ul className="nav-group-items list-unstyled">{children}</ul>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={faPuzzlePiece} href="/services">
        Manage Services
      </SidebarNavItem>
      <SidebarNavItem icon={faPuzzlePiece} href="/overview">
        Manage Overview
      </SidebarNavItem>
      <SidebarNavItem icon={faPuzzlePiece} href="/what-include">
        Manage What Include
      </SidebarNavItem>
      <SidebarNavItem icon={faPuzzlePiece} href="/blog">
        Manage Blog
      </SidebarNavItem>
      {/* 
            <SidebarNavGroup toggleIcon={faStar} toggleText="Pages">
                <SidebarNavItem icon={faRightToBracket} href="login">
                    Login
                </SidebarNavItem>
                <SidebarNavItem icon={faAddressCard} href="register">
                    Register
                </SidebarNavItem>
            
            </SidebarNavGroup> */}
    </ul>
  );
}
