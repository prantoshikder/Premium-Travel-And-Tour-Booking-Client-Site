import Image from "next/image";
import { blogPosts } from "@/temp/home";
import { ArrowRightIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  return (
    <section className="container-x py-16 sm:py-20">
      <SectionHeading
        eyebrow="Travel Tips & News"
        title="Stay Inspired"
        subtitle="Read the latest travel tips, guides, and stories from around the world."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.title}
            className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-medium text-navy-500">{post.date}</p>
              <h3 className="mt-2 text-base font-bold leading-snug text-navy-800">
                {post.title}
              </h3>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 transition hover:gap-2.5 hover:text-navy-800"
              >
                Read More
                <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#"
          className="rounded-full border border-navy-200 bg-white px-7 py-3 text-sm font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
        >
          View All Articles
        </a>
      </div>
    </section>
  );
}
