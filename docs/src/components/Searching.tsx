import React from "react";
import Head from "next/head";
import { DocSearch } from "@docsearch/react";
import "@docsearch/css";
import { styled } from "linaria/react";
import { media, tm, tmDark, tmHCDark, tmSelectors } from "../themes";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

const Container = styled.div`
  .DocSearch-Button {
    border-radius: 2px;
  }

  display: flex;
  --docsearch-primary-color: #e5ff54;
  --docsearch-text-color: #1c1e21;
  --docsearch-spacing: 12px;
  --docsearch-icon-stroke-width: 1.4;
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-muted-color: #969faf;
  --docsearch-container-background: rgba(101, 108, 133, 0.8);
  --docsearch-logo-color: #cc6a19;
  --docsearch-modal-width: 560px;
  --docsearch-modal-height: 600px;
  --docsearch-modal-background: #e49b14;
  --docsearch-modal-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5),
    0 3px 8px 0 #555a64;
  --docsearch-searchbox-height: 56px;
  --docsearch-searchbox-background: ${tm(({ colors }) => colors.neutral0)};
  --docsearch-searchbox-focus-background: #fff;
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);
  --docsearch-hit-height: 56px;
  --docsearch-hit-color: #444950;
  --docsearch-hit-active-color: #fff;
  --docsearch-hit-background: #fff;
  --docsearch-hit-shadow: 0 1px 3px 0 #d4d9e1;
  --docsearch-key-gradient: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
  --docsearch-key-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px rgba(30, 35, 90, 0.4);
  --docsearch-footer-height: 44px;
  --docsearch-footer-background: #fff;
  --docsearch-footer-shadow: 0 -1px 0 0 #e0e3e8,
    0 -3px 6px 0 rgba(69, 98, 155, 0.12);

  ${tmSelectors.hcDark} {
    --docsearch-searchbox-background: ${tmHCDark(
      ({ colors }) => colors.neutral0
    )};
  }
  ${tmSelectors.dark} {
    --docsearch-searchbox-background: ${tmHCDark(
      ({ colors }) => colors.neutral0
    )};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      --docsearch-searchbox-background: ${tmHCDark(
        ({ colors }) => colors.neutral0
      )};
    }
  }

  .algolia-search-wrapper {
    & > span {
      vertical-align: middle;
    }
    .algolia-autocomplete {
      line-height: normal;
      .ds-dropdown-menu {
        background-color: #fff;
        border: 1px solid #999;
        border-radius: 4px;
        font-size: 16px;
        margin: 6px 0 0;
        padding: 4px;
        text-align: left;
        &:before {
          border-color: #999;
        }
        [class*="ds-dataset-"] {
          border: none;
          padding: 0;
        }
        .ds-suggestions {
          margin-top: 0;
        }
        .ds-suggestion {
          border-bottom: 1px solid #eaecef;
        }
      }
      .algolia-docsearch-suggestion--highlight {
        color: #2c815b;
      }
      .algolia-docsearch-suggestion {
        border-color: #eaecef;
        padding: 0;
        .algolia-docsearch-suggestion--category-header {
          padding: 5px 10px;
          margin-top: 0;
          background: #ccb200;
          color: #fff;
          font-weight: 600;
          .algolia-docsearch-suggestion--highlight {
            background: rgba(255, 255, 255, 0.6);
          }
        }
        .algolia-docsearch-suggestion--wrapper {
          padding: 0;
        }
        .algolia-docsearch-suggestion--title {
          font-weight: 600;
          margin-bottom: 0;
          color: #16181d;
        }
        .algolia-docsearch-suggestion--subcategory-column {
          vertical-align: top;
          padding: 5px 7px 5px 5px;
          border-color: #eaecef;
          background: #f1f3f5;
          &:after {
            display: none;
          }
        }
        .algolia-docsearch-suggestion--subcategory-column-text {
          color: #555;
        }
        .algolia-docsearch-suggestion--content {
          float: none;
          display: table-cell;
          width: 100%;
          vertical-align: top;
        }
        .ds-dropdown-menu {
          min-width: 515px !important;
        }
      }
      .algolia-docsearch-footer {
        border-color: #eaecef;
      }
      .ds-cursor {
        .algolia-docsearch-suggestion--content {
          background-color: #e7edf3 !important;
          color: #16181d;
        }
      }
    }
    .algolia-docsearch-suggestion--wrapper {
      padding: 5px 7px 5px 5px !important;
    }
    .algolia-docsearch-suggestion--subcategory-column {
      padding: 0 !important;
      background: #fff !important;
    }
    .algolia-docsearch-suggestion--subcategory-column-text {
      &:after {
        content: " > ";
        font-size: 10px;
        line-height: 14.4px;
        display: inline-block;
        width: 5px;
        margin: -3px 3px 0;
        vertical-align: middle;
      }
    }
  }

  @media (min-width: 719px) {
    .algolia-search-wrapper {
      .algolia-autocomplete {
        .algolia-docsearch-suggestion {
          .algolia-docsearch-suggestion--subcategory-column {
            float: none;
            width: 150px;
            min-width: 150px;
            display: table-cell;
          }
          .algolia-docsearch-suggestion--content {
            float: none;
            display: table-cell;
            width: 100%;
            vertical-align: top;
          }
          .ds-dropdown-menu {
            min-width: 515px !important;
          }
        }
      }
      .ds-dropdown-menu {
        min-width: calc(100vw - 4rem) !important;
        max-width: calc(100vw - 4rem) !important;
      }
      .algolia-docsearch-suggestion--wrapper {
        padding: 5px 7px 5px 5px !important;
      }
      .algolia-docsearch-suggestion--subcategory-column {
        padding: 0 !important;
        background: #fff !important;
      }
      .algolia-docsearch-suggestion--subcategory-column-text {
        &:after {
          content: " > ";
          font-size: 10px;
          line-height: 14.4px;
          display: inline-block;
          width: 5px;
          margin: -3px 3px 0;
          vertical-align: middle;
        }
      }
    }
  }
`;

type Props = {};

const Searching = (props: Props) => {
  return (
    <Container>
      <Head>
        {/**
         * By adding this snippet to the head, we can hint the browser that the website will load data from Algolia,
         * and allows it to preconnect to the DocSearch cluster. It makes the first query faster,
         * especially on mobile.
         *
         * But we don't want to affect landing pages where we don't use searching. So we adding this only on pages
         * where we actually using this
         */}
        <link
          rel="preconnect"
          href={`https://${appId}-dsn.algolia.net`}
          crossOrigin="true"
        />
      </Head>
      <DocSearch appId={appId} apiKey={apiKey} indexName={indexName} />
    </Container>
  );
};

export default Searching;
