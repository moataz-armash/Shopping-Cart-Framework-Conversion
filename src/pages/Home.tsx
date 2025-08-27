import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { useState, useCallback, useMemo } from "react";
import { useCart } from "../hooks/cartContext";

export default function Home() {
  const { t } = useTranslation();
  const { products, addToCart, cart } = useCart();
  const [searchOption, setSearchOption] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Memoized search options for better performance
  const searchOptions = useMemo(
    () => [
      { value: "title", label: "Search By Title" },
      { value: "category", label: "Search By Category" },
    ],
    [],
  );

  // Get current placeholder text
  const placeholderText = useMemo(() => {
    const option = searchOptions.find((opt) => opt.value === searchOption);
    return option?.label || "Search...";
  }, [searchOption, searchOptions]);

  // Debounced search function
  const searchData = useCallback(
    async (value) => {
      if (!value.trim()) return;

      setIsLoading(true);
      try {
        // Simulate API call - replace with your actual search logic
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log(`Searching for: "${value}" using option: ${searchOption}`);

        // Your search implementation here
        // e.g., await searchAPI(value, searchOption);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchOption],
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      searchData(value);
    },
    [searchData],
  );

  const handleSearchOptionChange = useCallback(
    (e) => {
      setSearchOption(e.target.value);
      // Re-trigger search if there's existing search value
      if (searchValue.trim()) {
        searchData(searchValue);
      }
    },
    [searchValue, searchData],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchData(searchValue);
      }
    },
    [searchValue, searchData],
  );

  function isInCart(productId: number) {
    return cart.some((item) => item.id === productId);
  }

  return (
    <>
      <Helmet>
        <title>{t("homeTitle", "Home")}</title>
        <meta
          name="description"
          content={t("homeDescription", "Search and discover content")}
        />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto mt-20 px-4 py-8">
          {/* Search Section */}
          <div className="mx-auto max-w-5xl">
            {/* border border-gray-200 shadow-lg */}
            <div className="rounded-xl  bg-white p-2 ">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Search Option Selector */}
                <div className="sm:w-1/3">
                  <label
                    htmlFor="searchOption"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Search Type
                  </label>
                  <div className="relative">
                    <select
                      id="searchOption"
                      className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-3 pr-10 text-gray-700 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchOption}
                      onChange={handleSearchOptionChange}
                      aria-label={t("selectSearchType", "Select search type")}
                    >
                      {searchOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Icon
                      icon="mdi:chevron-down"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                      width={20}
                    />
                  </div>
                </div>

                {/* Search Input */}
                <div className="sm:w-2/3">
                  <label
                    htmlFor="searchInput"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("searchQuery", "Search Query")}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        icon={isLoading ? "mdi:loading" : "mdi:magnify"}
                        className={`text-gray-400 ${isLoading ? "animate-spin" : ""}`}
                        width={20}
                      />
                    </div>
                    <input
                      id="searchInput"
                      type="text"
                      value={searchValue}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={placeholderText}
                      disabled={isLoading}
                      aria-label={placeholderText}
                      aria-describedby="search-help"
                    />
                    {searchValue && (
                      <button
                        onClick={() => {
                          setSearchValue("");
                          document.getElementById("searchInput")?.focus();
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600"
                        aria-label={t("clearSearch", "Clear search")}
                      >
                        <Icon icon="mdi:close" width={20} />
                      </button>
                    )}
                  </div>
                  <p id="search-help" className="mt-1 text-sm text-gray-500">
                    {t(
                      "searchHint",
                      "Press Enter to search or type to search automatically",
                    )}
                  </p>
                </div>
              </div>

              {/* Search Stats/Status */}
              {searchValue && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {isLoading
                        ? t("searching", "Searching...")
                        : t(
                            "searchingFor",
                            `Searching for "${searchValue}" in ${searchOptions.find((opt) => opt.value === searchOption)?.label.toLowerCase()}`,
                          )}
                    </span>
                    {!isLoading && (
                      <span className="font-medium text-blue-600">
                        {t("resultsFound", "Results will appear here")}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section Placeholder */}
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-x-12 gap-y-8">
            {products?.map((item) => (
              <div
                className=" border-tahiti-cardBorder mb-4 flex flex-col break-words rounded-sm border px-8 py-4 duration-300 ease-in hover:scale-110"
                key={item.id}
              >
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="rounded-tl-[calc(.25rem - 1px)] rounded-tr-[calc(.25rem - 1px)] m-auto mb-2 h-48 w-[80%] rounded-lg p-1"
                />
                <p className="mb-2">
                  <span className="font-semibold">Product:</span> {item.title}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Color:</span> {item.color}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Price: </span>
                  <span className="line-through">{item.salePrice} EGP</span>
                  <span> &ensp;{item.price} EGP</span>
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    className="rounded-md bg-tahiti px-2 py-1 font-bold text-white hover:bg-tahiti-dark"
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    {isInCart(item.id) ? "Remove From Cart" : "Add To Cart"}
                  </button>
                  <Icon
                    icon="mdi:favorite-border"
                    width="30"
                    height="30"
                    className="text-tahiti-favoriteIcon cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
              <Icon
                icon="mdi:file-search-outline"
                width={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <h3 className="mb-2 text-lg font-medium text-gray-700">
                {t("noResults", "Start searching to see results")}
              </h3>
              <p className="text-gray-500">
                {t(
                  "searchInstructions",
                  "Enter your search term above and select your preferred search method",
                )}
              </p>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
