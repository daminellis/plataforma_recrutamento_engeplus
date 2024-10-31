"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { formatUrlToText } from "@/utils/textTransform";

interface BreadcrumbProps {
  initialText: string;
  initialIndex: string;
}

export const Breadcrumb = ({ initialText, initialIndex }: BreadcrumbProps) => {
  const classLink: string = "text-sm hover:underline";
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <nav className="flex gap-2 flex-wrap">
      <Link
        className={
          classLink +
          (pathNames.length != 0 ? " text-gray-500" : " font-bold text-black")
        }
        href={initialIndex}
      >
        {initialText}
      </Link>
      {pathNames.length > 0 && (
        <span className={classLink + " text-gray-500"}>/</span>
      )}

      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses =
          classLink +
          (paths === href ? " font-bold text-black" : " text-gray-500");
        let itemLink = formatUrlToText(link);

        return (
          <React.Fragment key={index}>
            <Link key={link} className={itemClasses} href={href}>
              {itemLink}
            </Link>
            {pathNames.length !== index + 1 && (
              <span className={classLink + " text-gray-500"}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
