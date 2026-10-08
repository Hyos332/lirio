import "server-only";

import sanitizeHtml from "sanitize-html";

import { cn } from "@/lib/cn";

const options: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "width", "height"],
  },
  allowedSchemes: ["https", "mailto", "tel"],
};

export function RichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-md leading-relaxed text-ink-2",
        "[&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-medium [&_h3]:text-ink [&_img]:mt-6 [&_img]:rounded-card-sm [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&>:first-child]:mt-0",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, options) }}
    />
  );
}
