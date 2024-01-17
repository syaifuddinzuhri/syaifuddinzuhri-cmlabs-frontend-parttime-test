"use client";
import NotFoundData from "@/components/NotFoundData";
import CategoryCard from "@/components/categories/CategoryCard";
import ListCategorySkeleton from "@/components/categories/ListCategorySkeleton";
import TextInput from "@/components/form/TextInput";
import Breadcrumb from "@/components/global/Breadcrumb";
import HeadSection from "@/components/global/HeadSection";
import {
  IngredientsContext,
  IngredientsProvider,
} from "@/contexts/IngredientsContext";
import { withProviders } from "@/utils/withProviders";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { IoSearch } from "react-icons/io5";

const DetailIngredient = () => {
  const router = useRouter();

  const {
    state: { searchTerm },
    data: { isLoading },
    action: { filterMeal, setSearchTerm },
  } = useContext(IngredientsContext);

  const filteredMeal = filterMeal();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Ingredient", href: "/" },
    { label: "Meal", isActive: true },
  ];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <HeadSection title="List of Meals" />
      {isLoading ? (
        <ListCategorySkeleton />
      ) : (
        <>
          <TextInput
            type="text"
            name="keyword"
            icon={<IoSearch />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meals..."
          />
          {filteredMeal.length === 0 ? (
            <NotFoundData />
          ) : (
            <div className="py-5 w-full grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-4">
              {filteredMeal.map((item: IMeal, i: number) => (
                <CategoryCard
                  key={i}
                  onClick={() =>
                    router.push(`/ingredient/${item.idMeal}`)
                  }
                  name={item.strMeal}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default withProviders(IngredientsProvider)(DetailIngredient);
