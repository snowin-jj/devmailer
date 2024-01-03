'use client';

import { useState } from 'react';

export default function KeySection() {
  const [isCopied, setCopied] = useState(false);
  const [hide, setHide] = useState(true);
  const apiKey = hide
    ? '0000000-00000-000000-000-00000'
    : "'a596e336-b864-40b8-95a0-c68e0e2cca34'";

  function handleCopy() {
    setCopied(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiKey);
    }

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  function handleShowHide() {
    setHide((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl">Your key</h2>
      <div className="flex items-center gap-2">
        <span className="bg-base-300 py-2 px-3">{apiKey}</span>
        <div className="tooltip" data-tip={hide ? 'show' : 'hide'}>
          <button
            className="bg-primary text-base-100 p-2"
            onClick={handleShowHide}
          >
            {hide ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-off"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        <div className="tooltip" data-tip={isCopied ? 'copied!' : 'copy'}>
          <button className="bg-primary text-base-100 p-2" onClick={handleCopy}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clipboard"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
