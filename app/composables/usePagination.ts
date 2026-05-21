import { computed, watch, type Ref } from "vue";
import type { LocationQueryRaw } from "vue-router";

interface UsePaginationOptions {
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 12;

export function usePagination<T>(
  items: Ref<T[]> | Readonly<Ref<T[]>>,
  options: UsePaginationOptions = {},
) {
  const route = useRoute();
  const router = useRouter();
  const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;

  function setPageInQuery(page: number): void {
    const nextQuery: LocationQueryRaw = { ...route.query };

    if (page > 1) {
      nextQuery.page = String(page);
    } else {
      delete nextQuery.page;
    }

    if (JSON.stringify(nextQuery) === JSON.stringify(route.query)) {
      return;
    }

    void router.replace({ query: nextQuery });
  }

  const currentPage = computed<number>({
    get: () => {
      const raw = Number(route.query.page ?? 1);
      return Number.isInteger(raw) && raw > 0 ? raw : 1;
    },
    set: (value) => setPageInQuery(value),
  });

  const totalItems = computed(() => items.value.length);
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / pageSize)),
  );
  const safeCurrentPage = computed(() =>
    Math.min(currentPage.value, totalPages.value),
  );

  const paginatedItems = computed<T[]>(() => {
    const start = (safeCurrentPage.value - 1) * pageSize;
    return items.value.slice(start, start + pageSize);
  });

  const hasPreviousPage = computed(() => safeCurrentPage.value > 1);
  const hasNextPage = computed(() => safeCurrentPage.value < totalPages.value);

  function goToPage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), totalPages.value);
    currentPage.value = nextPage;
  }

  function goToPreviousPage(): void {
    if (!hasPreviousPage.value) return;
    goToPage(safeCurrentPage.value - 1);
  }

  function goToNextPage(): void {
    if (!hasNextPage.value) return;
    goToPage(safeCurrentPage.value + 1);
  }

  watch(totalPages, () => {
    if (currentPage.value > totalPages.value) {
      goToPage(totalPages.value);
    }
  });

  return {
    pageSize,
    currentPage: safeCurrentPage,
    totalItems,
    totalPages,
    paginatedItems,
    hasPreviousPage,
    hasNextPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
}
