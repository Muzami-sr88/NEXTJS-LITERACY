import Image from "next/image";

const books = [
  {
    id: 1,
    title: "King Lear",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Shakespeare's Hamlet",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "King Lear",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Shakespeare's Hamlet",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "King Lear",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
];

export default function BooksShowcase() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-3 inline-block rounded-full bg-[#b5d56a]/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#07294e]">
            New Arrivals
          </div>

          <h2 className="text-4xl font-extrabold text-[#07294e] md:text-5xl">
            Latest Books & PDFs
          </h2>

          <div className="mt-4 h-1 w-12 rounded-full bg-[#b5d56a]" />
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {books.map((book) => (
            <article
              key={book.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#07294e]">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={400}
                  height={600}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07294e]/85 via-[#07294e]/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {book.title}
                  </h3>
                </div>
              </div>

              <div className="flex min-h-[96px] items-center justify-center p-5">
                <p className="text-center text-sm font-medium leading-relaxed text-gray-600">
                  Download literary notes, summaries, and study guides for{" "}
                  {book.title}.
                </p>
              </div>

              <button
                type="button"
                className="block w-full bg-[#07294e] py-4 text-center font-bold text-white transition-colors duration-300 hover:bg-[#0a3a6b]"
              >
                Download Now
              </button>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="inline-block rounded-xl bg-[#07294e] px-12 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#0a3a6b] hover:shadow-2xl"
          >
            Explore All Books & PDFs
          </button>
        </div>
      </div>
    </section>
  );
}