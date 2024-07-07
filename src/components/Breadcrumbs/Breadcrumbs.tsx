import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

type IBreadcrumbs = {
  name: string;
  href: string;
  current: boolean;
};

export default function Breadcrumbs({
  pages,
  title,
}: {
  pages: IBreadcrumbs[];
  title: string;
}) {
  return (
    <main className="flex flex-col-reverse md:flex-row md:items-center justify-between w-full mb-5">
      {/* title */}
      <div className="bg-white p-3 rounded-t-lg">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <nav
        className="flex border-b border-gray-200 bg-white"
        aria-label="Breadcrumb"
      >
        <ol role="list" className="mx-auto flex w-full  md:px-3 px-0">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </main>
  );
}
