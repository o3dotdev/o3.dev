"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { codeRepositoryUrl } from "../_components/site-shell";

const suggestions = [
  "npm install -g @o3dotdev/code && o3-code",
  "Unify O3 Code versioning across npm, launcher UI, and upstream Codex build",
  "Make npm publish smoke-test a real background O3 Code launch",
];

const permissionOptions = ["Auto-review", "Full access"];
const effortOptions = ["Low", "Medium", "High", "Extra High"];
const modelOptions = [
  "GPT-5.5",
  "GPT-5.4",
  "GPT-5.4-Mini",
  "GPT-5.3-Codex",
  "GPT-5.3-Codex-Spark",
  "GPT-5.2",
];
const speedOptions = [
  {
    description: "Default speed",
    label: "Standard",
  },
  {
    description: "1.5x speed, increased usage",
    label: "Fast",
  },
];
const pluginOptions = [
  { icon: "documents", label: "Documents" },
  { icon: "spreadsheets", label: "Spreadsheets" },
  { icon: "presentations", label: "Presentations" },
  { icon: "browser", label: "Browser" },
  { icon: "chrome", label: "Chrome" },
  { icon: "computer", label: "Computer" },
  { icon: "calendar", label: "Google Calendar" },
  { icon: "gmail", label: "Gmail" },
  { icon: "slack", label: "Slack" },
  { icon: "github", label: "GitHub" },
];
const projectOptions = ["o3-code"];
const locationOptions = ["Work locally"];
const branchOptions = ["main"];

