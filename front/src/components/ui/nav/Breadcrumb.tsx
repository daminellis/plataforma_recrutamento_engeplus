"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbProps {
  initialText: string;
  initialIndex: string;
}

export const Breadcrumb = ({ initialText, initialIndex }: BreadcrumbProps) => {
  const classLink: string = "text-sm text-gray-400 hover:underline";
  const classLinkActive: string = classLink + " text-black";
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <nav className="flex gap-2">
      <Link
        className={pathNames.length != 0 ? classLink : classLinkActive}
        href={initialIndex}
      >
        {initialText}
      </Link>
      {pathNames.length > 0 && <span className={classLink}>/</span>}

      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses = paths === href ? classLinkActive : classLink;
        let itemLink = link[0].toUpperCase() + link.slice(1, link.length);

        return (
          <React.Fragment key={index}>
            <Link key={link} className={itemClasses} href={href}>
              {itemLink}
            </Link>
            {pathNames.length !== index + 1 && (
              <span className={classLink}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
