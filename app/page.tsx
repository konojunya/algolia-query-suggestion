"use client"

import {createQuerySuggestionsPlugin} from "@algolia/autocomplete-plugin-query-suggestions";
import {algoliasearch} from "algoliasearch";
import {useEffect, useRef} from "react";
import {autocomplete} from "@algolia/autocomplete-js";

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_SEARCH_APP_ID!, process.env.NEXT_PUBLIC_SEARCH_API_KEY!)

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'products_query_suggestions',
});

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const search = autocomplete({
      container: ref.current!,
      plugins: [querySuggestionsPlugin],
      openOnFocus: true,
    });

    return () => {
      search.destroy()
    }
  }, []);

  return (
      <div ref={ref} />
  );
}