type MenuId =
  | "attach"
  | "permissions"
  | "effort"
  | "project"
  | "location"
  | "branch";

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 4.25v11.5M4.25 10h11.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 2.9 4.25 5.05v4.32c0 3.57 2.28 6.74 5.75 7.73 3.47-.99 5.75-4.16 5.75-7.73V5.05L10 2.9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
      <path
        d="M10 6.25v4.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <path
        d="M10 13.2h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 15.25V4.75m0 0-4.25 4.25M10 4.75l4.25 4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 3.25a2.75 2.75 0 0 0-2.75 2.75v4a2.75 2.75 0 1 0 5.5 0V6A2.75 2.75 0 0 0 10 3.25Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M4.75 9.5v.5a5.25 5.25 0 0 0 10.5 0v-.5M10 15.25v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m5.5 7.75 4.5 4.5 4.5-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="o3-code-chevron-right h-5 w-5 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m7.75 4.5 5.5 5.5-5.5 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m4.75 10.5 3.5 3.5 7-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m10.85 2.75-6.1 8.05h4.7l-.3 6.45 6.1-8.05h-4.7l.3-6.45Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M7.1 10.45 10.85 6.7a2.55 2.55 0 1 1 3.6 3.61l-5.1 5.1a4.25 4.25 0 0 1-6.01-6.01l5.3-5.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function PlanModeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M8.25 6.25h7M8.25 13.75h7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <path
        d="m3.75 6.25.95.95 1.8-2.15M3.75 13.75h2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function GoalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 17.25a7.25 7.25 0 1 0-7.25-7.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <path
        d="M10 13.75A3.75 3.75 0 1 0 6.25 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <path
        d="m3 12.75-.25-3.2 3.2-.25M10 10l4.25-4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function PluginsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <circle cx="6" cy="6" r="2.1" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="14" cy="6" r="2.1" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="6" cy="14" r="2.1" stroke="currentColor" strokeWidth="1.35" />
      <circle
        cx="14"
        cy="14"
        r="2.1"
        stroke="currentColor"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function PluginIcon({ icon }: Readonly<{ icon: string }>) {
  if (icon === "browser") {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className="o3-code-plugin-icon"
        height={16}
        src="/plugin-icons/browser.png"
        width={16}
      />
    );
  }

  if (icon === "chrome") {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className="o3-code-plugin-icon"
        height={16}
        src="/plugin-icons/google-chrome.png"
        width={16}
      />
    );
  }

  if (icon === "computer") {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className="o3-code-plugin-icon"
        height={16}
        src="/plugin-icons/computer-use.png"
        width={16}
      />
    );
  }

  if (icon === "documents") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M3.6001 3.6C3.6001 2.71634 4.31644 2 5.2001 2H11.6001L16.4001 6.8V16.4C16.4001 17.2837 15.6838 18 14.8001 18H5.2001C4.31644 18 3.6001 17.2837 3.6001 16.4V3.6Z"
          fill="#4285F4"
        />
        <path
          d="M11.6001 2L16.4001 6.8H13.2001C12.3164 6.8 11.6001 6.08366 11.6001 5.2V2Z"
          fill="#1967D2"
        />
        <path
          d="M6.80029 11.4C6.80029 11.2895 6.88984 11.2 7.00029 11.2H13.0003C13.1108 11.2 13.2003 11.2895 13.2003 11.4V12.2C13.2003 12.3104 13.1108 12.4 13.0003 12.4H7.00029C6.88984 12.4 6.80029 12.3104 6.80029 12.2V11.4ZM6.80029 13.8C6.80029 13.6895 6.88984 13.6 7.00029 13.6H11.4003C11.5108 13.6 11.6003 13.6895 11.6003 13.8V14.6C11.6003 14.7104 11.5107 14.8 11.4003 14.8H7.00029C6.88984 14.8 6.80029 14.7104 6.80029 14.6V13.8Z"
          fill="white"
        />
        <path
          d="M6.80029 8.99999C6.80029 8.88953 6.88984 8.79999 7.00029 8.79999H13.0003C13.1108 8.79999 13.2003 8.88953 13.2003 8.99999V9.79999C13.2003 9.91044 13.1108 9.99999 13.0003 9.99999H7.00029C6.88984 9.99999 6.80029 9.91044 6.80029 9.79999V8.99999Z"
          fill="white"
        />
      </svg>
    );
  }

  if (icon === "spreadsheets") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M3.6001 3.6C3.6001 2.71634 4.31644 2 5.2001 2H11.6001L16.4001 6.8V16.4C16.4001 17.2837 15.6838 18 14.8001 18H5.2001C4.31644 18 3.6001 17.2837 3.6001 16.4V3.6Z"
          fill="#34A853"
        />
        <path
          d="M11.6001 2L16.4001 6.8H13.2001C12.3164 6.8 11.6001 6.08366 11.6001 5.2V2Z"
          fill="#188038"
        />
        <path
          d="M6.40049 8.79999C6.17957 8.79999 6.00049 8.97907 6.00049 9.19999V14.4C6.00049 14.6209 6.17957 14.8 6.40049 14.8H13.6005C13.8214 14.8 14.0005 14.6209 14.0005 14.4V9.19999C14.0005 8.97907 13.8214 8.79999 13.6005 8.79999H6.40049ZM9.40049 13.6H7.20049V12.2L9.40049 12.2V13.6ZM9.40049 11.4H7.20049V9.99999H9.40049V11.4ZM12.8005 13.6H10.6005V12.2L12.8005 12.2V13.6ZM12.8005 11.4H10.6005V9.99999H12.8005V11.4Z"
          fill="white"
        />
      </svg>
    );
  }

  if (icon === "presentations") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M3.6001 3.6C3.6001 2.71634 4.31644 2 5.2001 2H11.6001L16.4001 6.8V16.4C16.4001 17.2837 15.6838 18 14.8001 18H5.2001C4.31644 18 3.6001 17.2837 3.6001 16.4V3.6Z"
          fill="#F4B400"
        />
        <path
          d="M11.6001 2L16.4001 6.8H13.2001C12.3164 6.8 11.6001 6.08366 11.6001 5.2V2Z"
          fill="#9D7607"
        />
        <path
          clipRule="evenodd"
          d="M6.00049 9.39999C6.00049 9.06862 6.26912 8.79999 6.60049 8.79999H13.4005C13.7319 8.79999 14.0005 9.06862 14.0005 9.39999V14.2C14.0005 14.5314 13.7319 14.8 13.4005 14.8H6.60049C6.26912 14.8 6.00049 14.5314 6.00049 14.2V9.39999ZM7.20049 10.4V13.2H12.8005V10.4H7.20049Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M13.8579 6.14215H6.14209V13.8579H13.8579V6.14215Z"
          fill="white"
        />
        <path
          d="M13.8579 17.33L17.33 13.8579L15.5939 13.5617L13.8579 13.8579L13.541 15.4459L13.8579 17.33Z"
          fill="#EA4335"
        />
        <path
          d="M2.66992 13.8579V16.1727C2.66992 16.8121 3.18784 17.33 3.82729 17.33H6.14204L6.49852 15.594L6.14204 13.8579L4.25041 13.5617L2.66992 13.8579Z"
          fill="#188038"
        />
        <path
          d="M17.33 6.1421V3.82735C17.33 3.18791 16.8121 2.66998 16.1726 2.66998H13.8579C13.6466 3.53102 13.541 4.16468 13.541 4.57097C13.541 4.97724 13.6466 5.50094 13.8579 6.1421C14.6258 6.36198 15.2045 6.47193 15.5939 6.47193C15.9834 6.47193 16.5621 6.36198 17.33 6.1421Z"
          fill="#1967D2"
        />
        <path
          d="M17.33 6.14215H13.8579V13.8579H17.33V6.14215Z"
          fill="#FBBC04"
        />
        <path
          d="M13.8579 13.8578H6.14209V17.33H13.8579V13.8578Z"
          fill="#34A853"
        />
        <path
          d="M13.8578 2.66998H3.82729C3.18784 2.66998 2.66992 3.18791 2.66992 3.82735V13.8579H6.14204V6.1421H13.8578V2.66998Z"
          fill="#4285F4"
        />
        <path
          d="M7.72445 12.1277C7.43608 11.9328 7.23642 11.6483 7.12744 11.2722L7.7968 10.9963C7.85756 11.2278 7.96364 11.4072 8.11506 11.5345C8.26553 11.6618 8.44878 11.7245 8.66289 11.7245C8.88182 11.7245 9.06989 11.658 9.2271 11.5249C9.38432 11.3918 9.46341 11.222 9.46341 11.0166C9.46341 10.8063 9.38045 10.6347 9.21456 10.5016C9.04868 10.3685 8.84035 10.3019 8.59151 10.3019H8.20477V9.63932H8.55197C8.76609 9.63932 8.94644 9.58146 9.09304 9.46572C9.23964 9.34998 9.31294 9.19181 9.31294 8.99024C9.31294 8.81084 9.24736 8.66809 9.1162 8.56104C8.98502 8.45399 8.81913 8.39997 8.61755 8.39997C8.4208 8.39997 8.26456 8.45206 8.14882 8.55719C8.03317 8.66259 7.9462 8.79568 7.89613 8.94393L7.23354 8.66809C7.3213 8.41926 7.48237 8.19936 7.71866 8.00936C7.95497 7.81935 8.25684 7.72388 8.62334 7.72388C8.89436 7.72388 9.13837 7.77597 9.35442 7.88108C9.57046 7.98621 9.7402 8.13185 9.86269 8.31703C9.98518 8.50317 10.0459 8.71149 10.0459 8.94297C10.0459 9.17927 9.98904 9.37891 9.87523 9.54287C9.76142 9.70683 9.62158 9.83222 9.45569 9.91999V9.95953C9.66989 10.0478 9.85595 10.1929 9.99386 10.3791C10.1337 10.5672 10.2041 10.7919 10.2041 11.0542C10.2041 11.3165 10.1376 11.5509 10.0045 11.7563C9.87137 11.9618 9.68716 12.1238 9.45375 12.2415C9.21939 12.3591 8.95609 12.4189 8.66386 12.4189C8.32532 12.4199 8.01283 12.3225 7.72445 12.1277ZM11.836 8.80602L11.1011 9.33745L10.7336 8.77998L12.0521 7.82901H12.5574V12.3148H11.836V8.80602Z"
          fill="#4285F4"
        />
      </svg>
    );
  }

  if (icon === "gmail") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M5.63563 16.0028V9.81974L3.71805 8.06541L1.99854 7.09192V14.9117C1.99854 15.5154 2.48772 16.0028 3.08966 16.0028H5.63563Z"
          fill="#4285F4"
        />
        <path
          d="M14.3647 16.0028H16.9107C17.5145 16.0028 18.0019 15.5136 18.0019 14.9117V7.09192L16.0542 8.20702L14.3647 9.81974V16.0028Z"
          fill="#34A853"
        />
        <path
          d="M5.63543 9.81965L5.37451 7.40371L5.63543 5.09143L9.99995 8.36481L14.3645 5.09143L14.6564 7.27887L14.3645 9.81965L9.99995 13.093L5.63543 9.81965Z"
          fill="#EA4335"
        />
        <path
          d="M14.3647 5.09142V9.81964L18.0019 7.09183V5.63698C18.0019 4.28762 16.4615 3.51837 15.3831 4.32763L14.3647 5.09142Z"
          fill="#FBBC04"
        />
        <path
          d="M1.99854 7.09183L3.6713 8.34639L5.63563 9.81964V5.09142L4.61724 4.32763C3.53702 3.51837 1.99854 4.28762 1.99854 5.63698V7.09183Z"
          fill="#C5221F"
        />
      </svg>
    );
  }

  if (icon === "slack") {
    return (
      <svg
        aria-hidden="true"
        className="o3-code-plugin-icon"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M5.37305 12.1146C5.37305 13.0446 4.62206 13.7962 3.69287 13.7962C2.76368 13.7962 2.0127 13.0446 2.0127 12.1146C2.0127 11.1847 2.76368 10.4331 3.69287 10.4331H5.37305V12.1146ZM6.21314 12.1146C6.21314 11.1847 6.96413 10.4331 7.89331 10.4331C8.8225 10.4331 9.57349 11.1847 9.57349 12.1146V16.3185C9.57349 17.2484 8.8225 18 7.89331 18C6.96413 18 6.21314 17.2484 6.21314 16.3185V12.1146Z"
          fill="#E01E5A"
        />
        <path
          d="M7.89335 5.36307C6.96416 5.36307 6.21317 4.61147 6.21317 3.68153C6.21317 2.75159 6.96416 2 7.89335 2C8.82254 2 9.57352 2.75159 9.57352 3.68153V5.36307H7.89335ZM7.89335 6.21657C8.82254 6.21657 9.57352 6.96817 9.57352 7.89811C9.57352 8.82805 8.82254 9.57964 7.89335 9.57964H3.68018C2.75099 9.57964 2 8.82805 2 7.89811C2 6.96817 2.75099 6.21657 3.68018 6.21657H7.89335Z"
          fill="#36C5F0"
        />
        <path
          d="M14.6267 7.89811C14.6267 6.96817 15.3777 6.21657 16.3069 6.21657C17.2361 6.21657 17.9871 6.96817 17.9871 7.89811C17.9871 8.82805 17.2361 9.57964 16.3069 9.57964H14.6267V7.89811ZM13.7866 7.89811C13.7866 8.82805 13.0356 9.57964 12.1064 9.57964C11.1773 9.57964 10.4263 8.82805 10.4263 7.89811V3.68153C10.4263 2.75159 11.1773 2 12.1064 2C13.0356 2 13.7866 2.75159 13.7866 3.68153V7.89811Z"
          fill="#2EB67D"
        />
        <path
          d="M12.1064 14.6369C13.0356 14.6369 13.7866 15.3885 13.7866 16.3185C13.7866 17.2484 13.0356 18 12.1064 18C11.1773 18 10.4263 17.2484 10.4263 16.3185V14.6369H12.1064ZM12.1064 13.7962C11.1773 13.7962 10.4263 13.0446 10.4263 12.1146C10.4263 11.1847 11.1773 10.4331 12.1064 10.4331H16.3196C17.2488 10.4331 17.9998 11.1847 17.9998 12.1146C17.9998 13.0446 17.2488 13.7962 16.3196 13.7962H12.1064Z"
          fill="#ECB22E"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="o3-code-plugin-icon"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M9.99996 2.08002C14.373 2.08002 17.915 5.62198 17.915 9.99502C17.9145 11.6534 17.3941 13.2699 16.4268 14.617C15.4595 15.9641 14.0941 16.9739 12.5229 17.5044C12.1271 17.5835 11.9787 17.3362 11.9787 17.1284C11.9787 16.8613 11.9886 16.0104 11.9886 14.9518C11.9886 14.2098 11.7413 13.7349 11.4543 13.4875C13.2154 13.2896 15.0656 12.6169 15.0656 9.57948C15.0656 8.70883 14.7589 8.00637 14.2543 7.45232C14.3334 7.25445 14.6104 6.44316 14.1751 5.35485C14.1751 5.35485 13.5122 5.13719 11.9985 6.16614C11.3653 5.98805 10.6925 5.899 10.0197 5.899C9.34697 5.899 8.6742 5.98805 8.041 6.16614C6.52726 5.14708 5.86437 5.35485 5.86437 5.35485C5.42905 6.44316 5.70607 7.25445 5.78522 7.45232C5.28064 8.00637 4.97394 8.71872 4.97394 9.57948C4.97394 12.607 6.81417 13.2896 8.57526 13.4875C8.3477 13.6854 8.13994 14.0317 8.07068 14.5461C7.61557 14.7539 6.47779 15.0903 5.76544 13.8932C5.61703 13.6557 5.17181 13.072 4.54851 13.0819C3.88562 13.0918 4.28137 13.4578 4.5584 13.6062C4.89479 13.7942 5.28064 14.4967 5.36969 14.7242C5.52799 15.1694 6.04246 16.0203 8.03111 15.6542C8.03111 16.3171 8.041 16.9404 8.041 17.1284C8.041 17.3362 7.89259 17.5736 7.49684 17.5044C5.92041 16.9796 4.54923 15.9718 3.57782 14.6239C2.60641 13.276 2.08409 11.6565 2.08496 9.99502C2.08496 5.62198 5.62692 2.08002 9.99996 2.08002Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ToggleSwitch({ checked }: Readonly<{ checked: boolean }>) {
  return (
    <span
      aria-hidden="true"
      className={`o3-code-toggle${checked ? " o3-code-toggle-checked" : ""}`}
    >
      <span />
    </span>
  );
}

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M2.75 6.25c0-.92.75-1.67 1.67-1.67h3.16l1.34 1.5h6.66c.92 0 1.67.75 1.67 1.67v5.83c0 .92-.75 1.67-1.67 1.67H4.42c-.92 0-1.67-.75-1.67-1.67V6.25Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M4.25 5.25h11.5v7.25H4.25V5.25Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M2.75 15h14.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M6 5.5v7.25A2.75 2.75 0 0 0 8.75 15.5H14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <path
        d="M14 4.5v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
      <circle
        cx="6"
        cy="4.5"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="14"
        cy="4.5"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="14"
        cy="15.5"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M9 5.25H6.9A3.15 3.15 0 0 0 3.75 8.4v1.85M11 14.75h2.1a3.15 3.15 0 0 0 3.15-3.15V9.75M7.25 14.75a3.5 3.5 0 1 1 5.5-4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function Menu({
  active,
  children,
  style,
  variant = "default",
}: Readonly<{
  active: boolean;
  children: ReactNode;
  style?: CSSProperties | undefined;
  variant?: "attach" | "default" | "reasoning";
}>) {
  if (!active) {
    return null;
  }

  const menu = (
    <div className={`o3-code-menu o3-code-menu-${variant}`} style={style}>
      {children}
    </div>
  );

  if (variant === "reasoning" && typeof document !== "undefined") {
    return createPortal(menu, document.body);
  }

  return menu;
}

export function CodeComposer() {
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [permission, setPermission] = useState("Full access");
  const [effort, setEffort] = useState("High");
  const [model, setModel] = useState("GPT-5.5");
  const [speed, setSpeed] = useState("Standard");
  const [project, setProject] = useState("o3-code");
  const [location, setLocation] = useState("Work locally");
  const [branch, setBranch] = useState("main");
  const [planMode, setPlanMode] = useState(false);
  const [pursueGoal, setPursueGoal] = useState(false);
  const [reasoningMenuStyle, setReasoningMenuStyle] = useState<CSSProperties>();

  useEffect(() => {
    const promptNode = promptRef.current;

    if (!promptNode || promptNode.textContent === prompt) {
      return;
    }

    promptNode.textContent = prompt;
  }, [prompt]);

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(".o3-code-menu, .o3-code-menu-trigger")) {
        return;
      }

      setOpenMenu(null);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
    };
  }, [openMenu]);

  const toggleMenu = (menu: MenuId) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const toggleReasoningMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 209;
    const submenuWidth = 234;
    const submenuGap = 1;
    const menuHeight = 221;
    const inset = 16;
    const left = Math.max(
      inset,
      Math.min(
        Math.max(rect.left, inset),
        window.innerWidth - menuWidth - submenuWidth - submenuGap - inset,
      ),
    );
    const top = Math.max(inset, rect.top - menuHeight - 8);

    setReasoningMenuStyle({ left, top });
    toggleMenu("effort");
  };

  const modelLabel = model.replace(/^GPT-/, "");

  return (
    <>
      <div className="mt-11 w-full text-left">
        <div className="o3-code-composer">
          <label
            className="sr-only"
            htmlFor="code-prompt"
            id="code-prompt-label"
          >
            Ask O3 Code
          </label>
          <div className="o3-code-attachment-slot" />
          <div className="o3-code-prompt-scroll">
            <div
              aria-labelledby="code-prompt-label"
              aria-multiline="true"
              className="o3-code-prompt"
              contentEditable="plaintext-only"
              data-empty={prompt.length === 0 ? "true" : "false"}
              data-placeholder="Open-source by default."
              id="code-prompt"
              onInput={(event) => {
                setPrompt(event.currentTarget.textContent ?? "");
              }}
              onPaste={(event) => {
                event.preventDefault();
                document.execCommand(
                  "insertText",
                  false,
                  event.clipboardData.getData("text/plain"),
                );
              }}
              ref={promptRef}
              role="textbox"
              spellCheck={false}
              suppressContentEditableWarning
              tabIndex={0}
            />
          </div>

          <div className="o3-code-composer-footer">
            <div className="flex min-w-0 items-center gap-[5px]">
              <div className="relative">
                <button
                  className="o3-code-icon-button o3-code-menu-trigger"
                  type="button"
                  aria-label="Add files and more"
                  aria-expanded={openMenu === "attach"}
                  onClick={() => toggleMenu("attach")}
                >
                  <PlusIcon />
                </button>
                <Menu active={openMenu === "attach"} variant="attach">
                  <button className="o3-code-attach-item" type="button">
                    <PaperclipIcon />
                    <span>Add photos &amp; files</span>
                  </button>
                  <div className="o3-code-attach-separator" />
                  <button
                    className="o3-code-attach-item"
                    type="button"
                    onClick={() => setPlanMode((current) => !current)}
                  >
                    <PlanModeIcon />
                    <span>Plan mode</span>
                    <ToggleSwitch checked={planMode} />
                  </button>
                  <button
                    className="o3-code-attach-item"
                    type="button"
                    onClick={() => setPursueGoal((current) => !current)}
                  >
                    <GoalIcon />
                    <span>Pursue goal</span>
                    <ToggleSwitch checked={pursueGoal} />
                  </button>
                  <div className="o3-code-attach-separator" />
                  <div className="o3-code-plugin-group">
                    <button className="o3-code-attach-item" type="button">
                      <PluginsIcon />
                      <span>Plugins</span>
                      <ChevronRightIcon />
                    </button>
                    <div className="o3-code-plugin-menu">
                      <div className="o3-code-plugin-label">
                        {pluginOptions.length} installed plugins
                      </div>
                      {pluginOptions.map((option) => (
                        <button
                          className="o3-code-plugin-item"
                          key={option.label}
                          type="button"
                        >
                          <PluginIcon icon={option.icon} />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Menu>
              </div>

              <div className="relative">
                <button
                  className="o3-code-footer-button o3-code-menu-trigger text-[#e25507]"
                  type="button"
                  aria-expanded={openMenu === "permissions"}
                  onClick={() => toggleMenu("permissions")}
                >
                  <ShieldIcon />
                  <span className="max-w-40 truncate whitespace-nowrap">
                    {permission}
                  </span>
                  <ChevronDownIcon />
                </button>
                <Menu active={openMenu === "permissions"}>
                  {permissionOptions.map((option) => (
                    <button
                      className="o3-code-menu-item"
                      key={option}
                      type="button"
                      onClick={() => {
                        setPermission(option);
                        setOpenMenu(null);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </Menu>
              </div>
            </div>

            <div className="flex min-w-0 items-center justify-end gap-2">
              <div className="relative">
                <button
                  className="o3-code-footer-button o3-code-effort-button o3-code-menu-trigger"
                  type="button"
                  aria-expanded={openMenu === "effort"}
                  onClick={toggleReasoningMenu}
                >
                  {speed === "Fast" ? <LightningIcon /> : null}
                  <span className="tabular-nums text-[#1a1c1f]">
                    {modelLabel}
                  </span>
                  <span>{effort}</span>
                  <ChevronDownIcon />
                </button>
                <Menu
                  active={openMenu === "effort"}
                  style={reasoningMenuStyle}
                  variant="reasoning"
                >
                  <div className="o3-code-reasoning-label">Reasoning</div>
                  {effortOptions.map((option) => (
                    <button
                      className={`o3-code-reasoning-item${
                        effort === option
                          ? " o3-code-reasoning-item-selected"
                          : ""
                      }`}
                      key={option}
                      type="button"
                      onClick={() => {
                        setEffort(option);
                        setOpenMenu(null);
                      }}
                    >
                      <span>{option}</span>
                      {effort === option ? <CheckIcon /> : null}
                    </button>
                  ))}
                  <div className="o3-code-menu-separator" />
                  <div className="o3-code-model-group">
                    <button className="o3-code-reasoning-item" type="button">
                      <span>{model}</span>
                      <ChevronRightIcon />
                    </button>
                    <div className="o3-code-model-menu">
                      <div className="o3-code-model-label">Model</div>
                      {modelOptions.map((option) => (
                        <button
                          className="o3-code-model-item"
                          key={option}
                          type="button"
                          onClick={() => {
                            setModel(option);
                            setOpenMenu(null);
                          }}
                        >
                          <span>{option}</span>
                          {model === option ? <CheckIcon /> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="o3-code-speed-group">
                    <button className="o3-code-reasoning-item" type="button">
                      <span>Speed</span>
                      <ChevronRightIcon />
                    </button>
                    <div className="o3-code-speed-menu">
                      <div className="o3-code-speed-label">Speed</div>
                      {speedOptions.map((option) => (
                        <button
                          className="o3-code-speed-item"
                          key={option.label}
                          type="button"
                          onClick={() => {
                            setSpeed(option.label);
                            setOpenMenu(null);
                          }}
                        >
                          <span className="o3-code-speed-icon-slot">
                            {option.label === "Fast" ? <LightningIcon /> : null}
                          </span>
                          <span>
                            <span>{option.label}</span>
                            <span>{option.description}</span>
                          </span>
                          {speed === option.label ? <CheckIcon /> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                </Menu>
              </div>
              <button
                className="o3-code-icon-button"
                type="button"
                aria-label="Dictate"
              >
                <MicIcon />
              </button>
              <button
                className="o3-code-send-button"
                type="button"
                aria-label="Open O3 Code repository"
                onClick={() => {
                  window.location.href = codeRepositoryUrl;
                }}
              >
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-3 px-3 text-[13px] leading-[18px] text-[rgba(26,28,31,0.494)]">
          <div className="relative">
            <button
              className="o3-code-meta-button o3-code-menu-trigger"
              type="button"
              aria-expanded={openMenu === "project"}
              onClick={() => toggleMenu("project")}
            >
              <FolderIcon />
              <span>{project}</span>
              <ChevronDownIcon />
            </button>
            <Menu active={openMenu === "project"}>
              {projectOptions.map((option) => (
                <button
                  className="o3-code-menu-item"
                  key={option}
                  type="button"
                  onClick={() => {
                    setProject(option);
                    setOpenMenu(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </Menu>
          </div>

          <div className="relative">
            <button
              className="o3-code-meta-button o3-code-menu-trigger"
              type="button"
              aria-expanded={openMenu === "location"}
              onClick={() => toggleMenu("location")}
            >
              <LaptopIcon />
              <span>{location}</span>
              <ChevronDownIcon />
            </button>
            <Menu active={openMenu === "location"}>
              {locationOptions.map((option) => (
                <button
                  className="o3-code-menu-item"
                  key={option}
                  type="button"
                  onClick={() => {
                    setLocation(option);
                    setOpenMenu(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </Menu>
          </div>

          <div className="relative">
            <button
              className="o3-code-meta-button o3-code-menu-trigger"
              type="button"
              aria-expanded={openMenu === "branch"}
              onClick={() => toggleMenu("branch")}
            >
              <BranchIcon />
              <span>{branch}</span>
              <ChevronDownIcon />
            </button>
            <Menu active={openMenu === "branch"}>
              {branchOptions.map((option) => (
                <button
                  className="o3-code-menu-item"
                  key={option}
                  type="button"
                  onClick={() => {
                    setBranch(option);
                    setOpenMenu(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </Menu>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full min-w-0 flex-col divide-y divide-[rgba(26,28,31,0.12)]">
        {suggestions.map((suggestion) => (
          <button
            className="flex min-w-0 items-center gap-1.5 px-3.5 py-[11px] text-left text-[13px] leading-[18px] text-[rgba(26,28,31,0.494)] transition-colors hover:text-[#1a1c1f]"
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
          >
            <SparkIcon />
            <span className="min-w-0 flex-1 truncate">{suggestion}</span>
          </button>
        ))}
      </div>
    </>
  );
}
