import mdx from "@next/mdx";
import html from "remark-html";
import prism from "remark-prism";
import externalLinks from "remark-external-links";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [externalLinks, prism, html],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
