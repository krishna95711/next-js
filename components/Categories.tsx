// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { categoryFilters } from "@/constant";

// const Categories = () => {
//   const router = useRouter();
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   const category = searchParams.get("category");

//   const handleTags = (item: string) => {
//     router.push(`${pathName}?category=${item}`);
//   };

//   return (
//     <div className="flexBetween w-full gap-5 flex-wrap">
//       <ul className="flex gap-2 overflow-auto">
//         {categoryFilters.map((filter) => (
//           <button
//             key={filter}
//             type="button"
//             onClick={() => handleTags(filter)}
//             className={`${
//               category === filter
//                 ? "bg-light-white-300 font-medium"
//                 : "font-normal"
//             } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
//           >
//             {filter}
//           </button>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Categories;
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constant";
import { useState, useEffect } from "react";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("categoryContainer");
    if (container) {
      const scrollAmount = 200;
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
        setScrollRight(true);
        if (container.scrollLeft <= 0) {
          setScrollLeft(false);
        }
      } else {
        container.scrollLeft += scrollAmount;
        setScrollLeft(true);
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          setScrollRight(false);
        }
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById("categoryContainer");
    if (container) {
      if (container.scrollLeft <= 0) {
        setScrollLeft(false);
      } else {
        setScrollLeft(true);
      }
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        setScrollRight(false);
      } else {
        setScrollRight(true);
      }
    }
  }, []);

  return (
    <div className="flex items-center w-full">
      <button
        className={`px-3 py-2 rounded-full black ${scrollLeft ? "" : "hidden"}`}
        onClick={() => handleScroll("left")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          width="24px"
          height="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15 17l-5-5 5-5v10z" />
        </svg>
      </button>
      <ul
        id="categoryContainer"
        className="flex flex-nowrap gap-2 overflow-auto"
      >
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
      <button
        className={`px-3 py-2 rounded-full  black ${
          scrollRight ? "" : "hidden"
        }`}
        onClick={() => handleScroll("right")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          width="24px"
          height="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 17l5-5-5-5v10z" />
        </svg>
      </button>
    </div>
  );
};

export default Categories;
