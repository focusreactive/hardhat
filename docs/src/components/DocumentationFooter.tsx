import React from "react";
import Link from "next/link";

type Props = {
  next: {};
  prev: {};
};

const DocumentationFooter = ({ next, prev }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "100px 8px",
      }}
    >
      {prev ? (
        <div>
          <Link href={prev.href}>
            <a>
              <span>{"<<<"}</span>
              {prev.label}
            </a>
          </Link>
        </div>
      ) : null}
      {next ? (
        <div>
          <Link href={next.href}>
            <a>
              {next.label}
              <span>{">>>"}</span>
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default DocumentationFooter;
