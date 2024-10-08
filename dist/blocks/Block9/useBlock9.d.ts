import { TBlockConfig } from "../../type";
import { CoreMenuFields, CoreMenuFields_menuCategories, CoreMenuItemFields } from "../../models";
import { CorePaginatorInfoProps } from "../../components";
import { TGetMenuItemsVariables, TResponse } from "./gql/hooks/useGetMenuItems";
type SortParams = "Price (High to Low)" | "Price (Low to High)" | "Name (A to Z)" | "Name (Z to A)";
export declare const useBlock9: ({ content }: TBlockConfig) => {
    firstMenuCategory: string;
    activeCategory: string;
    menu: CoreMenuFields;
    menuCategories: CoreMenuFields_menuCategories[];
    menuItems: CoreMenuItemFields[];
    filterRange: number[];
    menuItemModalData: {
        menuItem: CoreMenuItemFields | null;
        open: boolean;
    };
    breadCrumbs: string[];
    openDrawer: boolean;
    paginationInfo: CorePaginatorInfoProps;
    loadMenuItems: ({ onDataReceived, ...variables }: TGetMenuItemsVariables) => Promise<TResponse | void>;
    loadingState: Record<"search" | "pagination" | "filtering", boolean>;
    marks: {
        value: number;
        label: string;
    }[];
    minFilter: number;
    maxFilter: number;
    handleCloseMenuItemModal: () => void;
    handleOpenMenuItemModal: (menu_item: CoreMenuItemFields) => void;
    handleToggleDrawer: () => void;
    handleChange: (_: Event, newValue: number | number[]) => void;
    handleFilterByCategory: (category: CoreMenuFields_menuCategories) => Promise<void>;
    handleFilterByPrice: () => Promise<void>;
    handleDataReceived: (data: TResponse) => void;
    handleSearch: (value: string) => Promise<void>;
    handleLoadMore: () => Promise<void>;
    setOpenDrawer: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    handleSort: (value: SortParams) => void;
    sort: SortParams | null;
    sortOptions: SortParams[];
    openSortModal: boolean;
    handleOpenSortModal: () => void;
    handleCloseSortModal: () => void;
    toggleOpenSortModal: () => void;
};
export {};
