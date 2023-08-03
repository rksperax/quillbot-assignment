import { Sidebar } from "../../components/sidebar";

import {
  IconSearch,
  IconDayMode,
  IconDotsVertical,
  IconClose,
} from "../../components/icons";

import { MovieCard } from "../../components/cards/MovieCard";
import { Fragment, useRef, useState } from "react";

import { MovieDataList } from "../../api/MovieDataList";
import Fuse from "fuse.js";
import { MovieDetailCard } from "../../components/cards/MovieDetailCard";
import { Header } from "../../components/header";
import { toast, Toaster } from "react-hot-toast";
import chunk from "lodash.chunk";
import { Transition } from "@headlessui/react";

import React from "react";
import { useResponsive } from "../../hooks/useResponsive";

import ericHoffman from "../../assets/png/eric_hoffman.png";
function Home() {
  const { isTablet, isMobile } = useResponsive();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedIndex, setSelectedIndex] = useState([0, 0]);
  const [showMovieDetailCard, setShowMovieDetailCard] = useState(false);

  const fuse = new Fuse(MovieDataList, {
    includeMatches: true,
    includeScore: true,
    keys: ["Title", "Director", "Language", "Year"],
    threshold: 0.3,
  });
  const result = searchQuery
    ? fuse.search(searchQuery).map((each) => each.item)
    : MovieDataList;

  const chunkSize = isMobile ? 2 : isTablet ? 3 : 5;
  const resultMovieChunk = chunk(result, chunkSize);

  return (
    <div className="App">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar
          openSidebar={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          userProfiles={{
            avatar: ericHoffman,
            name: "Eric Hoffmann",
          }}
        />
      </div>

      <div className="flex flex-col lg:pl-64">
        <main className="flex flex-col flex-1 gap-3">
          <Header
            openSidebar={() => setSidebarOpen(true)}
            onClickDayModeIcon={() => toast("Coming Soon!")}
            onClickDotsVerticalIcon={() => toast("Coming Soon!")}
          />

          <div className="flex flex-col gap-6 lg:gap-10 p-4 pb-12 lg:p-12">
            <div className="flex lg:hidden flex-1 items-center">
              <div className="group relative bg-[#1A2536] w-full flex flex-shrink-0 items-center rounded-lg transition-all delay-100 overflow-hidden">
                <IconSearch className="absolute left-4 w-[23px] h-[23px] text-[#D4D7DD] pointer-events-none" />

                <input
                  ref={inputRef}
                  type="search"
                  name="search"
                  id="search"
                  className="bg-transparent w-full h-[55px] pl-[51px] pr-11 text-lg placeholder:text-[#7B828E] placeholder:font-normal placeholder:transition-opacity placeholder:delay-150 placeholder:duration-500 text-white font-semibold border-0 outline-none"
                  placeholder="Title, Movies, Keyword"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-5 transition-opacity focus:outline-none"
                  >
                    <IconClose className="w-4 h-4 text-[#D4D7DD]" />
                  </button>
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex flex-1 items-center">
                <div
                  className={`group relative flex flex-shrink-0 items-center rounded-lg transition-all delay-100 overflow-hidden
                    ${
                      isSearchExpanded
                        ? " bg-[#1A2536]  lg:w-4/5 xl:w-[567px]"
                        : " w-14 cursor-pointer pointer-events-none"
                    }
                  `}
                  onClick={() => {
                    setIsSearchExpanded(true);
                    inputRef.current?.focus();
                  }}
                >
                  <IconSearch
                    className={`absolute left-4 w-[23px] h-[23px] text-[#D4D7DD] ${
                      isSearchExpanded
                        ? "pointer-events-none"
                        : "pointer-events-auto"
                    }`}
                  />

                  <input
                    ref={inputRef}
                    type="search"
                    name="search"
                    id="search"
                    className={`bg-transparent w-full h-[55px] pl-[51px] pr-11 outline-none placeholder:text-[#7B828E] placeholder:text-lg lg:placeholder:text-[19px] placeholder:font-normal placeholder:transition-opacity placeholder:delay-150 placeholder:duration-500 text-lg lg:text-[21px] lg:leading-[44px] text-white font-semibold border-0
                      ${
                        isSearchExpanded
                          ? " placeholder:opacity-100"
                          : " placeholder:opacity-0"
                      }
                    `}
                    placeholder="Title, Movies, Keyword"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsSearchExpanded(false);
                      }
                    }}
                    value={searchQuery}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchExpanded(false);
                      inputRef.current?.focus();
                    }}
                    className={`absolute right-5 transition-opacity focus:outline-none ${
                      isSearchExpanded
                        ? " opacity-100 delay-200 duration-500"
                        : " opacity-0 delay-75"
                    }`}
                  >
                    <IconClose className="w-4 h-4 text-[#D4D7DD]" />
                  </button>
                </div>

                <div className="flex items-center gap-[25px] ml-auto">
                  <button
                    type="button"
                    className="group focus:outline-none"
                    onClick={() => toast("Coming Soon!")}
                  >
                    <IconDayMode className="w-6 h-6 text-[#D4D7DD] group-hover:text-[#D4D7DD]/80 transition-colors" />
                  </button>

                  <button
                    type="button"
                    className="group focus:outline-none"
                    onClick={() => toast("Coming Soon!")}
                  >
                    <IconDotsVertical className="w-6 h-6 text-[#D4D7DD] group-hover:text-[#D4D7DD]/80 transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {resultMovieChunk.length ? (
              <>
                {resultMovieChunk.map((result, index) => {
                  return (
                    <div
                      key={index.toString()}
                      className="flex flex-col gap-6 scroll-pt-0.5"
                    >
                      {result.map((movie, i) => {
                        if (
                          selectedIndex[0] === index &&
                          selectedIndex[1] === i
                        ) {
                          return (
                            <Transition
                              key={i.toString() + index.toString()}
                              as={Fragment}
                              show={showMovieDetailCard}
                              enter="transition-opacity duration-75"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div
                                id="cover"
                                className="relative h-72 lg:h-[388px] scroll-mt-6"
                              >
                                <div className="expanded-card-wrapper w-full absolute top-2/4 -translate-y-2/4 transform transition-all duration-700">
                                  <MovieDetailCard
                                    poster={movie.Images}
                                    title={movie.Title}
                                    rating={movie.imdbRating}
                                    releasedYear={movie.Year}
                                    runTime={movie.Runtime}
                                    directorName={movie.Director}
                                    language={movie.Language}
                                    plot={movie.Plot}
                                    onClickPlay={() => toast("Coming Soon!")}
                                    onClickWatchTrailer={() =>
                                      toast("Coming Soon!")
                                    }
                                  />
                                </div>
                              </div>
                            </Transition>
                          );
                        }
                        return null;
                      })}

                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-[26px]">
                        {result.map((movie, i) => {
                          return (
                            <MovieCard
                              key={i.toString() + index.toString()}
                              title={movie.Title}
                              poster={movie.Poster}
                              onClick={() => {
                                setSelectedIndex([index, i]);
                                if (
                                  selectedIndex[0] === index &&
                                  selectedIndex[1] === i
                                ) {
                                  setShowMovieDetailCard(!showMovieDetailCard);
                                } else {
                                  setShowMovieDetailCard(true);
                                }
                                setTimeout(() => {
                                  document
                                    .querySelector("#cover")
                                    ?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }, 100);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-white text-lg lg:text-[21px] leading-[44px] font-semibold">
                No results found for your search.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
